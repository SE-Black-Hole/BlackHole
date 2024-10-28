import React from 'react';
import { useNavigate } from 'react-router-dom';

function CurrentDegreePlanPage({ handleLogout }) {
    const navigate = useNavigate();

    return (
        <div className="degree-plan-container">
            {/* Back and Logout Buttons at the Top Right */}
            <div className="button-container">
                <button
                    type="button"
                    className="btn btn-secondary back-button"
                    onClick={() => navigate('/')}
                >
                    BACK
                </button>
                <button
                    type="button"
                    className="btn btn-secondary logout-button"
                    onClick={handleLogout}
                >
                    LOGOUT
                </button>
            </div>

            {/* Sidebar */}
            <div className="sidebar">
                <h2 className="sidebar-title">Welcome, First name</h2>
                <ul className="sidebar-menu">
                    <li>Current Degree Plan</li>
                    <li>Add Classes</li>
                    <li>Remove Classes</li>
                    <li>Swap Classes</li>
                </ul>
                <div className="sidebar-settings">
                    <a href="#">Settings</a>
                </div>
            </div>

            {/* Main Content */}
            <div className="content">
                <h1 className="content-title">Current Degree Plan</h1>
                <table className="degree-table">
                    <thead>
                        <tr>
                            <th>Course Number</th>
                            <th>Course Name</th>
                            <th>Credit Hours</th>
                            <th>Course Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CS101</td>
                            <td>Introduction to Programming</td>
                            <td>3</td>
                            <td>Beginner</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CurrentDegreePlanPage;
