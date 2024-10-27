const Home = ({ username, onLogout }) => {
  return (
    <div>
      <div className="logout-button-container">
        <button
          type="button"
          className="btn btn-secondary logout-button"
          onClick={onLogout}
        >
          LOGOUT
        </button>
      </div>
      <div className="container">
        <div className="dashboard-box">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Degree Planner Dashboard</h1>
          </div>
          <div className="dashboard-body">
            <p>Welcome, {username}! You are now logged in.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
