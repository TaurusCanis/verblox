import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

/**
 * Custom hook to handle user logout.
 * @returns {() => void} The logout function to sign the user out and navigate to the home page.
 */
export function useLogout(): () => void {
  const navigate = useNavigate();

  /**
   * Logout function to sign the user out and navigate to the home page.
   */
  const logout = () => {
    const auth = getAuth();
    
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Successfully logged out.");
      navigate("/");
    }).catch((error) => {
      // An error happened.
      console.log("There was an error logging the user out: " + error.message);
    });
  };

  return logout;
}
