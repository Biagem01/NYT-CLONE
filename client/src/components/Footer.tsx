import { useSection } from "@/contexts/SectionContext";
import { useLocation } from "wouter";

export default function Footer() {
  const { setActiveSection } = useSection();
  const [, navigate] = useLocation();

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate("/");
  };

  return (
    <footer className="bg-nyt-light-gray border-t border-nyt-border py-8 px-4 mt-8 no-print">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div>
            <h3 className="font-nyt font-bold text-base uppercase mb-4">News</h3>
            <ul className="space-y-2 text-sm">
              <li><button className="hover:text-nyt-blue" onClick={() => handleSectionClick("home")}>Home Page</button></li>
              <li><button className="hover:text-nyt-blue" onClick={() => handleSectionClick("world")}>World</button></li>
              <li><button className="hover:text-nyt-blue" onClick={() => handleSectionClick("us")}>U.S.</button></li>
              <li><button className="hover:text-nyt-blue" onClick={() => handleSectionClick("politics")}>Politics</button></li>
              <li><a href="#" className="hover:text-nyt-blue">New York</a></li>
              <li><button className="hover:text-nyt-blue" onClick={() => handleSectionClick("business")}>Business</button></li>
              <li><a href="#" className="hover:text-nyt-blue">Tech</a></li>
              <li><button className="hover:text-nyt-blue" onClick={() => handleSectionClick("science")}>Science</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-nyt font-bold text-base uppercase mb-4">Opinion</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-nyt-blue">Today's Opinion</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Op-Ed Columnists</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Editorials</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Op-Ed Contributors</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Letters</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Sunday Review</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Video: Opinion</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-nyt font-bold text-base uppercase mb-4">Arts</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-nyt-blue">Today's Arts</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Art & Design</a></li>
              <li><button className="hover:text-nyt-blue" onClick={() => handleSectionClick("books")}>Books</button></li>
              <li><a href="#" className="hover:text-nyt-blue">Dance</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Movies</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Music</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Television</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Theater</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-nyt font-bold text-base uppercase mb-4">Living</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-nyt-blue">Automobiles</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Games</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Education</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Food</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Health</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Jobs</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Magazine</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Real Estate</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-nyt font-bold text-base uppercase mb-4">More</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-nyt-blue">Reader Center</a></li>
              <li><a href="#" className="hover:text-nyt-blue">The Athletic</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Wirecutter</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Cooking</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Headway</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Live Events</a></li>
              <li><a href="#" className="hover:text-nyt-blue">The Learning Network</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Tools & Services</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-nyt font-bold text-base uppercase mb-4">Subscribe</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-nyt-blue">Home Delivery</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Digital Subscriptions</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Games</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Cooking</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Email Newsletters</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Corporate Subscriptions</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Education Rate</a></li>
              <li><a href="#" className="hover:text-nyt-blue">Mobile Applications</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-nyt-border pt-6 text-sm text-nyt-gray">
          <div className="flex flex-wrap justify-between mb-4">
            <div className="space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-nyt-blue">© 2023 The New York Times Company</a>
              <a href="#" className="hover:text-nyt-blue">NYTCo</a>
              <a href="#" className="hover:text-nyt-blue">Contact Us</a>
              <a href="#" className="hover:text-nyt-blue">Accessibility</a>
            </div>
            <div className="space-x-4">
              <a href="#" className="hover:text-nyt-blue">Work with us</a>
              <a href="#" className="hover:text-nyt-blue">Advertise</a>
              <a href="#" className="hover:text-nyt-blue">T Brand Studio</a>
              <a href="#" className="hover:text-nyt-blue">Your Ad Choices</a>
              <a href="#" className="hover:text-nyt-blue">Privacy Policy</a>
              <a href="#" className="hover:text-nyt-blue">Terms of Service</a>
              <a href="#" className="hover:text-nyt-blue">Terms of Sale</a>
              <a href="#" className="hover:text-nyt-blue">Site Map</a>
              <a href="#" className="hover:text-nyt-blue">Help</a>
              <a href="#" className="hover:text-nyt-blue">Subscriptions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
