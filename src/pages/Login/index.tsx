import Form from '../../components/Form';
import Input from '../../components/Input';
import Label from '../../components/Label';
import useForm from '../../hooks/useForm';
import "./Login.css";
import { signInWithEmailAndPassword, EmailAuthProvider, linkWithCredential, User, AuthCredential } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/**
 * Merges the data associated with an anonymous user into the data of a newly authenticated user.
 * 
 * @param {User} anonymousUser - The anonymous user whose data is to be merged.
 * @param {AuthCredential} credential - The credentials of the authenticated user to link with the anonymous user.
 * @throws Will throw an error if the linking or any of the Firestore operations fail.
 * @returns {Promise<void>} - A promise that resolves when the data has been successfully merged and the anonymous user data deleted.
 */
async function mergeUserData(anonymousUser: User, credential: AuthCredential): Promise<void> {
    const anonUserDoc = doc(db, 'users', anonymousUser.uid);
    const anonUserData = (await getDoc(anonUserDoc)).data();

    const userCred = await linkWithCredential(anonymousUser, credential);
    const newUser = userCred.user;

    const newUserDoc = doc(db, 'users', newUser.uid);
    if (anonUserData) {
        await setDoc(newUserDoc, anonUserData, { merge: true }); // Using merge: true to combine data
    }

    await deleteDoc(anonUserDoc);
}

export default function Register() {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: ''
    };

    const onSubmit = async (values: typeof initialValues) => {
        console.log('Login Form Submitted:', values);

        // Check if the user is currently anonymous before trying to sign in
        const wasAnonymous = auth.currentUser?.isAnonymous;

        try {
            // Sign in the user with email and password
            await signInWithEmailAndPassword(auth, values.email, values.password);
            
            // If the user was originally anonymous, link the anonymous account to this one
            if (wasAnonymous) {
              const credential = EmailAuthProvider.credential(values.email, values.password);
              await mergeUserData(auth.currentUser!, credential);
            }
            navigate("/dashboard");
          } catch (error) {
            console.error("Error signing in:", error);
            // display error message
          }
    };

    const { values, handleChange, handleSubmit } = useForm(initialValues, onSubmit);

    return (
        <div className='flex-col j-c-center height-100'>
            <div className="form-container">
                <h2>Login</h2>
                <p id="error-message"></p>
                <Form id="login-form" onSubmit={handleSubmit}>
                    <Label htmlFor="email">Email:</Label>
                    <Input type="text" id="email" name="email" required value={values.email} onChange={handleChange} />

                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" id="password" name="password" required value={values.password} onChange={handleChange} />

                    <Input type="submit" id="login-btn" name="login-btn" required value="Login" />
                </Form>
            </div>
        </div>
    )
}