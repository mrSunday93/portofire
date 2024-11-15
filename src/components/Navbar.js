import React from "react";
import logo1 from '../asset/BMW-Logo-PNG.png';
import logo2 from '../asset/animal-logo-png-lion-king-icon-logo-animal-pride-wild-head-532.png';
import logo3 from '../asset/zTX5nM7ec.png';

const Navbar = () => {
    return (
        <nav className="bg-gray-900 p-4 text-white">
         <div className="container mx-auto flex justify-between items-center">
            {}
            <div className="flex items-center space-x-2">
                <img src={logo1} alt="Logo 1" className="h-10"/>
                <img src={logo2} alt="Logo 2" className="h-6"/>
                <img src={logo3} alt="Logo 3" className="h-8"/>
            </div>
            <ul className="flex space-x-4">
              <li><a href="#about" className="hover:text-blue-400">About</a></li>
              <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
              <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
              <li><a href="admin" className="hover:text-blue-400">Admin</a></li>
            </ul>

         </div>
        </nav>
    );
};

export default Navbar;