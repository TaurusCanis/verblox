import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { runTransaction } from "firebase/firestore"; 
import { createUserDatabaseProfile } from "../utils/firebaseUtils";
import { signInAnonymously, User, updateProfile } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc } from "firebase/firestore";
import { getTodayDate } from "../utils/utils";

function generateAnonymousUsername() {
  const randomNumber = Math.floor(Math.random() * 10000);
  return `AnonymousUser${randomNumber}`;
}

/**
 * Save the score to the user's document in Firestore.
 * @param {number} elapsedTime - The time taken to complete the puzzle.
 * @param {User} user - The authenticated Firebase user.
 */
async function saveToDatabase(elapsedTime: number, user: User): Promise<void> {
    console.log(`Elapsed time: ${elapsedTime}`);
    console.log("DB: ", db);
    console.log("USER.ID: ", user.uid);

    const today = getTodayDate();
    const userDocRef = doc(db, 'users', user.uid);
    const puzzleDocRef = doc(db, 'completedPuzzlesStats', today, 'scores', `${user.uid}#${getTodayDate()}`);

    await runTransaction(db, async (transaction) => {
      // Get the user document
      const userDoc = await transaction.get(userDocRef);
    
      // Check if the user document exists and update it
      if (!userDoc.exists()) {
        throw "User document does not exist!";
      }

      console.log("ELAPSED TIME????: ", elapsedTime);
    
      transaction.update(userDocRef, {
        lastCompletedDate: today,
        lastElapsedTime: elapsedTime
      });
    
      // Create a new score document in the scores subcollection of the puzzle
      transaction.set(puzzleDocRef, {
        userId: user.uid,
        username: user.displayName,
        date: today,
        elapsedTime: elapsedTime
      });
    })
    .then(() => {
      console.log("Transaction successfully committed!");
    })
    .catch((error) => {
      console.log("Transaction failed: ", error);
    });
  }

export default function useSaveScore(): { handleSaveScore: (elapsedTime: number) => Promise<void> } {
    const { user } = useAuth();
    const [anonymousLoginComplete, setAnonymousLoginComplete] = useState(false);
    const [finalTime, setFinalTime] = useState<number>(0);

    // 3) if the user is authenticated, proceed to step 4;
    // if the user is not authenticated, sign them in anonymously
    // 4) save the score to the database

    const handleSaveScore = async (elapsedTime: number) => {
      setFinalTime(elapsedTime);
        if (!user) await handleAnonymousUser();
        else {
          console.log("handling authenticated user");
          saveToDatabase(elapsedTime, user);
        }
    }

    function handleAnonymousUser() {
      console.log("Handling anonymous user.");
      signInAnonymously(auth)
        .then((anonymousUserCredential) => {
          const anonymousUser = anonymousUserCredential.user;
          return updateProfile(anonymousUser, {
            displayName: generateAnonymousUsername(),
          });
        })
        .then(() => {
          console.log("User signed in anonymously and profile updated");
          setAnonymousLoginComplete(true);
        })
        .catch((error) => {
          console.error("Error signing in anonymously:", error);
        });
    }

    // This useEffect ensures saveScore is called once anonymous login is complete
    useEffect(() => {
        if (anonymousLoginComplete && user) {
            createUserDatabaseProfile(user)
            .then(() => {
                console.log("User profile created");
                saveToDatabase(finalTime, user);
                setAnonymousLoginComplete(false); 
            })
            .catch(error => {
                console.error("Failed to create user profile: ", error.message);
            });
             
        }
    }, [anonymousLoginComplete, user]);

    return { handleSaveScore };
}