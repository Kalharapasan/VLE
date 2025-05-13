import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-auto py-3 w-100">
      <div className="text-center px-3">
        <small>© {new Date().getFullYear()} Student Learning System. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
