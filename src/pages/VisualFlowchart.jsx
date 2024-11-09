import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const Flowchart = () => {
    const location = useLocation();
    const remainingCourses = location.state?.remainingCourses || [];

    // Generate nodes and edges based on remaining courses
    const nodes = useMemo(
        () =>
            remainingCourses.map((course, index) => ({
                id: course.classNumber,
                data: { label: `${course.className} (${course.classNumber})` },
                position: { x: 0, y: index * 100 },
                style: { backgroundColor: '#1E40AF', color: '#fff', padding: 10, borderRadius: 8 }
            })),
        [remainingCourses]
    );

    // Define a basic sequential edge structure for demonstration
    const edges = useMemo(
        () =>
            remainingCourses.slice(1).map((course, index) => ({
                id: `e${remainingCourses[index].classNumber}-${course.classNumber}`,
                source: remainingCourses[index].classNumber,
                target: course.classNumber,
                animated: true,
                style: { stroke: '#4F46E5' }
            })),
        [remainingCourses]
    );

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
            <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6">
                    <h1 className="text-white text-2xl font-bold">Remaining Courses Flowchart</h1>
                </div>
                <div style={{ height: '75vh', background: '#1F2937' }}>
                    <ReactFlow nodes={nodes} edges={edges} fitView>
                        <MiniMap nodeColor={() => '#3B82F6'} />
                        <Controls />
                        <Background color="#333" gap={16} />
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default Flowchart;
