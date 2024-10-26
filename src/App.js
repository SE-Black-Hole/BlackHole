// App.js
import React from 'react';
import CourseEnrollment from './CourseEnrollment';
import './App.css'; // Assuming this file contains the background styling

function App() {
    return (
        <div className="app-background">
            <div className="navbar">Black Hole</div>
            <CourseEnrollment />
        </div>
    );
}

export default App;
