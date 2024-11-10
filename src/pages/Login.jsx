// Sofia, Rohin, Yatin, Hassan
import { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validCredentials = [
    { username: '2', password: '2' },
    { username: 'Rohin', password: '3' },
    { username: 'Yatin', password: '4' },
    { username: 'Hassan', password: '5' },
  ];

  const handleLogin = () => {
    if (username === '' || password === '') {
      alert('Please enter both username and password.');
      return;
    }

    const isValidUser = validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (isValidUser) {
      onLogin(username);
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="backdrop-blur-sm bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
            <h1 className="text-white text-2xl md:text-3xl font-bold text-center">
              Black Hole
            </h1>
          </div>

          <div className="px-8 py-12">
            <div className="mb-10 text-center">
              <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full mx-auto flex items-center justify-center">
                <User className="w-12 h-12 md:w-14 md:h-14 text-gray-300" />
              </div>
            </div>
            <form className="space-y-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out text-lg"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="password"
                  className="block w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                onClick={handleLogin}
              >
                Sign In
              </button>
              <div className="text-center space-y-4">
                <a
                  href="#"
                  className="text-base text-gray-400 hover:text-gray-300 transition duration-150 ease-in-out"
                >
                  Forgot your password?
                </a>
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-gray-400">
                    New to Black Hole?{' '}
                    <button
                      onClick={() => navigate('/signup')}
                      className="text-gray-300 hover:text-white font-medium transition duration-150 ease-in-out"
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
