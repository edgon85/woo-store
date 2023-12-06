'use client';
import React, { useState } from 'react';

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <button
        className="fixed top-0 right-0 m-4 p-2 bg-white rounded-lg  md:hidden"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {menuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-screen w-3/4 bg-white transition-all duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } right-0`}
      >
        <ul className="mt-8 ml-4 space-y-2">
          <li className="pl-2">Marca</li>
          <ul className="ml-2">
            <li>Marca 1</li>
            <li>Marca 2</li>
          </ul>
          <li className="pl-2">Colores</li>
          <ul className="ml-2">
            <li>Rojo</li>
            <li>Verde</li>
          </ul>
          <li className="pl-2">Tallas</li>
          <ul className="ml-2">
            <li>Talla 1</li>
            <li>Talla 2</li>
          </ul>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
