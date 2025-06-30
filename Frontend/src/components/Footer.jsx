import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 px-4 mt-10">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm text-center sm:text-left">
                    &copy; {new Date().getFullYear()} E-Gram Portal. All rights reserved.
                </p>
                <div className="mt-4 sm:mt-0 space-x-4">
                    <a href="#" className="text-sm hover:underline">Privacy Policy</a>
                    <a href="#" className="text-sm hover:underline">Terms of Use</a>
                    <a href="#" className="text-sm hover:underline">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
