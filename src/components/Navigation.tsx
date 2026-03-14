import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block transition-all duration-500 brand-curve ${
          scrolled ? "bg-card/80 backdrop-blur-xl shadow-ceramic-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Zoe Care" className="h-10 w-10 object-contain" />
            <span className="font-display font-700 text-lg text-foreground">Zoe Care</span>
          </div>
          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="px-5 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 brand-curve press-scale"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/2347038899828?text=Hello%20Zoe%20Care,%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-300 brand-curve press-scale"
            >
              Book Now
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Mobile bottom nav */}
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-card/90 backdrop-blur-xl shadow-ceramic-lg border border-border">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 press-scale"
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
