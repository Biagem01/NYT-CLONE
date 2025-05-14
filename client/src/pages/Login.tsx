import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithRedirect } from "firebase/auth";

export default function Login() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, navigate] = useLocation();

  // Verifica se l'utente è già autenticato
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      // Utilizziamo direttamente signInWithRedirect invece del metodo nel contesto
      // questo evita problemi con il contesto quando viene reindirizzato
      await signInWithRedirect(auth, googleProvider);
      // Non è necessario navigare qui poiché il redirect avverrà automaticamente
    } catch (err) {
      setError("Si è verificato un errore durante l'accesso. Riprova più tardi.");
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-nyt-black min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-md p-8 shadow-sm border border-nyt-border">
          <div className="text-center mb-8">
            <h1 className="font-nyt font-bold text-3xl mb-2">Accedi</h1>
            <p className="text-nyt-gray">Accedi per salvare articoli, seguire i tuoi argomenti preferiti e ricevere notifiche personalizzate.</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-6 flex items-center justify-center gap-2 bg-white text-nyt-black border border-nyt-border hover:bg-gray-50"
            >
              <FcGoogle className="text-xl" />
              <span>Continua con Google</span>
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-nyt-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-nyt-gray">oppure</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-nyt-gray mb-4">
                Accedendo, accetti i Termini di servizio e l'Informativa sulla privacy del New York Times.
              </p>
              
              <p className="text-sm">
                <a href="#" className="text-nyt-blue hover:underline">Hai bisogno di aiuto? Visita il Centro assistenza</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}