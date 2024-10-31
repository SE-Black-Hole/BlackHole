// Sofia, Rohin, Yatin, Hassan
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { useState } from 'react';
import Login from '../pages/Login';
import SignUp from '../pages/Signup';
import Home from '../pages/Home';
import RemainingCourses from '../pages/RemainingCourses';
import CompletedCourses from '../pages/CompletedCourses';
import AccountSettings from '../pages/AccountSettings';
import Dashboard from '../pages/Dashboard';
import VisualFlowchart from '../pages/VisualFlowchart';
import ManagePlans from '../pages/ManagePlans';
import PlanEditor from '../pages/PlanEditor';

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
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/flowchart"
            element={
              isLoggedIn ? <VisualFlowchart /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/plan-management"
            element={
              isLoggedIn ? <ManagePlans /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/plan-editor/:planId"
            element={
              isLoggedIn ? <PlanEditor /> : <Login onLogin={handleLogin} />
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
