// Sofia
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Menu, User, LogOut, Settings } from 'lucide-react';

const Header = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const links = [
    { to: '/home', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/plan-management', label: 'Manage Plans' },
    { to: '/course-search', label: 'Course Search' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-black h-20 z-50">
        <div className="h-full w-full px-8">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1">
              <h1 className="text-white text-2xl font-bold">Black Hole</h1>
            </div>

            <nav className="hidden md:flex space-x-8 flex-1 justify-end items-center">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-white hover:text-gray-300 px-4 py-2 text-lg font-medium"
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 text-white hover:text-gray-300 px-4 py-2"
                >
                  <User className="h-6 w-6" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700">
                    <Link
                      to="/account-settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>

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
              <Link
                to="/account-settings"
                className="text-white hover:text-gray-300 text-lg font-medium py-2"
                onClick={toggleMenu}
              >
                Account Settings
              </Link>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="text-white hover:text-gray-300 text-lg font-medium py-2 text-left"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
