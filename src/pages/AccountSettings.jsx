import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccountSettings = ({ onLogout }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // TODO: Implement API call to change password
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (currentPassword === '') {
      alert('Please enter your current password');
      return;
    }
    alert('Password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleUsernameChange = (e) => {
    e.preventDefault();
    // TODO: Implement API call to change username
    if (newUsername.trim() === '') {
      alert('Please enter a new username');
      return;
    }
    alert('Username updated successfully');
    setNewUsername('');
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmed) {
      // TODO: Implement API call to delete account
      alert('Account deleted successfully');
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
            <h1 className="text-white text-2xl font-bold">Account Settings</h1>
          </div>

          <div className="p-8 space-y-8">
            {/* Change Username Section */}
            <div className="space-y-4">
              <h2 className="text-xl text-white font-medium">
                Change Username
              </h2>
              <form onSubmit={handleUsernameChange} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Update Username
                </button>
              </form>
            </div>

            {/* Change Password Section */}
            <div className="space-y-4">
              <h2 className="text-xl text-white font-medium">
                Change Password
              </h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Delete Account Section */}
            <div className="space-y-4">
              <h2 className="text-xl text-white font-medium">Delete Account</h2>
              <p className="text-gray-400">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
