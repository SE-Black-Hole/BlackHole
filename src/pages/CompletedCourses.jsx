// Sofia Deichert - Test Case 1

// Test Case Description: User can view completed courses in their CS degree plan

// This component implements a sortable table displaying completed courses in a CS degree plan.

// The table allows sorting by
// 1) course name
// 2) credit hours
// 3) semester completed

// The component includes sample data and maintains consistent styling with the app's dark theme.

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const CompletedCourses = () => {
  // Sample data structure representing completed courses
  // Each course has a course number, name, credit hours, and completion semester
  const initialCourses = [
    {
      courseNumber: 'CS1200',
      courseName: 'Intro to CS and SE',
      creditHours: 3,
      semesterCompleted: '2023 Fall',
    },
    {
      courseNumber: 'CS1436',
      courseName: 'Program Fundamentals',
      creditHours: 3,
      semesterCompleted: '2023 Fall',
    },
    {
      courseNumber: 'CS1337',
      courseName: 'Computer Science I',
      creditHours: 3,
      semesterCompleted: '2023 Fall',
    },
    {
      courseNumber: 'CS2305',
      courseName: 'Discrete Mathematics for Computing I',
      creditHours: 3,
      semesterCompleted: '2023 Fall',
    },
    {
      courseNumber: 'CS2340',
      courseName: 'Computer Architecture',
      creditHours: 3,
      semesterCompleted: '2024 Spring',
    },
    {
      courseNumber: 'MATH2414',
      courseName: 'Integral Calculus or Calculus II',
      creditHours: 4,
      semesterCompleted: '2024 Spring',
    },
  ];

  // State management for courses data and sorting configuration
  // courses: current state of the courses list
  // sortConfig: tracks which column is being sorted and in what direction
  const [courses, setCourses] = useState(initialCourses);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  // Helper function to convert semester strings into sortable numeric values
  // Format: "YYYY Season" -> YYYY * 10 + seasonValue
  // seasonValue: Spring = 1, Summer = 2, Fall = 3
  const parseSemester = (semesterString) => {
    const [year, semester] = semesterString.split(' ');
    const semesterValue = {
      Spring: 1,
      Summer: 2,
      Fall: 3,
    };
    return parseInt(year) * 10 + semesterValue[semester];
  };

  // Handles sorting when a column header is clicked
  // key: the column to sort by (courseName, creditHours, or semesterCompleted)
  // Updates sort direction if clicking the same column multiple times
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    // Sort the courses based on the selected column and direction
    const sortedCourses = [...courses].sort((a, b) => {
      if (key === 'creditHours') {
        // Numeric sorting for credit hours
        return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
      } else if (key === 'semesterCompleted') {
        // Custom sorting for semesters using the parseSemester helper
        const semesterA = parseSemester(a[key]);
        const semesterB = parseSemester(b[key]);
        return direction === 'ascending'
          ? semesterA - semesterB
          : semesterB - semesterA;
      } else {
        // String comparison for course names
        return direction === 'ascending'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setCourses(sortedCourses);
    setSortConfig({ key, direction });
  };

  // Renders the appropriate sort icon for each column header
  // Shows empty up arrow on hover for unsorted columns
  // Shows up/down arrow for the currently sorted column
  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronUp className="w-4 h-4" />
        </div>
      );
    }
    return sortConfig.direction === 'ascending' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  // Component render method
  return (
    // Root container with full height/width and gradient background
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      {/* Main content card with glass-like effect */}
      <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        {/* Card header with gradient background */}
        <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
          <h1 className="text-white text-2xl font-bold">Completed Courses</h1>
        </div>

        {/* Table wrapper with padding and horizontal scroll capability */}
        <div className="p-6">
          <div className="overflow-x-auto">
            {/* Full-width table for course data */}
            <table className="w-full">
              {/* Table header section */}
              <thead>
                {/* Header row with bottom border */}
                <tr className="border-b border-gray-700">
                  {/* Static course number column - no sorting */}
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                    Course Number
                  </th>
                  {/* Sortable course name column with click handler and hover effects */}
                  <th
                    className="px-6 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer group"
                    onClick={() => handleSort('courseName')}
                  >
                    {/* Flex container for header text and sort icon */}
                    <div className="flex items-center space-x-1">
                      <span>Course Name</span>
                      {/* Dynamic sort icon based on current sort state */}
                      {getSortIcon('courseName')}
                    </div>
                  </th>
                  {/* Sortable credit hours column */}
                  <th
                    className="px-6 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer group"
                    onClick={() => handleSort('creditHours')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Credit Hours</span>
                      {getSortIcon('creditHours')}
                    </div>
                  </th>
                  {/* Sortable semester column */}
                  <th
                    className="px-6 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer group"
                    onClick={() => handleSort('semesterCompleted')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Semester of Completion</span>
                      {getSortIcon('semesterCompleted')}
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Table body - Dynamic course data rows */}
              <tbody>
                {/* Map through courses array to create table rows */}
                {courses.map((course, index) => (
                  // Individual course row with unique key
                  <tr
                    key={course.courseNumber}
                    className={`
                      border-b border-gray-700/50 
                      ${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                      hover:bg-gray-700/30 transition-colors
                    `}
                  >
                    {/* Course data cells with consistent padding and text styling */}
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {course.courseNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {course.courseName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {course.creditHours}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      {course.semesterCompleted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedCourses;
