import React, { useState, useEffect } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const CourseSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-all-courses'); // Adjust the URL to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        const sortedCourses = data.all_courses_details.sort((a, b) => {
          const matchA = a.classNumber.match(/([a-zA-Z]+)(\d+)/);
          const matchB = b.classNumber.match(/([a-zA-Z]+)(\d+)/);
    
          if (matchA && matchB) {
            const [_, prefixA, numberA] = matchA;
            const [__, prefixB, numberB] = matchB;
    
            const prefixComparison = prefixA.localeCompare(prefixB);
            if (prefixComparison !== 0) {
              return prefixComparison;
            }
    
            return parseInt(numberA, 10) - parseInt(numberB, 10);
          }
    
          return 0;
        });

        setCourses(sortedCourses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = searchTerm
    ? courses.filter(
        (course) =>
          course.classNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.className.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : courses;
    if (loading) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center text-gray-300">
          Loading courses...
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="min-h-screen w-full flex items-center justify-center text-red-500">
          {error}
        </div>
      );
    }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
            <h1 className="text-white text-2xl font-bold">Course Search</h1>
          </div>

          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              {/* Description Card */}
              <div className="mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700 p-6 shadow-lg">
                <h2 className="text-lg font-medium text-white mb-2">
                  About Course Search
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Explore the complete catalog of courses available at UTD.
                  Search by course number (e.g., CS 1436) or course name to find
                  detailed information including course descriptions, credit
                  hours, and prerequisites. Click on any course to view its full
                  description.
                </p>
              </div>

              {/* Search Input */}
              <div className="relative mb-8">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by course number or name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              </div>

              {/* Course List */}
              <div className="space-y-2">
                {filteredCourses.map((course) => (
                  <div
                    key={course.classNumber}
                    className={`group bg-gradient-to-r ${
                      selectedCourse?.classNumber === course.classNumber
                        ? 'from-gray-800/90 to-gray-900/90'
                        : 'from-gray-800/50 to-gray-900/50 hover:from-gray-800/70 hover:to-gray-900/70'
                    } rounded-lg border border-gray-700 overflow-hidden transition-all duration-200`}
                  >
                    <button
                      onClick={() =>
                        setSelectedCourse(
                          selectedCourse?.classNumber === course.classNumber
                            ? null
                            : course
                        )
                      }
                      className="w-full text-left"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <span className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                              {course.classNumber}
                            </span>
                            <span className="hidden sm:block text-sm text-gray-300">
                              {course.className}
                            </span>
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                              selectedCourse?.classNumber === course.classNumber
                                ? 'rotate-90'
                                : 'group-hover:text-blue-400'
                            }`}
                          />
                        </div>
                        <div className="sm:hidden text-sm text-gray-300 mt-1">
                          {course.className}
                        </div>

                        {selectedCourse?.classNumber === course.classNumber && (
                          <div className="mt-4 pt-4 border-t border-gray-600">
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {course.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>
                ))}

                {filteredCourses.length === 0 && (
                  <div className="text-center py-8 bg-gray-800/50 rounded-lg border border-gray-700">
                    <p className="text-gray-400">No matching courses found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseSearch;

