"use client"
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-black w-full">
            {/* Main navbar container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <h1 className="text-white text-xl font-bold">
                        Yellow Taxi & Limousine
                    </h1>

                    <div className="hidden md:flex text-white space-x-8">
                        <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">Help</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">History</a>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white p-2"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-black">
                        <a
                            href="#"
                            className="text-white block px-3 py-2 text-base hover:bg-gray-900 rounded-md"
                        >
                            Home
                        </a>
                        <a
                            href="#"
                            className="text-white block px-3 py-2 text-base hover:bg-gray-900 rounded-md"
                        >
                            Help
                        </a>
                        <a
                            href="#"
                            className="text-white block px-3 py-2 text-base hover:bg-gray-900 rounded-md"
                        >
                            History
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}