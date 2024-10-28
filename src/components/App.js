import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { useState } from 'react';
import Login from '../pages/Login';
import Home from '../pages/Home';
import RemainingCourses from '../pages/RemainingCourses';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (loggedInUsername) => {
    setIsLoggedIn(true);
    setUsername(loggedInUsername);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Home username={username} onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <Home username={username} onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/remaining-courses"
            element={
              isLoggedIn ? (
                <RemainingCourses />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
