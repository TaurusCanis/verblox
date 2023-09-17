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
        <div className='flex-col j-c-center height-100'>
            <div className="form-container">
                <h2>Sign Up</h2>
                <p id="error-message"></p>
                <Form id="signup-form" onSubmit={handleSubmit}>
                    <Label htmlFor="username">Username:</Label>
                    <Input type="text" id="username" name="username" required value={values.username} onChange={handleChange} />

                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" id="password" name="password" required value={values.password} onChange={handleChange} />

                    <Label htmlFor="confirm-password">Confirm Password:</Label>
                    <Input type="password" id="confirm-password" name="confirmPassword" required value={values.confirmPassword} onChange={handleChange} />

                    <Label htmlFor="email">Email:</Label>
                    <Input type="email" id="email" name="email" required value={values.email} onChange={handleChange} />

                    <Input type="submit" id="signup-btn" name="signup-btn" required value="Sign Up" />
                </Form>
            </div>
        </div>
    )
}