import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { 
  User,
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut 
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

// Definisci il tipo per il contesto
interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Crea il contesto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizzato per usare il contesto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve essere usato all'interno di un AuthProvider");
  }
  return context;
}

// Provider componente
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Funzione per il login con Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Errore durante l'accesso con Google:", error);
    }
  };

  // Funzione per il logout
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  // Effetto per monitorare lo stato dell'autenticazione
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Pulizia al dismount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}