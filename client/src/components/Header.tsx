import { getSections } from "@/lib/api";
import { useSection } from "@/contexts/SectionContext";
import { useState } from "react";
import { useLocation } from "wouter";
import UserMenu from "./UserMenu";

export default function Header() {
  const { setActiveSection } = useSection(); // utile solo per fallback o stato condiviso
  const [query, setQuery] = useState("");
  const sections = getSections();
  const [, navigate] = useLocation();

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="border-b border-nyt-border sticky top-0 bg-white z-50 no-print">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <i className="far fa-calendar-alt" />
              {currentDate}
            </span>

            <a href="#" className="hover:text-nyt-blue">
              Today's Paper
            </a>
          </div>

          <div className="block">
            <UserMenu />
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center py-3 border-y border-nyt-border">
          <a
            href="/home"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection("home"); // opzionale: utile per persistenza globale
              navigate("/home");
            }}
          >
            <h1 className="font-nyt font-bold text-4xl md:text-5xl tracking-tight text-center">
              The New York Times
            </h1>
          </a>
        </div>

        {/* Navigation Menu */}
        <nav className="py-2 block">
          <div className="flex gap-4 items-center text-sm whitespace-nowrap overflow-x-auto hide-scrollbar">
            {sections.map((section) => (
              <button
                key={section.id}
                className="font-medium hover:text-nyt-blue"
                onClick={() => {
                  setActiveSection(section.id); // opzionale
                  navigate(`/${section.id}`);
                }}
              >
                {section.name}
              </button>
            ))}

            <button
              className="font-medium hover:text-nyt-blue"
              onClick={() => {
                setActiveSection("favorites");
                navigate("/favorites");
              }}
            >
              Favorites
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
