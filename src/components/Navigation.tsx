import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

type NavItem =
  | { type: "route"; path: string; label: string }
  | { type: "scroll"; id: string; label: string };

const navLinks: NavItem[] = [
  { type: "route", path: "/", label: "Home" },
  { type: "route", path: "/projects", label: "Projects & Research" },
  { type: "route", path: "/experience", label: "Experience & Certifications" },
  { type: "route", path: "/resume", label: "Resume" },
  { type: "route", path: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  /* Scroll shadow */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* Scroll handler */
  const handleScrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-strong py-2 md:py-3" : "py-3 md:py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="font-display text-lg md:text-xl font-bold gradient-text">
            SP
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`nav-link text-sm font-medium ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleScrollToSection(link.id)}
                  className="nav-link text-sm font-medium"
                >
                  {link.label}
                </button>
              )
            )}

            <ThemeToggle />
          </div>

          {/* MOBILE BUTTONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="touch-target"
            >
              {isOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <Menu className="h-5 w-5 md:h-6 md:w-6" />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-14 md:top-16 z-40 glass-strong lg:hidden mobile-nav-height"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-3 md:gap-4 h-full overflow-y-auto">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.type === "route" ? (
                    <Link
                      to={link.path}
                      className="block py-3 md:py-2 text-base md:text-lg font-medium touch-target border-b border-border/20 last:border-b-0"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleScrollToSection(link.id)}
                      className="block py-3 md:py-2 text-base md:text-lg font-medium text-left w-full touch-target border-b border-border/20 last:border-b-0"
                    >
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}
              
              {/* Mobile-only social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 + 0.1 }}
                className="mt-auto pt-6 border-t border-border/20"
              >
                <div className="flex justify-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open("https://github.com/Sonali5161", "_blank")}
                    className="touch-target"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.open("https://linkedin.com/in/sonali-patil", "_blank")}
                    className="touch-target"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => window.location.href = "mailto:patilsonali5161@gmail.com"}
                    className="touch-target"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
