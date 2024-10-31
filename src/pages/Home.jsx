// Sofia, Rohin, Yatin, Hassan
import { useNavigate } from 'react-router-dom';

const Home = ({ username, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      {/* Main Content */}
      <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden min-h-[600px] mx-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
          <h1 className="text-white text-2xl font-bold">Current Degree Plan</h1>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="text-gray-200 space-y-8">
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

            {/* Quick Actions Section */}
            <div className="mt-12">
              <h3 className="text-xl font-medium text-gray-300 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Dashboard Card/Button */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="group relative overflow-hidden rounded-lg p-6 border border-gray-700 bg-gradient-to-br from-gray-800/50 to-black/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <h4 className="text-lg font-medium text-gray-200 mb-2">
                      Dashboard
                    </h4>
                    <p className="text-gray-400 text-sm">
                      View your degree progress and credit hour breakdown
                    </p>
                  </div>
                </button>

                {/* Visual Flowchart Card/Button */}
                <button
                  onClick={() => navigate('/flowchart')}
                  className="group relative overflow-hidden rounded-lg p-6 border border-gray-700 bg-gradient-to-br from-gray-800/50 to-black/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <h4 className="text-lg font-medium text-gray-200 mb-2">
                      Visual Flowchart
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Explore your degree plan as an interactive flowchart
                    </p>
                  </div>
                </button>
                {/* Remaining Courses Card/Button */}
                <button
                  onClick={() => navigate('/remaining-courses')}
                  className="group relative overflow-hidden rounded-lg p-6 border border-gray-700 bg-gradient-to-br from-gray-800/50 to-black/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <h4 className="text-lg font-medium text-gray-200 mb-2">
                      View Remaining Courses
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Check your remaining required courses and track your
                      progress
                    </p>
                  </div>
                </button>

                {/* Completed Courses Card/Button */}
                <button
                  onClick={() => navigate('/completed-courses')}
                  className="group relative overflow-hidden rounded-lg p-6 border border-gray-700 bg-gradient-to-br from-gray-800/50 to-black/50 hover:from-gray-700/50 hover:to-gray-800/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-black/30 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <h4 className="text-lg font-medium text-gray-200 mb-2">
                      View Completed Courses
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Review your completed courses and academic progress
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
