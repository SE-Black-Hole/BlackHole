import { useState } from 'react';
import { User, Lock } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === '' || password === '') {
      alert('Please enter both username and password.');
      return;
    }

    // Hardcoded login credentials
    const correctUsername = 'DegreePlanner';
    const correctPassword = '123456';

    if (username === correctUsername && password === correctPassword) {
      onLogin(username);
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {' '}
        {/* Increased max-width from md to xl */}
        {/* Login Box */}
        <div className="backdrop-blur-sm bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
            {' '}
            {/* Increased padding */}
            <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
              {' '}
              {/* Increased text size */}
              Black Hole
            </h1>
          </div>

          {/* Login Form */}
          <div className="px-8 py-12">
            {' '}
            {/* Increased padding */}
            <div className="mb-10 text-center">
              {' '}
              {/* Increased margin */}
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mx-auto flex items-center justify-center">
                {' '}
                {/* Increased size */}
                <User className="w-12 h-12 md:w-14 md:h-14 text-gray-300" />{' '}
                {/* Increased icon size */}
              </div>
            </div>
            <form className="space-y-8">
              {' '}
              {/* Increased spacing */}
              {/* Username Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-gray-400" />{' '}
                  {/* Increased icon size */}
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out text-lg" /* Increased padding and text size */
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-gray-400" />{' '}
                  {/* Increased icon size */}
                </div>
                <input
                  type="password"
                  className="block w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out text-lg" /* Increased padding and text size */
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* Login Button */}
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out" /* Increased padding and text size */
                onClick={handleLogin}
              >
                Sign In
              </button>
              {/* Forgot Password Link */}
              <div className="text-center">
                <a
                  href="#"
                  className="text-base text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out" /* Increased text size */
                >
                  Forgot your password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
