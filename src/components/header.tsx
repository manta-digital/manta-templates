import React from 'react';
import NavBar from './navbar';
import Container from './container';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 dark:bg-gray-800 p-4 shadow-md">
      <Container className="flex justify-between items-center">
        {/* Left side - Logo placeholder or similar could go here */}
        <div>Logo Placeholder</div> 
        
        {/* Right side - Navigation */}
        <NavBar />
      </Container>
    </header>
  );
};

export default Header;
