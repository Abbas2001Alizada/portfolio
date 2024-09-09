import React, { useState } from 'react';
import { Transition } from '@headlessui/react'; // For smooth animations

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <div className="flex items-center">
                       <p className='text-2xl font-bold italic'>My Portfolio</p>
                    </div> 
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-10">
                        <a href="#about" className="font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">About</a>
                        <a href="#portfolio" className="font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">Projects</a>
                        <a href="#skills" className="font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">Skills</a>
                        <a href="#contact" className="font-bold text-gray-700 hover:text-blue-500 transition duration-300 ease-in-out">Contact</a>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="bg-black inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {ref => (
                    <div className="md:hidden " id="mobile-menu">
                        <div ref={ref} className=" px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <a onClick={toggleMenu} href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100">About</a>
                            <a onClick={toggleMenu} href="#portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100">Projects</a>
                            <a onClick={toggleMenu} href="#skills" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100">Skills</a>
                            <a onClick={toggleMenu} href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100">Contact</a>
                            <a onClick={toggleMenu} href="#resume" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100">resume</a>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    );
};

export default Navbar;
