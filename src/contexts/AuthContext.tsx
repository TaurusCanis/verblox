import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

/**
 * Type definition for the authentication state.
 * @typedef {Object} AuthState
 * @property {User | null} user - The authenticated user object or null.
 * @property {boolean} loading - Whether the authentication state is still loading.
 */
interface AuthState {
  user: User | null;
  loading: boolean;
}

/**
 * Create an authentication context.
 */
const AuthContext = createContext<AuthState | undefined>(undefined);

/**
 * Custom hook to use the authentication context.
 * @returns {AuthState} The authentication state.
 * @throws {Error} If the hook is not used within an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Provider component to wrap around parts of the app that need access to the authentication context.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;  
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
