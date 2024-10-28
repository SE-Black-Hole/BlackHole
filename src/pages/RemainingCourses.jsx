import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const RemainingCourses = () => {
  // Hard Coded Sample Data
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

  const [courses, setCourses] = useState(initialCourses);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  // Level order for sorting
  const levelOrder = {
    Freshman: 1,
    Sophomore: 2,
    Junior: 3,
    Senior: 4,
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedCourses = [...courses].sort((a, b) => {
      if (key === 'creditHours') {
        return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
      } else if (key === 'courseLevel') {
        return direction === 'ascending'
          ? levelOrder[a[key]] - levelOrder[b[key]]
          : levelOrder[b[key]] - levelOrder[a[key]];
      } else {
        return direction === 'ascending'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setCourses(sortedCourses);
    setSortConfig({ key, direction });
  };

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
          <h1 className="text-white text-2xl font-bold">Remaining Courses</h1>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
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
