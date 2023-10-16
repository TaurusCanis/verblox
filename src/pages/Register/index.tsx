import Form from '../../components/Form';
import Input from '../../components/Input';
import Label from '../../components/Label';
import useForm from '../../hooks/useForm';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom";
import { createUserDatabaseProfile } from "../../utils/firebaseUtils";

/**
 * 
 * @param {User} user - The user object returned from Firebase.
 */
// async function createUserDatabaseProfile(user: User): Promise<void> {
//     await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         username: user.displayName,
//         email: user.email,
//     });
// }

export default function Register() {
    const initialValues = {
        username: '',
        password: '',
        confirmPassword: '',
        email: ''
    };
    const navigate = useNavigate();

    const onSubmit = (values: typeof initialValues) => {
        console.log('Registration Form Submitted:', values);
        // pass form data to firebase
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            updateProfile(user, { displayName: values.username });
            createUserDatabaseProfile(user);
            navigate("/dashboard");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("ERROR REGISTERING NEW USER: ", errorCode, " - ", errorMessage);
        });
    };

    const { values, handleChange, handleSubmit } = useForm(initialValues, onSubmit);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign up for an account
                        </h1>
                        <p id="error-message"></p>
                        <Form id="login-form" className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="username" >Username:</Label>
                                <Input type="text" id="username" name="username" required value={values.username} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="password">Password:</Label>
                                <Input type="password" id="password" name="password" required value={values.password} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="password">Confirm Password:</Label>
                                <Input type="password" id="confirm-password" name="confirmPassword" required value={values.password} onChange={handleChange} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email:</Label>
                                <Input type="email" id="email" name="email" required value={values.email} onChange={handleChange} />
                            </div>
                            <Input type="submit" id="signup-btn" name="signup-btn" required value="Sign Up" />
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}