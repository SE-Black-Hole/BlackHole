// Sofia Deichert - Test Case 1

// Test Case Description: User can view completed courses in their CS degree plan

// This component implements a sortable table displaying completed courses in a CS degree plan.

// The table allows sorting by
// 1) course name
// 2) credit hours
// 3) semester completed

// The component includes sample data and maintains consistent styling with the app's dark theme.

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'lucide-react';

const CompletedCourses = () => {
  const location = useLocation();
  const initialCourses = location.state?.completedCourses || [];
  const [courses, setCourses] = useState(initialCourses);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const parseSemester = (semesterString) => {
    const [year, semester] = semesterString.split(' ');
    const semesterValue = { Spring: 1, Summer: 2, Fall: 3 };
    return parseInt(year) * 10 + semesterValue[semester];
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedCourses = [...courses].sort((a, b) => {
      if (key === 'creditHours') {
        return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
      } else if (key === 'semesterCompleted') {
        const semesterA = parseSemester(a[key]);
        const semesterB = parseSemester(b[key]);
        return direction === 'ascending' ? semesterA - semesterB : semesterB - semesterA;
      } else {
        return direction === 'ascending' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);
      }
    });

    setCourses(sortedCourses);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <ChevronUp className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />;
    }
    return sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
          <h1 className="text-white text-2xl font-bold">Completed Courses</h1>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300">Course Number</th>
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
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr
                  key={course.courseNumber}
                  className={`${index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'} hover:bg-gray-700/30 transition-colors border-b border-gray-700/50`}
                >
                  <td className="px-6 py-4 text-sm text-gray-300">{course.classNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{course.className}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{course.creditHours}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedCourses;
