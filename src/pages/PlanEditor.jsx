import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlans } from './PlansContext';

const PlanEditor = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const { getPlan, updatePlan } = usePlans();

 

  // Define available courses
  const availableCourses = [
    {
      id: 'Free Elective',
      name: 'Free Elective',
      credits: 3,
      prerequisites: [],
    },
    {
      id: 'ECS1100',
      name: 'Introduction to Engineering and Computer Science',
      credits: 1,
      prerequisites: [],
    },
    {
      id: 'CS1200',
      name: 'Introduction to Computer Science and Software Engineering',
      credits: 2,
      prerequisites: [],
    },
    {
      id: 'CS1436',
      name: 'Programming Fundamentals',
      credits: 4,
      prerequisites: [],
    },
    { id: 'MATH2413', name: 'Calculus I', credits: 4, prerequisites: [] },
    {
      id: 'CS2305',
      name: 'Discrete Mathematics for Computing I',
      credits: 3,
      prerequisites: [],
    },
    {
      id: 'MATH2414',
      name: 'Calculus II',
      credits: 4,
      prerequisites: ['MATH2413'],
    },
    {
      id: 'PHYS2325',
      name: 'Mechanics',
      credits: 3,
      prerequisites: ['MATH2413'],
    },
    {
      id: 'PHYS2125',
      name: 'Physics Lab I',
      credits: 1,
      prerequisites: [],
    },
    {
      id: 'CS1337',
      name: 'Computer Science I',
      credits: 3,
      prerequisites: ['CS1436'],
    },
    {
      id: 'PHYS2326',
      name: 'Electromagnetism and Waves',
      credits: 3,
      prerequisites: ['PHYS2325'],
    },
    {
      id: 'PHYS2126',
      name: 'Physics Lab II',
      credits: 1,
      prerequisites: [],
    },
    {
      id: 'CS2336',
      name: 'Computer Science II',
      credits: 3,
      prerequisites: ['CS1337'],
    },
    {
      id: 'CS2340',
      name: 'Computer Architecture',
      credits: 3,
      prerequisites: ['CS1337'],
    },
    {
      id: 'MATH2418',
      name: 'Linear Algebra',
      credits: 4,
      prerequisites: ['MATH2413'],
    },
    {
      id: 'CS3345',
      name: 'Data Structures and Algorithms',
      credits: 3,
      prerequisites: ['CS2336', 'CS2305'],
    },
    {
      id: 'CS3377',
      name: 'C/C++ Programming in UNIX',
      credits: 3,
      prerequisites: ['CS2336'],
    },
    {
      id: 'ECS2390',
      name: 'Business and Professional Communication',
      credits: 3,
      prerequisites: [],
    },
    {
      id: 'CS3354',
      name: 'Software Engineering',
      credits: 3,
      prerequisites: ['CS2336'],
    },
    {
      id: 'CS4337',
      name: 'Organization of Programming Languages',
      credits: 3,
      prerequisites: ['CS2336', 'CS2305'],
    },
    {
      id: 'CS4347',
      name: 'Database Systems',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4141',
      name: 'Professional and Technical Communication in Computing',
      credits: 1,
      prerequisites: ['ECS2390'],
    },
    {
      id: 'CS4341',
      name: 'Digital Logic and Computer Design',
      credits: 3,
      prerequisites: ['CS2340'],
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
    {
      id: 'CS4384',
      name: 'Automata Theory',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4485',
      name: 'Computer Science Project',
      credits: 4,
      prerequisites: ['CS3354'],
    },
    {
      id: 'CS4314',
      name: 'Intelligent Systems Analysis',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4315',
      name: 'Intelligent Systems Design',
      credits: 3,
      prerequisites: ['CS4314'],
    },
    {
      id: 'CS4332',
      name: 'Introduction to Programming Video Games',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4334',
      name: 'Numerical Analysis',
      credits: 3,
      prerequisites: ['MATH2418'],
    },
    {
      id: 'CS4336',
      name: 'Advanced Java',
      credits: 3,
      prerequisites: ['CS2336'],
    },
    {
      id: 'CS4352',
      name: 'Introduction to Human-Computer Interaction',
      credits: 3,
      prerequisites: ['CS3354'],
    },
    {
      id: 'CS4361',
      name: 'Computer Graphics',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4365',
      name: 'Artificial Intelligence',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4375',
      name: 'Introduction to Machine Learning',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4376',
      name: 'Object-Oriented Design',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4386',
      name: 'Compiler Design',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4389',
      name: 'Data and Applications Security',
      credits: 3,
      prerequisites: ['CS4347'],
    },
    {
      id: 'CS4390',
      name: 'Computer Networks',
      credits: 3,
      prerequisites: ['CS3377'],
    },
    {
      id: 'CS4391',
      name: 'Introduction to Computer Vision',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4392',
      name: 'Computer Animation',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4393',
      name: 'Computer and Network Security',
      credits: 3,
      prerequisites: ['CS4347'],
    },
    {
      id: 'CS4394',
      name: 'Implementation of Modern Operating Systems',
      credits: 3,
      prerequisites: ['CS4348'],
    },
    {
      id: 'CS4395',
      name: 'Human Language Technologies',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4396',
      name: 'Networking Laboratory',
      credits: 3,
      prerequisites: ['CS3377'],
    },
    {
      id: 'CS4397',
      name: 'Embedded Computer Systems',
      credits: 3,
      prerequisites: ['CS2340'],
    },
    {
      id: 'CS4398',
      name: 'Digital Forensics',
      credits: 3,
      prerequisites: ['CS4390'],
    },
    {
      id: 'CS4399',
      name: 'Senior Honors in Computer Science',
      credits: 3,
      prerequisites: ['CS3345'],
    },
    {
      id: 'CS4459',
      name: 'Cyber Attack and Defense Laboratory',
      credits: 3,
      prerequisites: ['CS4347'],
    },
    {
      id: 'EE4325',
      name: 'Introduction to VLSI Design',
      credits: 3,
      prerequisites: ['CS2340'],
    },
    {
      id: 'SE4351',
      name: 'Requirements Engineering',
      credits: 3,
      prerequisites: ['CS3354'],
    },
    {
      id: 'SE4352',
      name: 'Software Architecture and Design',
      credits: 3,
      prerequisites: ['SE4351'],
    },
    {
      id: 'SE4367',
      name: 'Software Testing, Verification, Validation and Quality Assurance',
      credits: 3,
      prerequisites: ['SE4352'],
    },
    {
      id: 'SE4381',
      name: 'Software Project Planning and Management',
      credits: 3,
      prerequisites: ['SE4351'],
    },
  ];

  const [plan, setPlan] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [showCourseSelector, setShowCourseSelector] = useState(false);
  const [prerequisiteErrors, setPrerequisiteErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState([...availableCourses]); // Copy of the full list

  useEffect(() => {
    const currentPlan = getPlan(parseInt(planId));
    if (currentPlan) {
      setPlan(currentPlan);
    }
  }, [planId, getPlan]);

  const checkPrerequisites = (course, semesterId) => {
    const completedCourses = new Set();
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

    setPlan((prevPlan) => {
      // Add course to semester
      const updatedSemesters = prevPlan.semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            courses: [...semester.courses, { ...course, completed: false }],
          };
        }
        return semester;
      });

      // Calculate total credits from all courses
      const totalCompletedCredits = updatedSemesters.reduce(
        (total, semester) => {
          return (
            total +
            semester.courses.reduce(
              (semTotal, course) => semTotal + course.credits,
              0
            )
          );
        },
        0
      );

      // Calculate remaining credits
      const remainingCredits = 124 - totalCompletedCredits;
      const semestersNeeded = Math.ceil(remainingCredits / 15);
      let expectedGraduation = calculateExpectedGraduation(semestersNeeded);

      return {
        ...prevPlan,
        semesters: updatedSemesters,
        completedCredits: totalCompletedCredits,
        expectedGraduation,
      };
    });
    setShowCourseSelector(false);
    setPrerequisiteErrors({});
    setFilteredCourses((prevCourses) =>
      prevCourses.filter((c) => c.id !== course.id)
    );
  };

  const handleRemoveCourse = async (courseId, semesterId) => {
    setPlan((prevPlan) => {
      // Remove course from semester
      const updatedSemesters = prevPlan.semesters.map((semester) => {
        if (semester.id === semesterId) {
          return {
            ...semester,
            courses: semester.courses.filter(
              (course) => course.id !== courseId
            ),
          };
        }
        return semester;
      });

      const removedCourse = prevPlan.semesters
      .find((semester) => semester.id === semesterId)
      .courses.find((course) => course.id === courseId);

      // Calculate total credits from remaining courses
      const totalCompletedCredits = updatedSemesters.reduce(
        (total, semester) => {
          return (
            total +
            semester.courses.reduce(
              (semTotal, course) => semTotal + course.credits,
              0
            )
          );
        },
        0
      );

      // Calculate remaining credits and expected graduation
      const remainingCredits = 124 - totalCompletedCredits;
      const semestersNeeded = Math.ceil(remainingCredits / 15);
      let expectedGraduation = calculateExpectedGraduation(semestersNeeded);

      setFilteredCourses((prevCourses) => [...prevCourses, removedCourse]);

      return {
        ...prevPlan,
        semesters: updatedSemesters,
        completedCredits: totalCompletedCredits,
        expectedGraduation,
      };
    });
  };

  const calculateExpectedGraduation = (semestersNeeded) => {
    // Start from Fall 2024
    let currentSeason = 'Fall';
    let currentYear = 2024;

    for (let i = 0; i < semestersNeeded; i++) {
      if (currentSeason === 'Fall') {
        currentSeason = 'Spring';
        currentYear++;
      } else {
        currentSeason = 'Fall';
      }
    }

    return `${currentSeason} ${currentYear}`;
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      // Preserve the calculated expected graduation date instead of overwriting it
      const updatedPlan = {
        ...plan,
        // Remove the expectedGraduation override so it keeps the calculated value
      };
      updatePlan(updatedPlan);
      navigate('/plan-management');
    } catch (err) {
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddSemester = async () => {
    setPlan((prevPlan) => {
      const newSemesterId =
        Math.max(...prevPlan.semesters.map((s) => s.id), 0) + 1;
      const lastSemester = prevPlan.semesters[prevPlan.semesters.length - 1];

      // Calculate next semester name (excluding summer)
      let nextSemesterName = 'Fall 2024'; // Default if no previous semester
      if (lastSemester) {
        const [season, year] = lastSemester.name.split(' ');
        const nextYear = parseInt(year);
        const seasons = ['Spring', 'Fall'];
        const currentIndex = seasons.indexOf(season);
        const nextSeason = seasons[(currentIndex + 1) % 2];
        nextSemesterName = `${nextSeason} ${
          nextYear + (nextSeason === 'Spring' ? 1 : 0)
        }`;
      }

      return {
        ...prevPlan,
        semesters: [
          ...prevPlan.semesters,
          {
            id: newSemesterId,
            name: nextSemesterName,
            courses: [],
          },
        ],
      };
    });
  };

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

      {showCourseSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Add Course</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCourses.map((course) => (
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
              {124 - plan.completedCredits}
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
