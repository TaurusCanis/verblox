import Form from '../../components/Form';
import Input from '../../components/Input';
import Label from '../../components/Label';
import useForm from '../../hooks/useForm';
import "./Login.css";
import { signInWithEmailAndPassword, EmailAuthProvider, linkWithCredential, User, AuthCredential } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

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
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <p id="error-message"></p>
                            <Form id="login-form" className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</Label>
                                    <Input type="text" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={values.email} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</Label>
                                    <Input type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={values.password} onChange={handleChange} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to={"register"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>

    </>
    )
}