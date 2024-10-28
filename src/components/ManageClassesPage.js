// src/components/ManageClassesPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ManageClassesPage({ handleLogout }) {
    const navigate = useNavigate();

    return (
        <div className="manage-classes-container">
            {/* Back Button on the Top Left and Logout Button on the Top Right */}
            <div className="button-container">
                <button
                    type="button"
                    className="btn back-button"
                    onClick={() => navigate('/')}
                >
                    BACK
                </button>
                <button
                    type="button"
                    className="btn logout-button"
                    onClick={handleLogout}
                >
                    LOGOUT
                </button>
            </div>

            {/* Main Content */}
            <div className="content">
                <h1 className="content-title">Manage Classes</h1>
                <div className="actions-container">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => console.log('Add Classes clicked')}
                    >
                        Add Classes
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => console.log('Remove Classes clicked')}
                    >
                        Remove Classes
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => console.log('Swap Classes clicked')}
                    >
                        Swap Classes
                    </button>
                </div>

                {/* Table */}
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
                            <td>CS102</td>
                            <td>Data Structures</td>
                            <td>4</td>
                            <td>Intermediate</td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageClassesPage;
