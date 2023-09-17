import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getTodayDate } from "../utils/utils";

/**
 * Custom hook to check if the user has completed today's puzzle.
 * @returns {boolean} Indicates whether the user has completed today's puzzle.
 */
export default function useCheckPuzzleCompletion(): boolean {
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const checkPuzzleCompletion = async () => {
      const auth = getAuth();
      const db = getFirestore();
      console.log("DB: ", db)

      if (auth.currentUser) {
        const userId: string = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userId);
        console.log("userDocRef: ", userDocRef)
        const userDoc = await getDoc(userDocRef);
        console.log("userDoc: ", userDoc)

        if (userDoc.exists()) {
            console.log("EXISTS")
          const userData = userDoc.data();
          console.log("userData: ", userData);
          const lastCompletedDate: string = userData?.dateOfLastPuzzleCompleted || "";
          if (lastCompletedDate === getTodayDate()) {
            setHasCompleted(true);
          }
        }
      } else {
        const storedScoreData = localStorage.getItem("scoreData");
        if (storedScoreData) {
            const scoreData = JSON.parse(storedScoreData);
            console.log("scoreData: ", scoreData)
            console.log("scoreData.dateOfLastPuzzleCompleted === getTodayDate(): ", scoreData.dateOfLastPuzzleCompleted === getTodayDate())
            if (scoreData.dateOfLastPuzzleCompleted === getTodayDate()) {
                setHasCompleted(true);
            }
        }
      }
    };

    // Call the async function
    checkPuzzleCompletion().catch(error => {
      console.error("An error occurred:", error);
    });
  }, []);

  return hasCompleted;
};