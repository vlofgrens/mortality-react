import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-trolley-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Mortality Experiment</h3>
            <p className="text-sm text-gray-300">
              Exploring ethical decision-making in AI systems through autonomous vehicle scenarios.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create-scenario" className="hover:text-white transition-colors">
                  Create Scenario
                </Link>
              </li>
              <li>
                <Link to="/history" className="hover:text-white transition-colors">
                  History
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-300 text-center">
          <p>© {new Date().getFullYear()} AI Mortality Experiment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;