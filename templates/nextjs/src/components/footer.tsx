import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 p-4 mt-auto">
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MIT © 2025 Manta.Digital / Erik Corkran (Footer Placeholder)
      </p>
    </footer>
  );
};

export default Footer;
