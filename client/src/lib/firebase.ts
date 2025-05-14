import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";

// Configurazione Firebase con variabili d'ambiente
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Stampa il dominio attuale per il debug
console.log("Dominio corrente:", window.location.hostname);

// Inizializza Firebase
const app = initializeApp(firebaseConfig);

// Inizializza Auth e provider di Google
export const auth = getAuth(app);

// Configura la persistenza per mantenere l'utente loggato
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistenza impostata con successo");
  })
  .catch((error) => {
    console.error("Errore nell'impostare la persistenza:", error);
  });

// Configura il provider Google
export const googleProvider = new GoogleAuthProvider();
// Aggiunge prompt di selezione
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;