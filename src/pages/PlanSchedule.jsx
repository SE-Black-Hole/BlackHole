import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PlanSchedule = () => {
    const navigate = useNavigate();

    const coursesData = [
        { classNumber: "ECS 1100", className: "Introduction to Engineering and Computer Science", creditHours: 1 },
        { classNumber: "CS 1200", className: "Introduction to Computer Science and Software Engineering", creditHours: 2 },
        { classNumber: "CS 1436", className: "Programming Fundamentals", creditHours: 4 },
        { classNumber: "MATH 2413", className: "Calculus I", creditHours: 4 },
        { classNumber: "CS 2305", className: "Discrete Mathematics for Computing I", creditHours: 3 },
        { classNumber: "MATH 2414", className: "Calculus II", creditHours: 4 },
        { classNumber: "PHYS 2325", className: "Mechanics", creditHours: 3 },
        { classNumber: "PHYS 2125", className: "Physics Lab I", creditHours: 1 },
        { classNumber: "CS 1337", className: "Computer Science I", creditHours: 3 },
        { classNumber: "PHYS 2326", className: "Electromagnetism and Waves", creditHours: 3 },
        { classNumber: "PHYS 2126", className: "Physics Lab II", creditHours: 1 },
        { classNumber: "CS 2336", className: "Computer Science II", creditHours: 3 },
        { classNumber: "CS 2340", className: "Computer Architecture", creditHours: 3 },
        { classNumber: "MATH 2418", className: "Linear Algebra", creditHours: 4 },
        { classNumber: "CS 3345", className: "Data Structures and Introduction to Algorithmic Analysis", creditHours: 3 },
        { classNumber: "CS 3377", className: "C/C++ Programming in a UNIX Environment", creditHours: 3 },
        { classNumber: "ECS 2390", className: "Business and Professional Communication", creditHours: 3 },
        { classNumber: "CS 3354", className: "Software Engineering", creditHours: 3 },
        { classNumber: "CS 4337", className: "Organization of Programming Languages", creditHours: 3 },
        { classNumber: "CS 4347", className: "Database Systems", creditHours: 3 },
        { classNumber: "CS 4141", className: "Professional and Technical Communication in Computing", creditHours: 1 },
        { classNumber: "CS 4341", className: "Digital Logic and Computer Design", creditHours: 3 },
        { classNumber: "CS 4348", className: "Operating Systems Concepts", creditHours: 3 },
        { classNumber: "CS 4349", className: "Advanced Algorithm Design and Analysis", creditHours: 3 },
        { classNumber: "CS 4384", className: "Automata Theory", creditHours: 3 },
        { classNumber: "CS 4485", className: "Computer Science Project", creditHours: 4 },
        { classNumber: "CS 4314", className: "Intelligent Systems Analysis", creditHours: 3 },
        { classNumber: "CS 4315", className: "Intelligent Systems Design", creditHours: 3 },
        { classNumber: "CS 4332", className: "Introduction to Programming Video Games", creditHours: 3 },
        { classNumber: "CS 4334", className: "Numerical Analysis", creditHours: 3 },
        { classNumber: "CS 4336", className: "Advanced Java", creditHours: 3 },
        { classNumber: "CS 4352", className: "Introduction to Human-Computer Interaction", creditHours: 3 },
        { classNumber: "CS 4361", className: "Computer Graphics", creditHours: 3 },
        { classNumber: "CS 4365", className: "Artificial Intelligence", creditHours: 3 },
        { classNumber: "CS 4375", className: "Introduction to Machine Learning", creditHours: 3 },
        { classNumber: "CS 4376", className: "Object-Oriented Design", creditHours: 3 },
        { classNumber: "CS 4386", className: "Compiler Design", creditHours: 3 },
        { classNumber: "CS 4389", className: "Data and Applications Security", creditHours: 3 },
        { classNumber: "CS 4390", className: "Computer Networks", creditHours: 3 },
        { classNumber: "CS 4391", className: "Introduction to Computer Vision", creditHours: 3 },
        { classNumber: "CS 4392", className: "Computer Animation", creditHours: 3 },
        { classNumber: "CS 4393", className: "Computer and Network Security", creditHours: 3 },
        { classNumber: "CS 4394", className: "Implementation of Modern Operating Systems", creditHours: 3 },
        { classNumber: "CS 4395", className: "Human Language Technologies", creditHours: 3 },
        { classNumber: "CS 4396", className: "Networking Laboratory", creditHours: 3 },
        { classNumber: "CS 4397", className: "Embedded Computer Systems", creditHours: 3 },
        { classNumber: "CS 4398", className: "Digital Forensics", creditHours: 3 },
        { classNumber: "CS 4399", className: "Senior Honors in Computer Science", creditHours: 3 },
        { classNumber: "CS 4459", className: "Cyber Attack and Defense Laboratory", creditHours: 3 },
        { classNumber: "EE 4325", className: "Introduction to VLSI Design", creditHours: 3 },
        { classNumber: "SE 4351", className: "Requirements Engineering", creditHours: 3 },
        { classNumber: "SE 4352", className: "Software Architecture and Design", creditHours: 3 },
        { classNumber: "SE 4367", className: "Software Testing, Verification, Validation and Quality Assurance", creditHours: 3 },
        { classNumber: "SE 4381", className: "Software Project Planning and Management", creditHours: 3 }
    ];
    
          
    const mainCourses = coursesData.slice(0, coursesData.findIndex(course => course.classNumber === "CS 4485") + 1);
    const guidedElectives = coursesData.slice(coursesData.findIndex(course => course.classNumber === "CS 4485") + 1);

    const [courses, setCourses] = useState(mainCourses);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [completedCourses, setCompletedCourses] = useState(new Set());
  
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    
        const sortedCourses = [...courses].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    
        setCourses(sortedCourses);
    };
  
    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return null;
    };
  
    const handleCheckboxChange = (courseNumber) => {
        const newCompletedCourses = new Set(completedCourses);
        if (newCompletedCourses.has(courseNumber)) {
            newCompletedCourses.delete(courseNumber);
        } else {
            newCompletedCourses.add(courseNumber);
        }
        setCompletedCourses(newCompletedCourses);
    };

    const getRandomGuidedElectives = (n) => {
        const uncompletedGuidedElectives = guidedElectives.filter(course => !completedCourses.has(course.classNumber));
        const randomElectives = [];
        while (randomElectives.length < n && uncompletedGuidedElectives.length > 0) {
            const randomIndex = Math.floor(Math.random() * uncompletedGuidedElectives.length);
            randomElectives.push(uncompletedGuidedElectives.splice(randomIndex, 1)[0]);
        }
        return randomElectives;
    };

    const sendCoursesToBackend = async (completedCoursesList, remainingCoursesList) => {
        console.log("Completed Courses:", completedCoursesList);
    console.log("Remaining Courses:", remainingCoursesList);
        try {
            const response = await fetch('http://localhost:5000/update-student-courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'DegreePlanner1',
                    completed_courses: completedCoursesList,
                    remaining_courses: remainingCoursesList
                })
            });
            if (!response.ok) {
                throw new Error('Failed to send courses to the backend');
            }
            console.log('Courses sent to backend successfully');
        } catch (error) {
            console.error(error);
        }
    };

    const handleGenerateFlowchartClick = () => {
        const uncompletedMainCourses = mainCourses.filter(course => !completedCourses.has(course.classNumber));
        const randomGuidedElectives = getRandomGuidedElectives(4);
        const flowchartCourses = [...uncompletedMainCourses, ...randomGuidedElectives];
        sendCoursesToBackend(Array.from(completedCourses), flowchartCourses);

        navigate('/flowchart', { state: { remainingCourses: flowchartCourses } });
    };

    const handleViewCourses = (type) => {
        const completedCoursesList = Array.from(completedCourses).map(courseNumber => 
            mainCourses.concat(guidedElectives).find(course => course.classNumber === courseNumber)
        ).filter(Boolean);
    
        const uncompletedMainCourses = mainCourses.filter(course => !completedCourses.has(course.classNumber));
    
        const randomGuidedElectives = getRandomGuidedElectives(4);
    
        const remainingCourses = [...uncompletedMainCourses, ...randomGuidedElectives];
    
        sendCoursesToBackend(completedCoursesList, remainingCourses);
    
        if (type === 'completed') {
            navigate('/completed-courses', { state: { completedCourses: completedCoursesList } });
        } else if (type === 'remaining') {
            navigate('/remaining-courses', { state: { remainingCourses } });
        }
    };
    
    

    const handleViewRemainingClick = () => {
        handleViewCourses('remaining');
    };
    
    const handleViewCompletedClick = () => {
        handleViewCourses('completed');
    };
    
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
            <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
                    <h1 className="text-white text-2xl font-bold">Plan Schedule</h1>
                </div>
                <div className="p-6">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-700">
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Course ID</th>
                                    <th
                                        className="px-6 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer"
                                        onClick={() => handleSort('className')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Course Name</span>
                                        </div>
                                    </th>
                                    <th
                                        className="px-6 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer"
                                        onClick={() => handleSort('creditHours')}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>Credit Hours</span>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Taken Class?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mainCourses.map((course, index) => (
                                    <tr key={course.classNumber} className={`${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'} hover:bg-gray-700/30 transition-colors border-b border-gray-700/50`}>
                                        <td className="px-6 py-4 text-sm text-gray-300">{course.classNumber}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{course.className}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{course.creditHours}</td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-300">
                                            <input
                                                type="checkbox"
                                                checked={completedCourses.has(course.classNumber)}
                                                onChange={() => handleCheckboxChange(course.classNumber)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            <thead>
                                <tr>
                                    <th colSpan="4" className="px-6 py-4 text-left text-sm font-medium text-gray-300 bg-gray-800">
                                        Guided Electives
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {guidedElectives.map((course, index) => (
                                    <tr key={course.classNumber} className={`${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'} hover:bg-gray-700/30 transition-colors border-b border-gray-700/50`}>
                                        <td className="px-6 py-4 text-sm text-gray-300">{course.classNumber}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{course.className}</td>
                                        <td className="px-6 py-4 text-sm text-gray-300">{course.creditHours}</td>
                                        <td className="px-6 py-4 text-sm text-center text-gray-300">
                                            <input
                                                type="checkbox"
                                                checked={completedCourses.has(course.classNumber)}
                                                onChange={() => handleCheckboxChange(course.classNumber)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={handleViewRemainingClick}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            View Remaining Classes
                        </button>
                        <button
                            onClick={handleViewCompletedClick}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        >
                            View Completed Classes
                        </button>
                        <button
                            onClick={handleGenerateFlowchartClick}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Generate Flowchart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanSchedule;