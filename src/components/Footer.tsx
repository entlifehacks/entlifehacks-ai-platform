import React from 'react';

const Footer: React.FC = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (

    <footer className="bg-[#1a2332] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src="https://d64gsuwffb70l.cloudfront.net/68f9969a6672a19b16528a96_1761228748951_e55f8971.png" 
              alt="ECLH AI Consulting Logo" 
              className="h-20 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              Transforming businesses through intelligent AI solutions and data-driven strategies.
            </p>
          </div>

          
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/services" className="hover:text-white transition-colors">AI Strategy Development</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Data Analysis and Insights</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Business Process Automation</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Sales Funnels</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">Customer Relationship Management</a></li>
              <li><a href="/services" className="hover:text-white transition-colors">AI Digital Marketing</a></li>
            </ul>
          </div>

          
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="hover:text-white transition-colors cursor-pointer">About Us</a></li>
              <li><a href="#case-studies" onClick={(e) => handleSmoothScroll(e, 'case-studies')} className="hover:text-white transition-colors cursor-pointer">Case Studies</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors cursor-pointer">Contact</a></li>

            </ul>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h4 className="font-semibold mb-2 text-sm">Company Information</h4>
              <p className="text-xs text-gray-400">Entrepreneur Life Hacks</p>
              <p className="text-xs text-gray-400">Huma Farman LLC</p>
              <p className="text-xs text-gray-400">New City, NY 10956</p>
              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                <span>©</span> 2024 All Rights Reserved
              </p>

            </div>

          </div>

          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</a></li>

              <li><a href="/admin" className="hover:text-white transition-colors">Admin</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 ELH AI Consulting Services. All rights reserved.</p>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
