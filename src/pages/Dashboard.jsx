// Sofia Deichert
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip,
} from 'recharts';

const Dashboard = () => {
  const [degreeProgress, setDegreeProgress] = useState({
    creditHours: { completed: 0, remaining: 0, total: 135 },
    coreCurriculum: { completed: 24, remaining: 18, total: 42 },
    majorRequirements: {
      preparatory: { completed: 0, remaining: 0, total: 39 },
      core: { completed: 24, remaining: 18, total: 42 },
      technicalElectives: { completed: 0, remaining: 0, total: 12 },
    },
    electives: { completed: 7, remaining: 3, total: 10 },
  });

  const [creditHoursData, setCreditHoursData] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const completedResponse = await fetch(
          'http://localhost:5000/get-completed-courses'
        );
        const completedData = await completedResponse.json();

        const remainingResponse = await fetch(
          'http://localhost:5000/get-remaining-courses'
        );
        const remainingData = await remainingResponse.json();

        if (completedData.completed_courses_details) {
          const completedCourses = completedData.completed_courses_details;
          const remainingCourses = remainingData.remaining_courses_details || [];

          // Major courses by type
          const majorPrepCourses = [
            'ECS 1100',
            'CS 1200',
            'CS 1436',
            'MATH 2413',
            'CS 2305',
            'MATH 2414',
            'PHYS 2325',
            'PHYS 2125',
            'CS 1337',
            'PHYS 2326',
            'PHYS 2126',
            'CS 2336',
            'CS 2340',
            'MATH 2418',
          ];
          const majorCoreCourses = [
            'CS 3162',
            'CS 3341',
            'CS 3345',
            'CS 3354',
            'CS 3377',
            'ECS 2390',
            'CS 4141',
            'CS 4337',
            'CS 4341',
            'CS 4347',
            'CS 4348',
            'CS 4349',
            'CS 4384',
            'CS 4485',
          ];

          // Calculate total completed credit hours per category
          const completedMajorPrep = completedCourses
            .filter((course) => majorPrepCourses.includes(course.classNumber))
            .reduce((sum, course) => sum + course.creditHours, 0);

          const completedMajorCore = completedCourses
            .filter((course) => majorCoreCourses.includes(course.classNumber))
            .reduce((sum, course) => sum + course.creditHours, 0);

          const completedTechElectives = completedCourses
            .filter(
              (course) =>
                !majorPrepCourses.includes(course.classNumber) &&
                !majorCoreCourses.includes(course.classNumber)
            )
            .reduce((sum, course) => sum + course.creditHours, 0);

          const totalCompletedCreditHours = completedCourses.reduce(
            (sum, course) => sum + course.creditHours,
            0
          );

          // Update degreeProgress with completed credit hours
          setDegreeProgress((prev) => {
            const completedCreditHours = 
              completedMajorPrep + completedMajorCore + completedTechElectives + prev.electives.completed +24;
          
            const remainingCreditHours = prev.creditHours.total - completedCreditHours;
            const progressPercentage = Math.round(
              (completedCreditHours / prev.creditHours.total) * 100
            );
          
            return {
              ...prev,
              creditHours: {
                ...prev.creditHours,
                completed: completedCreditHours,
                remaining: remainingCreditHours,
              },
              majorRequirements: {
                preparatory: {
                  completed: completedMajorPrep,
                  remaining: prev.majorRequirements.preparatory.total - completedMajorPrep,
                  total: 39,
                },
                core: {
                  completed: completedMajorCore,
                  remaining: prev.majorRequirements.core.total - completedMajorCore,
                  total: 42,
                },
                technicalElectives: {
                  completed: completedTechElectives,
                  remaining: prev.majorRequirements.technicalElectives.total - completedTechElectives,
                  total: 12,
                },
              },
              progressPercentage,
            };
          });
          
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCompletedCourses();
  }, []);
  

  // Calculate percentages for credit hour breakdown
  useEffect(() => {
    setCreditHoursData([
      {
        name: 'Core Curriculum',
        percentage: Math.round(
          (degreeProgress.coreCurriculum.completed /
            degreeProgress.coreCurriculum.total) *
            100
        ),
        completed: degreeProgress.coreCurriculum.completed,
        total: degreeProgress.coreCurriculum.total,
        fill: '#60A5FA',
      },
      {
        name: 'Major Prep',
        percentage: Math.round(
          (degreeProgress.majorRequirements.preparatory.completed /
            degreeProgress.majorRequirements.preparatory.total) *
            100
        ),
        completed: degreeProgress.majorRequirements.preparatory.completed,
        total: degreeProgress.majorRequirements.preparatory.total,
        fill: '#34D399',
      },
      {
        name: 'Major Core',
        percentage: Math.round(
          (degreeProgress.majorRequirements.core.completed /
            degreeProgress.majorRequirements.core.total) *
            100
        ),
        completed: degreeProgress.majorRequirements.core.completed,
        total: degreeProgress.majorRequirements.core.total,
        fill: '#818CF8',
      },
      {
        name: 'Tech Electives',
        percentage: Math.round(
          (degreeProgress.majorRequirements.technicalElectives.completed /
            degreeProgress.majorRequirements.technicalElectives.total) *
            100
        ),
        completed: degreeProgress.majorRequirements.technicalElectives.completed,
        total: degreeProgress.majorRequirements.technicalElectives.total,
        fill: '#FBBF24',
      },
      {
        name: 'Free Electives',
        percentage: Math.round(
          (degreeProgress.electives.completed / degreeProgress.electives.total) *
            100
        ),
        completed: degreeProgress.electives.completed,
        total: degreeProgress.electives.total,
        fill: '#EC4899',
      },
    ]);
  }, [degreeProgress]);

  // Custom tooltip for the credit hours breakdown
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 p-3 rounded-lg shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-white">
            Completed: {data.completed} / {data.total} hours
          </p>
          <p className="text-white">Progress: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
            <h1 className="text-white text-2xl font-bold">
              Degree Progress Dashboard
            </h1>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Overall Progress Circle */}
              <div className="backdrop-blur-sm bg-white/5 rounded-lg p-6 border border-gray-700">
                <h2 className="text-white text-xl font-medium mb-8">
                  Overall Progress
                </h2>
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <defs>
                          <linearGradient
                            id="progressGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="0%" stopColor="#60A5FA" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                        </defs>
                        <Pie
                          data={[
                            { value: degreeProgress.creditHours.completed },
                            { value: degreeProgress.creditHours.remaining },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius="75%"
                          outerRadius="90%"
                          startAngle={90}
                          endAngle={-270}
                          strokeWidth={0}
                        >
                          <Cell fill="url(#progressGradient)" />
                          <Cell fill="#1F2937" />
                        </Pie>
                        {/* Add subtle glow effect */}
                        <Pie
                          data={[
                            { value: degreeProgress.creditHours.completed },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius="74%"
                          outerRadius="91%"
                          startAngle={90}
                          endAngle={
                            90 -
                            (360 * degreeProgress.creditHours.completed) /
                              degreeProgress.creditHours.total
                          }
                          strokeWidth={0}
                          fill="none"
                          stroke="#60A5FA"
                          strokeOpacity={0.2}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white mb-1">{degreeProgress.progressPercentage}%</p>
                    <p className="text-blue-300 text-lg">Total Progress</p>
                  </div>
                </div>
              </div>

              {/* Credit Hours Breakdown */}
              <div className="backdrop-blur-sm bg-white/5 rounded-lg p-6 border border-gray-700">
                <h2 className="text-white text-xl font-medium mb-4">
                  Credit Hours Breakdown
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {creditHoursData.map((category, index) => (
                    <div
                      key={category.name}
                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">
                          {category.name}
                        </span>
                        <span className="text-white">
                          {category.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${category.percentage}%`,
                            backgroundColor: category.fill,
                          }}
                        />
                      </div>
                      <div className="mt-2 text-gray-300 text-sm">
                        {category.completed} / {category.total} hours
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Progress */}
            <div className="mt-8">
              <div className="backdrop-blur-sm bg-white/5 rounded-lg p-6 border border-gray-700">
                <h2 className="text-white text-xl font-medium mb-4">
                  Category Progress
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="20%"
                      outerRadius="100%"
                      data={creditHoursData}
                      startAngle={180}
                      endAngle={0}
                    >
                      <RadialBar
                        minAngle={15}
                        background={{ fill: '#1F2937' }}
                        clockWise={true}
                        dataKey="percentage"
                        cornerRadius={10}
                      />
                      <Tooltip content={<CustomTooltip />} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {creditHoursData.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center gap-2"
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.fill }}
                      />
                      <span className="text-white">{category.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Credit Hours Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="backdrop-blur-sm bg-white/5 rounded-lg p-6 border border-gray-700">
                <h3 className="text-white text-lg font-medium mb-2">
                  Completed Hours
                </h3>
                <p className="text-4xl font-bold text-blue-400">
                  {degreeProgress.creditHours.completed}
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-lg p-6 border border-gray-700">
                <h3 className="text-white text-lg font-medium mb-2">
                  Remaining Hours
                </h3>
                <p className="text-4xl font-bold text-red-400">
                  {degreeProgress.creditHours.remaining}
                </p>
              </div>
              <div className="backdrop-blur-sm bg-white/5 rounded-lg p-6 border border-gray-700">
                <h3 className="text-white text-lg font-medium mb-2">
                  Total Required
                </h3>
                <p className="text-4xl font-bold text-gray-300">
                  {degreeProgress.creditHours.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
