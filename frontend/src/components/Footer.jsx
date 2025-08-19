import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="w-full bg-black py-12 border-t border-gray-800 animate-slide-in-up">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-white space-y-8 md:space-y-0">
        
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-bold mb-2">තොගHub</h4>
          <p className="text-gray-400 max-w-sm">The future of wholesale trade. Connecting verified buyers and sellers to drive growth.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h5 className="text-md font-semibold mb-3">Company</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-white transition-colors duration-300">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors duration-300">Contact</Link></li>
            <li><Link to="/careers" className="hover:text-white transition-colors duration-300">Careers</Link></li>
          </ul>
        </div>
        
        {/* Legal Links */}
        <div className="flex flex-col items-center md:items-start">
          <h5 className="text-md font-semibold mb-3">Legal</h5>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h5 className="text-md font-semibold mb-3">Follow Us</h5>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c-.3 1.2-1.3 2.1-2.6 2.4-1.2.3-2.5 0-3.6-.8-1.1-.8-1.8-2-1.8-3.3v-.8c-.7.5-1.5.8-2.4 1-.9.2-1.8.2-2.7 0-.9-.2-1.7-.5-2.5-.9-.8-.4-1.5-.9-2.2-1.5-.7-.6-1.3-1.4-1.8-2.3-.5-.9-.8-1.9-1.2-2.9l-.1-.5v-.1c.3.5.7 1 1.2 1.4.5.4 1 .8 1.6 1.1.6.3 1.3.5 2 .7.7.2 1.4.3 2.1.3h.5v.5c0 1.5.7 2.8 1.8 3.8 1.1 1 2.5 1.6 4 1.6 1.5 0 2.9-.6 4-1.6 1.1-1 1.8-2.5 1.8-4.1v-.2c-.1.1-.3.2-.5.3-.2.1-.4.2-.6.2h-.1c.4-.2.8-.5 1.1-.8.4-.4.7-.8.9-1.3.2-.5.3-1 .4-1.6.1-.5.1-1.1.1-1.6s-.1-1.1-.4-1.6c-.2-.5-.5-.9-.9-1.3l-.1-.1z"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.5" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>

      </div>
      <div className="text-center text-gray-500 mt-8 text-sm">
        &copy; 2024 තොගHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
