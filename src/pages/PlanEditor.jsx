import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const PlanEditor = () => {
  const { planId } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [showCourseSelector, setShowCourseSelector] = useState(false);
  const [prerequisiteErrors, setPrerequisiteErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // TODO: Replace with API call to fetch available courses
  const [availableCourses] = useState([
    {
      id: 'CS3345',
      name: 'Data Structures and Algorithms',
      credits: 3,
      prerequisites: ['CS2336', 'CS2305'],
    },
    {
      id: 'CS3341',
      name: 'Probability & Statistics',
      credits: 3,
      prerequisites: ['CS2305'],
    },
    {
      id: 'CS3377',
      name: 'C/C++ Programming in UNIX',
      credits: 3,
      prerequisites: ['CS2336'],
    },
    {
      id: 'CS4348',
      name: 'Operating Systems',
      credits: 3,
      prerequisites: ['CS3345', 'CS3377'],
    },
    {
      id: 'CS4349',
      name: 'Advanced Algorithms',
      credits: 3,
      prerequisites: ['CS3345'],
    },
  ]);

  // Fetch plan data when component mounts
  useEffect(() => {
    const fetchPlanData = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: Replace with actual API call
        // Simulating API response
        const mockPlan = {
          id: planId,
          name: 'Computer Science BS',
          totalCredits: 124,
          completedCredits: 45,
          expectedGraduation: 'Spring 2026',
          semesters: [
            {
              id: 1,
              name: 'Fall 2023',
              courses: [
                {
                  id: 'CS1200',
                  name: 'Intro to CS and SE',
                  credits: 3,
                  prerequisites: [],
                  completed: true,
                },
                {
                  id: 'CS1436',
                  name: 'Programming Fundamentals',
                  credits: 3,
                  prerequisites: [],
                  completed: true,
                },
              ],
            },
            {
              id: 2,
              name: 'Spring 2024',
              courses: [
                {
                  id: 'CS2305',
                  name: 'Discrete Mathematics I',
                  credits: 3,
                  prerequisites: ['CS1436'],
                  completed: false,
                },
                {
                  id: 'CS2336',
                  name: 'Computer Science II',
                  credits: 3,
                  prerequisites: ['CS1436'],
                  completed: false,
                },
              ],
            },
          ],
        };

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPlan(mockPlan);
      } catch (err) {
        setError('Failed to fetch plan data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
  }, [planId]);

  const checkPrerequisites = (course, semesterId) => {
    const completedCourses = new Set();

    // Get all completed courses and courses from previous semesters
    plan.semesters.forEach((semester) => {
      if (semester.id < semesterId) {
        semester.courses.forEach((c) => {
          completedCourses.add(c.id);
        });
      }
    });

    return course.prerequisites.filter(
      (prereq) => !completedCourses.has(prereq)
    );
  };

  const handleAddCourse = async (course, semesterId) => {
    const missingPrereqs = checkPrerequisites(course, semesterId);

    if (missingPrereqs.length > 0) {
      setPrerequisiteErrors({
        ...prerequisiteErrors,
        [course.id]: missingPrereqs,
      });
      return;
    }

    try {
      // TODO: Replace with actual API call
      setPlan((prevPlan) => ({
        ...prevPlan,
        semesters: prevPlan.semesters.map((semester) => {
          if (semester.id === semesterId) {
            return {
              ...semester,
              courses: [...semester.courses, { ...course, completed: false }],
            };
          }
          return semester;
        }),
      }));

      setShowCourseSelector(false);
      setPrerequisiteErrors({});
    } catch (err) {
      alert('Failed to add course. Please try again.');
    }
  };

  const handleRemoveCourse = async (courseId, semesterId) => {
    try {
      // TODO: Replace with actual API call
      setPlan((prevPlan) => ({
        ...prevPlan,
        semesters: prevPlan.semesters.map((semester) => {
          if (semester.id === semesterId) {
            return {
              ...semester,
              courses: semester.courses.filter(
                (course) => course.id !== courseId
              ),
            };
          }
          return semester;
        }),
      }));
    } catch (err) {
      alert('Failed to remove course. Please try again.');
    }
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      alert('Changes saved successfully!');
      navigate('/plan-management');
    } catch (err) {
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSemester = async () => {
    try {
      // TODO: Replace with actual API call
      const newSemesterId = Math.max(...plan.semesters.map((s) => s.id)) + 1;
      setPlan((prevPlan) => ({
        ...prevPlan,
        semesters: [
          ...prevPlan.semesters,
          {
            id: newSemesterId,
            name: `New Semester ${newSemesterId}`,
            courses: [],
          },
        ],
      }));
    } catch (err) {
      alert('Failed to add semester. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading plan...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Plan not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/plan-management')}
                  className="mr-4 p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-400 hover:text-white" />
                </button>
                <div>
                  <h1 className="text-white text-2xl font-bold">{plan.name}</h1>
                  <p className="text-gray-400 mt-1">
                    {plan.completedCredits} / {plan.totalCredits} Credits
                    Completed
                  </p>
                </div>
              </div>
              <button
                onClick={handleSaveChanges}
                disabled={saving}
                className={`flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  saving ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Save className="w-5 h-5 mr-2" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Semesters Grid */}
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plan.semesters.map((semester) => (
              <div
                key={semester.id}
                className="backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700 overflow-hidden"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-gray-800/50 to-black/50">
                  <h3 className="text-lg font-medium text-white">
                    {semester.name}
                  </h3>
                </div>

                <div className="p-4">
                  {/* Course List */}
                  <div className="space-y-3 mb-4">
                    {semester.courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {course.id} - {course.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {course.credits} Credits
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleRemoveCourse(course.id, semester.id)
                          }
                          className="p-1 hover:bg-red-500/20 rounded-lg text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Course Button */}
                  <button
                    onClick={() => {
                      setSelectedSemester(semester.id);
                      setShowCourseSelector(true);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Course
                  </button>
                </div>
              </div>
            ))}

            {/* Add Semester Button */}
            <button
              onClick={handleAddSemester}
              className="h-48 flex flex-col items-center justify-center backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700 border-dashed hover:border-gray-500 hover:bg-white/10 transition-all"
            >
              <Plus className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-gray-400">Add Semester</span>
            </button>
          </div>
        </div>
      </div>

      {/* Course Selector Modal */}
      {showCourseSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add Course</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {availableCourses.map((course) => (
                <div key={course.id} className="p-4 bg-gray-900 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-medium">
                        {course.id} - {course.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {course.credits} Credits
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddCourse(course, selectedSemester)}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {prerequisiteErrors[course.id] && (
                    <div className="mt-2 p-2 bg-red-900/20 border border-red-700 rounded-lg">
                      <div className="flex items-center text-red-400">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        <p className="text-sm">Missing prerequisites:</p>
                      </div>
                      <p className="text-sm text-red-400 mt-1">
                        {prerequisiteErrors[course.id].join(', ')}
                      </p>
                    </div>
                  )}
                  {course.prerequisites.length > 0 && (
                    <p className="text-sm text-gray-400 mt-2">
                      Prerequisites: {course.prerequisites.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShowCourseSelector(false);
                  setPrerequisiteErrors({});
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credits Summary */}
      <div className="mt-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="backdrop-blur-sm bg-white/10 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-2">
              Completed Credits
            </h3>
            <p className="text-3xl font-bold text-blue-400">
              {plan.completedCredits}
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-2">
              Remaining Credits
            </h3>
            <p className="text-3xl font-bold text-red-400">
              {plan.totalCredits - plan.completedCredits}
            </p>
          </div>
          <div className="backdrop-blur-sm bg-white/10 rounded-lg border border-gray-700 p-6">
            <h3 className="text-lg font-medium text-white mb-2">
              Expected Graduation
            </h3>
            <p className="text-3xl font-bold text-emerald-400">
              {plan.expectedGraduation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanEditor;
