// Sofia Deichert - Test Case 2

// Test Case Description: User can view remaining courses in their CS degree plan

// This component implements a sortable table displaying remaining courses in a CS degree plan.

// The table allows sorting by
// 1) course name
// 2) credit hours
// 3) course level

// The component includes sample data and maintains consistent styling with the app's dark theme.

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const RemainingCourses = () => {
  // Sample course data structure with course details
  // Each course has a course number, name, credit hours, and level
  const initialCourses = [
    {
      courseNumber: 'CS4341',
      courseName: 'Digital Logic and Computer Design',
      creditHours: 3,
      courseLevel: 'Senior',
    },
    {
      courseNumber: 'CS4141',
      courseName: 'Digital Systems Laboratory',
      creditHours: 1,
      courseLevel: 'Senior',
    },
    {
      courseNumber: 'CS4347',
      courseName: 'Database Systems',
      creditHours: 3,
      courseLevel: 'Senior',
    },
    {
      courseNumber: 'CS4348',
      courseName: 'Operating Systems Concepts',
      creditHours: 3,
      courseLevel: 'Senior',
    },
    {
      courseNumber: 'CS4349',
      courseName: 'Adv Algorithm Design & Analysis',
      creditHours: 3,
      courseLevel: 'Senior',
    },
    {
      courseNumber: 'CS3377',
      courseName: 'C/C++ Programming in a UNIX Environment',
      creditHours: 3,
      courseLevel: 'Junior',
    },
    {
      courseNumber: 'MATH2414',
      courseName: 'Integral Calculus',
      creditHours: 4,
      courseLevel: 'Sophomore',
    },
  ];

  // State for managing the course list and sorting configuration
  const [courses, setCourses] = useState(initialCourses);
  const [sortConfig, setSortConfig] = useState({
    key: null, // Column to sort by
    direction: 'ascending', // Sort direction
  });

  // Defines the order of course levels for proper sorting
  // Freshman courses should appear before Senior courses when sorting
  const levelOrder = {
    Freshman: 1,
    Sophomore: 2,
    Junior: 3,
    Senior: 4,
  };

  // Handles the sorting of courses when a column header is clicked
  // Changes sort direction if same column is clicked twice
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
      } else if (key === 'courseLevel') {
        // Custom sorting for course levels using levelOrder mapping
        return direction === 'ascending'
          ? levelOrder[a[key]] - levelOrder[b[key]]
          : levelOrder[b[key]] - levelOrder[a[key]];
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

  // Returns the appropriate sort icon based on column and sort state
  // Shows up arrow on hover for unsorted columns
  // Shows current sort direction for sorted column
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

  // Main component render
  // Creates a responsive table with sorting capabilities
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        {/* Header section with title */}
        <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
          <h1 className="text-white text-2xl font-bold">Remaining Courses</h1>
        </div>

        {/* Table container with overflow handling */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table headers with sort functionality */}
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">
                    Course Number
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer group"
                    onClick={() => handleSort('courseName')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Course Name</span>
                      {getSortIcon('courseName')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer group"
                    onClick={() => handleSort('creditHours')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Credit Hours</span>
                      {getSortIcon('creditHours')}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-sm font-medium text-gray-300 cursor-pointer group"
                    onClick={() => handleSort('courseLevel')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Course Level</span>
                      {getSortIcon('courseLevel')}
                    </div>
                  </th>
                </tr>
              </thead>
              {/* Table body with alternating row colors */}
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course.courseNumber}
                    className={`
                      border-b border-gray-700/50 
                      ${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}
                      hover:bg-gray-700/30 transition-colors
                    `}
                  >
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
                      {course.courseLevel}
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

export default RemainingCourses;
