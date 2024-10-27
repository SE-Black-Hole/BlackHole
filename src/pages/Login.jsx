import { useState } from 'react';

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
      onLogin(username); // Pass username to parent component
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="bg-black w-full h-16 flex items-center justify-center">
          <h1 className="text-white font-bold" style={{ fontSize: '1.75rem' }}>
            Automatic Degree Planner
          </h1>
        </div>
        <div className="header-form">
          <h4 className="text-primary text-center">
            <i className="fa fa-user-circle" style={{ fontSize: '110px' }}></i>
          </h4>
        </div>
        <div className="body-form">
          <form>
            {/* Username Input */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login Button */}
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={handleLogin}
            >
              LOGIN
            </button>

            {/* Remember Me and Forgot Password */}
            <div className="message">
              <div>
                <a href="#">Forgot your password?</a>
              </div>
            </div>
          </form>

          {/* Social Icons */}
          <div className="social">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter-square"></i>
            </a>
            <a href="#">
              <i className="fab fa-google"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
