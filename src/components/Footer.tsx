import { Mail, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-medium-gray/20">
      <div className="max-w-[120rem] mx-auto px-8 py-12">
        <div className="max-w-[100rem] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-paragraph text-base text-dark-text mb-2">
                Bereket Chala Daba
              </p>
              <p className="font-paragraph text-sm text-medium-gray">
                © {currentYear} All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="mailto:bereket.c.m@gmail.com"
                className="flex items-center gap-2 font-paragraph text-sm text-dark-text hover:text-link-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                bereket.c.m@gmail.com
              </a>
              <a
                href="https://github.com/bereket-chala"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-paragraph text-sm text-dark-text hover:text-link-accent transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
