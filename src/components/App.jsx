import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { useState } from 'react';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import Home from '../pages/Home';
import RemainingCourses from '../pages/RemainingCourses';
import CompletedCourses from '../pages/CompletedCourses';
import AccountSettings from '../pages/AccountSettings';

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
      <Layout isLoggedIn={isLoggedIn} onLogout={handleLogout}>
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
          <Route path="/signup" element={<SignUp />} />
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
          <Route
            path="/completed-courses"
            element={
              isLoggedIn ? (
                <CompletedCourses />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/account-settings"
            element={
              isLoggedIn ? (
                <AccountSettings onLogout={handleLogout} />
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
