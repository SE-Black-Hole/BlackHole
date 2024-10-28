import React, { useState } from "react";

// Mock data for available courses
const coursesData = [
  { id: 1, name: "MATH 2413 - Calculus I", creditHours: 4 },
  { id: 2, name: "MATH 2417 - Enhanced Calculus I", creditHours: 4 },
  { id: 3, name: "RHET 1302 - Rhetoric", creditHours: 3 },
  { id: 4, name: "ECS 1100 - Introduction to Engineering and Computer Science", creditHours: 1 },
  { id: 5, name: "CS 1200 - Introduction to Computer Science and Software Engineering", creditHours: 2 },
  { id: 6, name: "CS 1436 - Programming Fundamentals", creditHours: 4 },
  { id: 7, name: "MATH 2414 - Calculus II", creditHours: 4 },
  { id: 8, name: "MATH 2419 - Enhanced Calculus II", creditHours: 4 },
  { id: 9, name: "PHYS 2325 - Mechanics", creditHours: 3 },
  { id: 10, name: "PHYS 2125 - Physics Lab I", creditHours: 1 },
  { id: 11, name: "CS 1337 - Computer Science I", creditHours: 3 },
  { id: 12, name: "CS 2305 - Discrete Mathematics for Computing I", creditHours: 3 },
  { id: 13, name: "PHYS 2326 - Electromagnetism and Waves", creditHours: 3 },
  { id: 14, name: "PHYS 2126 - Physics Lab II", creditHours: 1 },
  { id: 15, name: "CS 2336 - Computer Science II", creditHours: 3 },
  { id: 16, name: "CS 2340 - Computer Architecture", creditHours: 3 },
  { id: 17, name: "CS 3305 - Discrete Mathematics for Computing II", creditHours: 3 },
  { id: 18, name: "MATH 2418 - Linear Algebra", creditHours: 4 },
  { id: 19, name: "CS 3345 - Data Structures and Introduction to Algorithmic Analysis", creditHours: 3 },
  { id: 20, name: "CS 3377 - C/C++ Programming in a UNIX Environment", creditHours: 3 },
  { id: 21, name: "ECS 2390 - Business and Professional Communication", creditHours: 3 },
  { id: 22, name: "CS 3354 - Software Engineering", creditHours: 3 },
  { id: 23, name: "CS 4337 - Organization of Programming Languages", creditHours: 3 },
  { id: 24, name: "CS 4347 - Database Systems", creditHours: 3 },
  { id: 25, name: "CS 4141 - Professional and Technical Communication in Computing", creditHours: 1 },
  { id: 26, name: "CS 4341 - Digital Logic and Computer Design", creditHours: 3 },
  { id: 27, name: "CS 4348 - Operating Systems Concepts", creditHours: 3 },
  { id: 28, name: "CS 4349 - Advanced Algorithm Design and Analysis", creditHours: 3 },
  { id: 29, name: "CS 4384 - Automata Theory", creditHours: 3 },
  { id: 30, name: "CS 4485 - Computer Science Project", creditHours: 4 },
  { id: 31, name: "Major Technical Elective 1", creditHours: 3 },
  { id: 32, name: "Major Technical Elective 2", creditHours: 3 },
  { id: 33, name: "Major Technical Elective 3", creditHours: 3 },
  { id: 34, name: "Free Elective 1", creditHours: 3 },
  { id: 35, name: "Free Elective 2", creditHours: 2 },
  { id: 36, name: "Free Elective 3", creditHours: 3 },
  { id: 37, name: "Free Elective 4", creditHours: 2 },
];

const CourseEnrollment = () => {
  const [availableCourses, setAvailableCourses] = useState(coursesData);
  const [degreePlan, setDegreePlan] = useState([]);
  const [remainingCourses, setRemainingCourses] = useState([]);
  const [completed, setCompleted] = useState(false);

  // Add selected course to degree plan
  const toggleCourseSelection = (course) => {
    if (degreePlan.some((c) => c.id === course.id)) {
      setDegreePlan(degreePlan.filter((c) => c.id !== course.id));
    } else {
      setDegreePlan([...degreePlan, course]);
    }
  };

  // Finalize degree plan and show remaining courses
  const finalizeDegreePlan = () => {
    setCompleted(true);
    setRemainingCourses(availableCourses.filter((course) => !degreePlan.includes(course)));
  };

  return (
    <div className="course-enrollment space-y-8">
      <h1 className="text-2xl font-bold text-center">Course Enrollment</h1>
      
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Available Courses Section */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
          <ul className="space-y-2">
            {availableCourses.map((course) => (
              <li key={course.id} className="flex justify-between items-center border-b pb-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={degreePlan.some((c) => c.id === course.id)}
                    onChange={() => toggleCourseSelection(course)}
                  />
                  <span>{course.name} - {course.creditHours} credit hours</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Degree Plan Section */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Selected Degree Plan</h2>
          <ul className="space-y-2">
            {degreePlan.map((course) => (
              <li key={course.id} className="border-b pb-2">
                {course.name} - {course.creditHours} credit hours
              </li>
            ))}
          </ul>
          <button 
            onClick={finalizeDegreePlan}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Finalize Degree Plan
          </button>
        </div>
      </div>

      {/* Remaining Courses Section */}
      {completed && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-8">
          <h2 className="text-xl font-semibold mb-4">Remaining Courses</h2>
          <ul className="space-y-2">
            {remainingCourses.map((course) => (
              <li key={course.id} className="border-b pb-2">
                {course.name} - {course.creditHours} credit hours
              </li>
            ))}
          </ul>
          <button
            onClick={() => alert("Generate Schedule functionality to be added")}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Generate Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseEnrollment;