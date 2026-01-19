import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-light-gray-background'
      }`}
    >
      <div className="max-w-[120rem] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="font-heading text-xl text-dark-text hover:text-link-accent transition-colors"
          >
            Bereket Chala Daba
          </button>
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="font-paragraph text-base text-dark-text hover:text-link-accent transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="font-paragraph text-base text-dark-text hover:text-link-accent transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="font-paragraph text-base text-dark-text hover:text-link-accent transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="font-paragraph text-base text-dark-text hover:text-link-accent transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('certifications')}
              className="font-paragraph text-base text-dark-text hover:text-link-accent transition-colors"
            >
              Certifications
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-paragraph text-base text-dark-text hover:text-link-accent transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
