import { getSections } from "@/lib/api";
import { useSection } from "@/contexts/SectionContext";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Header() {
  const { activeSection, setActiveSection } = useSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sections = getSections();
  const [, navigate] = useLocation();
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    // Check if we're on an article page and navigate back to home if needed
    if (window.location.pathname.startsWith('/article/')) {
      navigate('/');
    }
  };
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="border-b border-nyt-border sticky top-0 bg-white z-50 no-print">
      <div className="container mx-auto px-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden focus:outline-none" 
              onClick={toggleMobileMenu}
            >
              <i className="fas fa-bars"></i>
            </button>
            <span className="hidden md:inline-block">
              <i className="far fa-calendar-alt mr-1"></i>
              <span>{currentDate}</span>
            </span>
            <a href="#" className="hidden md:inline-block hover:text-nyt-blue">Today's Paper</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hidden md:inline-block hover:text-nyt-blue">
              <i className="fas fa-search"></i>
            </a>
            <a href="#" className="hidden md:inline-block hover:text-nyt-blue">
              <i className="far fa-user"></i> Account
            </a>
            <button className="bg-nyt-blue text-white px-3 py-1 rounded-sm hover:bg-blue-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
        
        {/* Logo */}
        <div className="flex justify-center py-3 border-t border-b border-nyt-border">
          <a 
            href="/" 
            className="text-center"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('home');
              navigate('/');
            }}
          >
            <h1 className="font-nyt font-bold text-4xl md:text-5xl tracking-tight">The New York Times</h1>
          </a>
        </div>
        
        {/* Main Navigation */}
        <nav className={`py-2 overflow-x-auto whitespace-nowrap text-sm hide-scrollbar ${isMobileMenuOpen ? 'block' : ''}`}>
          <div className="flex justify-between items-center">
            <div className="flex space-x-5 md:space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`font-medium hover:text-nyt-blue ${
                    activeSection === section.id ? 'text-nyt-blue' : ''
                  } ${
                    (section.id !== 'home' && 
                     section.id !== 'us' && 
                     section.id !== 'politics' && 
                     section.id !== 'business' && 
                     section.id !== 'science' && 
                     section.id !== 'sports' && 
                     section.id !== 'books') 
                    ? 'hidden md:inline-block' : ''
                  }`}
                  onClick={() => handleSectionClick(section.id)}
                >
                  {section.name}
                </button>
              ))}
            </div>
            <div className="hidden md:block">
              <a href="#" className="ml-4 font-medium hover:text-nyt-blue">
                <i className="fas fa-search"></i>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
