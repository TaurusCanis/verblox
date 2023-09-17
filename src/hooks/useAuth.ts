import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

/**
 * Custom hook for tracking Firebase authentication state.
 * @returns {Object} Object containing the authenticated user and loading state.
 */
export function useAuth() {
  // State to hold the authenticated user object.
  const [user, setUser] = useState<User | null>(null);
  
  // State to indicate whether the auth state is still being checked.
  const [loading, setLoading] = useState<boolean>(true);
  
  // Use the useEffect hook to run code after component mounts.
  useEffect(() => {
    // Initialize Firebase Auth instance.
    const auth = getAuth();
    
    /**
     * Subscribe to auth state changes.
     * The callback receives a user object when the user is authenticated,
     * and null otherwise.
     */
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      // Update the state with the user object.
      setUser(user);
      
      // Update the loading state to indicate that auth check is done.
      setLoading(false);
    });
    
    // Unsubscribe to auth changes when component unmounts.
    return () => unsubscribe();
  }, []); // Empty dependency array means this useEffect runs once after initial render.
  
  // Return the user and loading state.
  return { user, loading };
}
