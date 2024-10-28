import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../styles/App.css';
import CurrentDegreePlanPage from './CurrentDegreePlanPage';
import ManageClassesPage from './ManageClassesPage'; // Import the new page

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Hardcoded login credentials
  const correctUsername = 'dp';
  const correctPassword = '12';

  const handleLogin = () => {
    if (username === '' || password === '') {
      alert('Please enter both username and password.');
      return;
    }

    if (username === correctUsername && password === correctPassword) {
      setIsLoggedIn(true); // Successful login
    } else {
      alert('Incorrect username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <Routes>
            <Route
              path="/"
              element={
                <div className="container">
                  <div className="logout-button-container">
                    <button
                      type="button"
                      className="btn btn-secondary logout-button"
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </button>
                  </div>
                  <div className="dashboard-box">
                    <h1 className="dashboard-title">Degree Planner Dashboard</h1>
                    <p>Welcome, {correctUsername}! You are now logged in.</p>

                    {/* Navigation Buttons */}
                    <div className="button-group">
                      <Link to="/current-degree-plan">
                        <button className="btn btn-primary">Go to Degree Plan</button>
                      </Link>
                      <Link to="/manage-classes">
                        <button className="btn btn-secondary">Manage Classes</button>
                      </Link>
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/current-degree-plan" element={<CurrentDegreePlanPage handleLogout={handleLogout} />} />
            <Route path="/manage-classes" element={<ManageClassesPage handleLogout={handleLogout} />} />
          </Routes>
        ) : (
          <div className="container">
            <div className="form-box">
              {/* Login form here */}
              <div className="bg-black w-full h-16 flex items-center justify-center">
                <h1 className="text-white font-bold" style={{ fontSize: "1.75rem" }}>
                  Automatic Degree Planner
                </h1>
              </div>
              <form>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-block"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
