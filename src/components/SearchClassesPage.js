import React, { useState } from 'react';

const SearchClassesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const classes = [
        'Mathematics 101',               // MATH 2413 - Calculus I
        'Mathematics 102',               // MATH 2417 - Enhanced Calculus I
        'Rhetoric 101',                  // RHET 1302 - Rhetoric
        'Engineering 101',               // ECS 1100 - Introduction to Engineering and Computer Science
        'Computer Science 101',          // CS 1200 - Introduction to Computer Science and Software Engineering
        'Computer Science 102',          // CS 1436 - Programming Fundamentals
        'Mathematics 201',               // MATH 2414 - Calculus II
        'Mathematics 202',               // MATH 2419 - Enhanced Calculus II
        'Physics 101',                   // PHYS 2325 - Mechanics
        'Physics Lab 101',               // PHYS 2125 - Physics Lab I
        'Computer Science 103',          // CS 1337 - Computer Science I
        'Mathematics 103',               // CS 2305 - Discrete Mathematics for Computing I
        'Physics 102',                   // PHYS 2326 - Electromagnetism and Waves
        'Physics Lab 102',               // PHYS 2126 - Physics Lab II
        'Computer Science 104',          // CS 2336 - Computer Science II
        'Computer Architecture 101',     // CS 2340 - Computer Architecture
        'Mathematics 104',               // CS 3305 - Discrete Mathematics for Computing II
        'Linear Algebra 101',            // MATH 2418 - Linear Algebra
        'Computer Science 201',          // CS 3345 - Data Structures and Introduction to Algorithmic Analysis
        'Computer Science 202',          // CS 3377 - C/C++ Programming in a UNIX Environment
        'Business Communication 101',    // ECS 2390 - Business and Professional Communication
        'Software Engineering 101',      // CS 3354 - Software Engineering
        'Programming Languages 101',     // CS 4337 - Organization of Programming Languages
        'Database Systems 101',          // CS 4347 - Database Systems
        'Technical Communication 101',   // CS 4141 - Professional and Technical Communication in Computing
        'Digital Logic 101',             // CS 4341 - Digital Logic and Computer Design
        'Operating Systems 101',         // CS 4348 - Operating Systems Concepts
        'Algorithm Design 101',          // CS 4349 - Advanced Algorithm Design and Analysis
        'Automata Theory 101',           // CS 4384 - Automata Theory
        'Computer Science Project',      // CS 4485 - Computer Science Project
        'Technical Elective 1',          // Major Technical Elective 1
        'Technical Elective 2',          // Major Technical Elective 2
        'Technical Elective 3',          // Major Technical Elective 3
        'Elective 101',                  // Free Elective 1
        'Elective 102',                  // Free Elective 2
        'Elective 103',                  // Free Elective 3
        'Elective 104',                  // Free Elective 4
    ];

    const filteredClasses = classes.filter(course => 
        course.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Search Classes</h1>
            <input 
                type="text" 
                placeholder="Search for a class" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border rounded w-full mb-4"
            />
            <ul>
                {filteredClasses.length > 0 ? (
                    filteredClasses.map((course, index) => (
                        <li key={index} className="p-2 border-b">
                            {course}
                        </li>
                    ))
                ) : (
                    <li className="p-2">No classes found</li>
                )}
            </ul>
        </div>
    );
};

export default SearchClassesPage;