import { Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-warm-gray-800 text-warm-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl text-white">Neera Nigam</h3>
            <p className="text-sm mt-1 text-warm-gray-400">
              Artist &amp; Fine Arts Graduate
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://instagram.com/neeras.creations"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:neeranigam16@gmail.com"
              className="hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-warm-gray-500">
            &copy; {new Date().getFullYear()} Neera Nigam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
