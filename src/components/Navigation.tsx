import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/zoecaredental",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/zoecaredental",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/zoecaredental",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2347038899828",
    icon: (
      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const handleClick = (href: string) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 brand-curve ${
          scrolled
            ? "bg-card/95 backdrop-blur-xl shadow-ceramic-md"
            : "bg-card/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Zoe Care" className="h-9 w-9 object-contain" />
            <div className="leading-tight">
              <span className="font-display font-bold text-sm tracking-[0.15em] text-foreground">
                ZOE CARE
              </span>
              <p className="text-[10px] font-display font-semibold text-muted-foreground tracking-wide">
                DENTAL CLINIC
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="px-5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 press-scale"
              >
                {item.label}
              </button>
            ))}
            <a
              href="https://wa.me/2347038899828?text=Hello%20Zoe%20Care,%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-300 press-scale"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors press-scale"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile Side Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm bg-card shadow-ceramic-lg flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <img src={logo} alt="Zoe Care" className="h-8 w-8 object-contain" />
                  <span className="font-display font-bold text-sm tracking-[0.12em] text-foreground">
                    ZOE CARE
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={() => handleClick(item.href)}
                    className="text-left px-4 py-3.5 rounded-2xl text-base font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}

                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                  href="https://wa.me/2347038899828?text=Hello%20Zoe%20Care,%20I%20would%20like%20to%20book%20an%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium text-center hover:opacity-90 transition-all"
                >
                  Book Appointment
                </motion.a>
              </nav>

              {/* Social links */}
              <div className="px-6 py-6 border-t border-border">
                <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 w-11 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-accent transition-colors press-scale"
                      aria-label={s.label}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground font-mono">
                  +234 703 889 9828
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
