import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { User } from "firebase/auth"; 

/**
 * 
 * @param {User} user - The user object returned from Firebase.
 */
export async function createUserDatabaseProfile(user: User): Promise<boolean> {
    try {
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            username: user.displayName,
            email: user.email,
        });
        return true;
    } catch (error) {
        console.log("There was an error - : ", error);
        return false;
    }
}