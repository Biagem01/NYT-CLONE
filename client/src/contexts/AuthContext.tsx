import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Redux
import { useAppDispatch } from "@/hooks/hooks";
import { loadFavorites, clearFavorites } from "@/redux/favorites.slice";

// Tipo per il contesto
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

// Provider del contesto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch(); // ✅ Usa il dispatch tipato

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
        });
      }

      console.log("Login completato e dati utente salvati.");
    } catch (error) {
      console.error("Errore durante l'accesso con Google:", error);
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Errore durante il logout:", error);
    }
  };

  // Listener autenticazione
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        dispatch(loadFavorites(user.uid)); // ✅ Carica articoli preferiti da Firestore
      } else {
        dispatch(clearFavorites()); // ✅ Svuota Redux se non autenticato
      }
    });

    return unsubscribe;
  }, [dispatch]);

  const value = {
    currentUser,
    loading,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
