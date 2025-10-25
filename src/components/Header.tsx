import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onNavigateHome?: () => void;
  showNavigation?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome, showNavigation = true }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68f9969a6672a19b16528a96_1761193305393_121a01f9.png" 
              alt="ECLH AI Consulting Logo" 
              className="h-40 w-auto transition-transform duration-300 group-hover:scale-110"
            />

          </Link>

          
          {showNavigation && (
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-[#0066ff] transition-colors">Home</Link>
              <Link to="/services" className="text-gray-700 hover:text-[#0066ff] transition-colors">Services</Link>
              <Link to="/blog" className="text-gray-700 hover:text-[#0066ff] transition-colors">Blog</Link>

              <button 
                onClick={onNavigateHome}
                className="bg-[#0066ff] hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </nav>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
