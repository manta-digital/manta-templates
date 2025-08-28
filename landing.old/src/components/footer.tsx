import React from 'react';
import pkg from '../../package.json';
const version = pkg.version;

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 p-4 mt-auto">
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
      v{version}<span className="mx-2">•</span> Copyright {new Date().getFullYear()} Erik Corkran & manta.digital<span className="mx-2">•</span> <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="underline"> MIT</a> licensed. 
      </p>
    </footer>
  );
};

export default Footer;
