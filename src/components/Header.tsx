import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChartHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import faviconMort from '../assets/favicon_mort.png';

const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b bg-black text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-white">
          <img src={faviconMort} alt="App Icon" className="h-7 w-7 mr-2" />
          <h1 className="text-xl font-bold">AI Mortality Experiment</h1>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link to="/" className={`transition-colors ${isActive('/') ? 'text-white font-medium' : 'text-gray-300 hover:text-white'}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/report" className={`flex items-center gap-1.5 transition-colors ${isActive('/report') ? 'text-white font-medium' : 'text-gray-300 hover:text-white'}`}>
                <BarChartHorizontal size={16} />
                Model Report
              </Link>
            </li>
            <li>
              <Link to="/history" className={`transition-colors ${isActive('/history') ? 'text-white font-medium' : 'text-gray-300 hover:text-white'}`}>
                History
              </Link>
            </li>
            <li>
              <Link to="/create-scenario">
                <Button variant="default">Create Scenario</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;