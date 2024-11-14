import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ReactFlow, { MiniMap, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const ITEMS_PER_PAGE = 6;

const Flowchart = () => {
    const location = useLocation();
    const remainingCourses = location.state?.remainingCourses || [];

    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(remainingCourses.length / ITEMS_PER_PAGE);

    const paginatedCourses = useMemo(
        () =>
            remainingCourses.slice(
                currentPage * ITEMS_PER_PAGE,
                (currentPage + 1) * ITEMS_PER_PAGE
            ),
        [remainingCourses, currentPage]
    );

    const nodes = useMemo(
        () =>
            paginatedCourses.map((course, index) => ({
                id: course.classNumber,
                data: { label: `${course.className} (${course.classNumber})` },
                position: { x: index * 250, y: 0 }, // Horizontal positioning
                style: {
                    backgroundColor: '#1E40AF',
                    color: '#fff',
                    padding: 10,
                    borderRadius: 8,
                },
            })),
        [paginatedCourses]
    );

    const edges = useMemo(
        () =>
            paginatedCourses.slice(1).map((course, index) => ({
                id: `e${paginatedCourses[index].classNumber}-${course.classNumber}`,
                source: paginatedCourses[index].classNumber,
                target: course.classNumber,
                animated: true,
                style: { stroke: '#4F46E5' },
            })),
        [paginatedCourses]
    );

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
            <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6 flex justify-between items-center">
                    <h1 className="text-white text-2xl font-bold">Remaining Courses Flowchart</h1>
                    <div>
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 0}
                            className="px-4 py-2 text-white bg-indigo-600 rounded mr-2 hover:bg-indigo-500 disabled:opacity-50 transition-all duration-300"
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages - 1}
                            className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 disabled:opacity-50 transition-all duration-300"
                        >
                            Next
                        </button>
                    </div>
                </div>
                <div style={{ height: '75vh', background: '#1F2937' }}>
                    <ReactFlow nodes={nodes} edges={edges} fitView>
                        <MiniMap nodeColor={() => '#3B82F6'} />
                        <Background color="#333" gap={16} />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default Flowchart;