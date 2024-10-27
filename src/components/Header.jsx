import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = [
    { to: '/home', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black h-20 z-50">
        <div className="h-full w-full px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo/Title */}
            <div className="flex-1">
              <h1 className="text-white text-2xl font-bold">Black Hole</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 flex-1 justify-end">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-white hover:text-gray-300 px-4 py-2 text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2 ml-4"
              onClick={toggleMenu}
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
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40">
          <div className="pt-20 px-8">
            <nav className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-white hover:text-gray-300 text-lg font-medium py-2"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
