import React from "react";
import { Link } from "react-router-dom";

const header = () => {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">
          🐟 <span className="italic">Fisch But Scuffed</span>
        </div>
        <nav>
          <ul className="flex space-x-6 text-lg font-semibold">
            <li>
              <Link to="/" className="hover:text-gray-300 transition">
                Gacha
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gray-300 transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/idle" className="hover:text-gray-300 transition">
                Idle
              </Link>
            </li>
            <li>
              <Link to="/logout" className="hover:text-gray-300 transition">
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default header;
