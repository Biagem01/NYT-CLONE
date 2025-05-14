import { useAuth } from "@/contexts/AuthContext";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserMenu() {
  const { currentUser, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Chiudi il menu se l'utente clicca all'esterno
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Se l'utente non è autenticato, mostra il pulsante di login
  if (!currentUser) {
    return (
      <Link href="/login" className="text-sm hover:text-nyt-blue cursor-pointer">
        Accedi
      </Link>
    );
  }

  // Se l'utente è autenticato, mostra l'avatar e il menu a discesa
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center focus:outline-none"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || "User"} />
          <AvatarFallback>
            {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg border border-nyt-border z-50">
          <div className="px-4 py-2 border-b border-nyt-border">
            <p className="text-sm font-medium">{currentUser.displayName}</p>
            <p className="text-xs text-nyt-gray truncate">{currentUser.email}</p>
          </div>
          
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 text-sm text-nyt-black hover:bg-gray-100"
          >
            Disconnetti
          </button>
        </div>
      )}
    </div>
  );
}