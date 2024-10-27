const Home = ({ username, onLogout }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      {/* Logout Button */}
      <div className="flex justify-end mb-6 px-8">
        <button
          type="button"
          className="px-6 py-2 border border-gray-700 rounded-md text-gray-300 hover:bg-gray-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
          onClick={onLogout}
        >
          LOGOUT
        </button>
      </div>

      {/* Main Content */}
      <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden min-h-[600px] mx-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
          <h1 className="text-white text-2xl font-bold">
            Degree Planner Dashboard
          </h1>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-gray-200 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-700 rounded-full flex items-center justify-center">
                <span className="text-gray-300 text-2xl font-bold">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-medium">Welcome, {username}!</h2>
                <p className="text-gray-400">You are now logged in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
