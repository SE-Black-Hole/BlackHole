import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

const CourseSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = searchTerm
    ? courses.filter(
        (course) =>
          course.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : courses;

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
                    key={course.number}
                    className={`group bg-gradient-to-r ${
                      selectedCourse?.number === course.number
                        ? 'from-gray-800/90 to-gray-900/90'
                        : 'from-gray-800/50 to-gray-900/50 hover:from-gray-800/70 hover:to-gray-900/70'
                    } rounded-lg border border-gray-700 overflow-hidden transition-all duration-200`}
                  >
                    <button
                      onClick={() =>
                        setSelectedCourse(
                          selectedCourse?.number === course.number
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
                              {course.number}
                            </span>
                            <span className="hidden sm:block text-sm text-gray-300">
                              {course.name}
                            </span>
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                              selectedCourse?.number === course.number
                                ? 'rotate-90'
                                : 'group-hover:text-blue-400'
                            }`}
                          />
                        </div>
                        <div className="sm:hidden text-sm text-gray-300 mt-1">
                          {course.name}
                        </div>

                        {selectedCourse?.number === course.number && (
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

// Complete data for courses
const courses = [
  {
    number: 'ECS 1100',
    name: 'Introduction to Engineering and Computer Science',
    description:
      ' Introduction to Engineering and Computer Science (1 semester credit hour) Introduction to engineering and computing careers; overview of Engineering and Computer Science (ECS) curricula, connections among ECS fields and to the sciences, and other fields; basic study, problem solving, and other skills needed to succeed as an ECS major. Corequisite: UNIV 1010. ',
  },
  {
    number: 'CS 1200',
    name: 'Introduction to Computer Science and Software Engineering',
    description:
      ' Introduction to Computer Science and Software Engineering (2 semester credit hours) Introduction to the computing professions; overview of Computer Science (CS) and Software Engineering (SE) curricula, connections with Computer Engineering, other Engineering and Computer Science fields, and Arts and Technology programs; problem solving and other skills needed to succeed as a CS or SE major. Introduction to quantitative methods; team projects designed to replicate decision processes and problem solving in real-world situations; additional preparatory topics for CS and SE majors. BMEN 1100 or CE 1100 or EE 1100 or MECH 1100 can substitute for this course (together with 1 hour of CS elective). Credit cannot be received for more than one of the following: BMEN 1100 or CE 1100 or CS 1200 or EE 1100 or MECH 1100.',
  },
  {
    number: 'CS 1436',
    name: 'Programming Fundamentals',
    description:
      'Programming Fundamentals (4 semester credit hours) Introduces the fundamental concepts of structured programming. Topics include software development methodology, data types, control structures, functions, arrays, and the mechanics of running, testing, and debugging. Programming language of choice is C. Lab fee of $30 is required. The class is open to students in the School of Engineering and Computer Science only. Credit cannot be received for both courses, (CS 1336 and CS 1136) and CS 1436. Note that a grade of C or better in this class is required to register for (CE 1337 or CS 1337). ',
  },
  {
    number: 'MATH 2413',
    name: 'Calculus I',
    description:
      "Differential Calculus (4 semester credit hours) Course covers topics in differential calculus of functions of one variable; topics include limits, continuity, derivative, chain rule, implicit differentiation, mean value theorem, maxima and minima, curve sketching, derivatives of inverse trigonometric functions, antiderivative, substitution method, and applications. Three lecture hours and two discussion hours a week; a problem section required with MATH 2413, and will also be registered for exam section. Not all MATH/STAT courses may be counted toward various degree plans. Please consult your degree plan to determine the appropriate MATH/STAT course requirements. A course material fee, which may include a course online access fee, of up to $100 may be charged for this course. Please see the course's syllabi in CourseBook for more details. Prerequisite: ALEKS score required or a grade of at least a C- in MATH 2306 or MATH 2312. ",
  },
  {
    number: 'CS 2305',
    name: 'Discrete Mathematics for Computing I',
    description:
      'Discrete Mathematics for Computing I (3 semester credit hours) Principles of counting. Boolean operations. Logic and proof methods. Recurrence relations. Sets, relations, functions. Elementary graph theory. Elementary number theory. Prerequisite: ALEKS score required or MATH 2312 with a grade of C or better or (Data Science major and MATH 2413). ',
  },
  {
    number: 'MATH 2414',
    name: 'Calculus II',
    description:
      "Integral Calculus (4 semester credit hours) Continuation of Math 2413. Course covers topics in integral calculus, sequences and series. Topics include techniques of integration, improper integrals, and applications. Polar coordinates, parametric equations, and arc length. Infinite sequences and series, tests for convergence, power series, radius of convergence and Taylor series. Three lecture hours and two discussion hours a week; registration in a problem section as well as the exam section is required with MATH 2414. Not all MATH/STAT courses may be counted toward various degree plans. Please consult your degree plan to determine the appropriate MATH/STAT course requirements. Cannot be used to replace MATH 2419. A course material fee, which may include a course online access fee, of up to $100 may be charged for this course. Please see the course's syllabi in CourseBook for more details. Prerequisite: A grade of C- or better in either MATH 2417 or in MATH 2413 or equivalent. ",
  },
  {
    number: 'PHYS 2325',
    name: 'Mechanics',
    description:
      'Mechanics (3 semester credit hours) Calculus based. Basic physics including a study of space and time, kinematics, forces, energy and momentum, conservation laws, rotational motion, torques, and harmonic oscillation. Two lectures per week. Students will also be registered for an exam section. An online subscription fee of up to $100 is required for this course for online homework access. Prerequisite: MATH 2413 or MATH 2417. Corequisites: (MATH 2414 or MATH 2419) and (PHYS 2121 or PHYS 2125).',
  },
  {
    number: 'PHYS 2125',
    name: 'Physics Lab I',
    description:
      "Physics Laboratory I (1 semester credit hour) Laboratory course to accompany PHYS 2325 or PHYS 2421. Experiments investigate basic measurements and statistics; one dimensional and two dimensional motion; Newton's laws; conservation laws of energy and momentum; rotational motion; and oscillations. Lab fee of $30 required. Corequisite: PHYS 2325 or PHYS 2421.",
  },
  {
    number: 'CS 1337',
    name: 'Computer Science I',
    description:
      ' Computer Science I (3 semester credit hours) Review of control structures and data types with emphasis on structured data types. Applies the object-oriented programming paradigm, focusing on the definition and use of classes along with the fundamentals of object-oriented design. Includes basic analysis of algorithms, searching and sorting techniques, and an introduction to software engineering. Programming language of choice is C/C++. Students will also be registered for an exam section. Prerequisite: CS 1436 with a grade of C or better or equivalent. ',
  },
  {
    number: 'PHYS 2326',
    name: 'Electromagnetism and Waves',
    description:
      "Electromagnetism and Waves (3 semester credit hours) Continuation of PHYS 2325. Topics include electrostatics and electromagnetics, electric field and potential, electric currents, magnetic fields, laws of Coulomb, Ampere, and Faraday, Maxwell's theory of wave propagation. Two lectures per week. Students will also be registered for an exam section. An online subscription fee of up to $100 is required for this course for online homework access. Prerequisites: PHYS 2325 and (MATH 2414 or MATH 2419). Corequisite: PHYS 2126.",
  },
  {
    number: 'PHYS 2126',
    name: 'Physics Lab II',
    description:
      'Physics Laboratory II (1 semester credit hour) A calculus-based laboratory course to accompany PHYS 2326 or PHYS 2422. Experiments investigate electrostatics, electric circuits, magnetism, and optics. Lab fee of $30 required. Corequisite: PHYS 2326 or PHYS 2422. ',
  },
  {
    number: 'CS 2336',
    name: 'Computer Science II',
    description:
      'Computer Science II (3 semester credit hours) Further applications of programming techniques, introducing the fundamental concepts of data structures and algorithms. Topics include recursion, fundamental data structures (including stacks, queues, linked lists, hash tables, trees, and graphs), and algorithmic analysis. Includes comprehensive programming projects. Programming language of choice is Java. Credit cannot be received for both CS 2337 and (CS 2336 or CE 2336). Prerequisite: (CE 1337 or CS 1337) with a grade of C or better. Prerequisite or Corequisite: (CE 2305 or CS 2305) with a grade of C or better or (Data Science major and MATH 3315). ',
  },
  {
    number: 'CS 2340',
    name: 'Computer Architecture',
    description:
      'Computer Architecture (3 semester credit hours) This course introduces the concepts of computer architecture by going through multiple levels of abstraction, and the numbering systems and their basic computations. It focuses on the instruction-set architecture of the MIPS machine, including MIPS assembly programming, translation between MIPS and C, and between MIPS and machine code. General topics include performance calculation, processor datapath, pipelining, and memory hierarchy. Credit cannot be received for both courses, (CS 2340 or SE 2340) and (CE 4304 or EE 4304). Prerequisites: (CE 1337 or CS 1337) with a grade of C or better or equivalent and (CE 2305 or CS 2305) with a grade of C or better. ',
  },
  {
    number: 'MATH 2418',
    name: 'Linear Algebra',
    description:
      ' Linear Algebra (4 semester credit hours) Introduces and provides models for application of the concepts of vector algebra. Topics include finite dimensional vector spaces and their geometric significance; representing and solving systems of linear equations using multiple methods, including Gaussian elimination and matrix inversion; matrices; determinants; linear transformations; quadratic forms; eigenvalues and eigenvectors; and applications in science and engineering. Three lecture hours and two discussion hours a week; problem section required with MATH 2418, and will also be registered for exam section. Not all MATH/STAT courses may be counted toward various degree plans. Please consult your degree plan to determine the appropriate MATH/STAT course requirements. Prerequisite: A grade of at least a C- in either MATH 2306 or MATH 2413 or MATH 2417. ',
  },
  {
    number: 'CS 3345',
    name: 'Data Structures and Introduction to Algorithmic Analysis',
    description:
      'Data Structures and Introduction to Algorithmic Analysis (3 semester credit hours) Analysis of algorithms including time complexity and Big-O notation. Analysis of stacks, queues, and trees, including B-trees. Heaps, hashing, and advanced sorting techniques. Disjoint sets and graphs. Course emphasizes design and implementation. Prerequisites: ((CE 2305 or CS 2305) with a grade of C or better or (Data Science major and MATH 3315)) and (CE 2336 or CS 2336 or CS 2337) with a grade of C or better. Prerequisite or Corequisite: (CS 3341 or SE 3341 or ENGR 3341) or (Data Science major and STAT 3355). ',
  },
  {
    number: 'CS 3377',
    name: 'C/C++ Programming in a UNIX Environment',
    description:
      'Systems Programming in UNIX and Other Environments (3 semester credit hours) Basic UNIX concepts, commands and utilities, organization of UNIX file system including links and access control, creating and managing UNIX processes and threads, implementing algorithms using shell scripts, basic networking concepts including socket and client-server programming, inter-process communication using pipes and signals, using a version control system to manage work, and introduction to cloud computing. Design and implementation of a comprehensive programming project is required. Prerequisite: (CE 2336 or CS 2336 or CS 2337) with a grade of C or better or equivalent.',
  },
  {
    number: 'ECS 2390',
    name: 'Business and Professional Communication',
    description:
      " Professional and Technical Communication (3 semester credit hours) Expands students' professional and team communication skills and strategies in technical contexts. Integrates writing, speaking and group communication by developing and presenting technical information to different audiences. Written assignments focus on creating professional technical documents, such as proposals, memos, abstracts, reports and letters. Presentation assignments emphasize planning, preparing and delivering dynamic, informative and persuasive presentations. Attendance at first class mandatory. Prerequisites: RHET 1302 and junior standing.",
  },
  {
    number: 'CS 3354',
    name: 'Software Engineering',
    description:
      'Software Engineering (3 semester credit hours) Introduction to software life cycle models. Software requirements engineering, formal specification and validation. Techniques for software design and testing. Cost estimation models. Issues in software quality assurance and software maintenance. Prerequisites: ((CE 2336 or CS 2336 or CS 2337) with a grade of C or better or CS 3333) and (CE 2305 or CS 2305) with a grade of C or better or equivalent. Prerequisite or Corequisite: ECS 3390. ',
  },
  {
    number: 'CS 4337',
    name: 'Organization of Programming Languages',
    description:
      'Programming Language Paradigms (3 semester credit hours) Principles of design and implementation of contemporary programming languages. Formal description including specification of syntax and semantics of programming languages. Language definition structures including binding, scoping, data types, control structures, parameter passing, abstraction mechanism, and run-time considerations. Design issues of different programming languages. Language-based security. Design, implement, and debug programs in various programming language paradigms. Prerequisites: ((CE 2336 or CS 2336 or CS 2337) with a grade of C or better or CS 3333) and (CE 2305 or CS 2305) with a grade of C or better and (CS 2340 or SE 2340 or CE 4304 or EE 4304).',
  },
  {
    number: 'CS 4347',
    name: 'Database Systems',
    description:
      'Database Systems (3 semester credit hours) This course emphasizes the concepts and structures necessary for the design and implementation of database management systems. Topics include data models, data normalization, data description languages, query facilities, file organization, index organization, file security, data integrity, and reliability. Prerequisite: CE 3345 or CS 3345 or SE 3345. ',
  },
  {
    number: 'CS 4141',
    name: 'Professional and Technical Communication in Computing',
    description:
      ' Digital Systems Laboratory (1 semester credit hour) Laboratory to accompany CS 4341. The purpose of this laboratory is to give students an intuitive understanding of digital circuits and systems. Laboratory exercises include construction of simple digital logic circuits using prototyping kits and board-level assembly of a personal computer. Lab fee of $30 required. Corequisite: CS 4341.',
  },
  {
    number: 'CS 4341',
    name: 'Digital Logic and Computer Design',
    description:
      'Digital Logic and Computer Design (3 semester credit hours) Boolean algebra and logic circuits; synchronous sequential circuits; gate level design of ALSU, registers, and memory unit; register transfer operations; design of data path and control unit for a small computer; Input-Output interface. Credit cannot be received for both courses, CS 4341 and (CE 3320 or EE 3320). Prerequisites: (CE 2310 or EE 2310) or (CS 2340 or SE 2340) and PHYS 2326. Corequisite: CS 4141.',
  },
  {
    number: 'CS 4348',
    name: 'Operating Systems Concepts',
    description:
      'Operating Systems Concepts (3 semester credit hours) An introduction to fundamental concepts in operating systems: their design, implementation, and usage. Topics include process management, main memory management, virtual memory, I/O and device drivers, file systems, secondary storage management, and an introduction to critical sections and deadlocks. Prerequisites: (CS 2340 or SE 2340) or equivalent and (CS 3377 or SE 3377) and (CE 3345 or CS 3345 or SE 3345). ',
  },
  {
    number: 'CS 4349',
    name: 'Advanced Algorithm Design and Analysis',
    description:
      'Advanced Algorithm Design and Analysis (3 semester credit hours) Asymptomatic analysis, recurrences, and graph algorithms. Algorithm design techniques such as greedy method, dynamic programming, and divide-and-conquer. Issues from computational complexity. Course emphasizes a theoretical approach. Prerequisites: CS 3305 with a grade of C or better, and (CE 3345 or CS 3345 or SE 3345).',
  },
  {
    number: 'CS 4384',
    name: 'Automata Theory',
    description:
      'Automata Theory (3 semester credit hours) A review of the abstract notions encountered in machine computation. Deterministic and nondeterministic finite automata; regular expressions, regular sets, context-free grammars, pushdown automata, context-free languages. Selected topics from Turing Machines and undecidability. Prerequisite: CS 3305 with a grade of C or better.',
  },
  {
    number: 'CS 4485',
    name: 'Computer Science Project',
    description:
      'Computer Science Project (4 semester credit hours) This course is intended to complement theory and to provide an in-depth, hands-on experience in all aspects of a software development project. Students will work in teams on projects of interest to industry and will be involved in specifying the problem and its solution, designing and analyzing the solution, developing the software architecture, along with implementation and testing plans. The deliverables will include reports that document these steps as well as a final project report, including the challenges they faced, and a user manual of the developed system. Students will explore security issues of their project and its potential impact on society. Teams will also make presentations as well as demonstrate their software. Additionally, this course will cover topics related to computer science profession including ethics and professional responsibility, entrepreneurship, leadership, and project management. Prerequisites: (CE 3345 or CS 3345 or SE 3345), and (CE 3354 or CS 3354 or SE 3354) or equivalent and at least three CS 43XX classes. ',
  },
  {
    number: 'CS 4314',
    name: 'Intelligent Systems Analysis',
    description:
      'Intelligent Systems Analysis (3 semester credit hours) This advanced machine learning course covers mathematics essential for the analysis and design of unsupervised, supervised, and reinforcement machine learning algorithms including deep learning neural network models formulated within a statistical empirical risk minimization framework. Course topics include: advanced vector and matrix calculus and stochastic sequences of mixed random vectors, Markov fields, and Bayesian nets. Unsupervised, supervised and reinforcement machine learning applications are emphasized through the course. Prerequisites: ((MATH 2414 or MATH 2419) and (CS 3341 or SE 3341) and MATH2418) or instructor consent required. ',
  },
  {
    number: 'CS 4315',
    name: 'Intelligent Systems Design',
    description:
      'Intelligent Systems Design (3 semester credit hours) This advanced machine learning course covers mathematics essential for the analysis and design of unsupervised, supervised, and reinforcement machine learning algorithms including deep learning neural network models formulated within a statistical empirical risk minimization framework. Topics include: convergence analysis of adaptive and batch learning algorithms, Monte Carlo Markov Chain inference algorithms, bootstrap sampling methods, and the statistical analysis of generalization performance using model selection measures such as AIC and BIC. Unsupervised, supervised, and reinforcement machine learning applications are emphasized throughout the course. Prerequisite: CGS 4314 or CS 4314. ',
  },
  {
    number: 'CS 4334',
    name: 'Numerical Analysis',
    description:
      'Numerical Analysis (3 semester credit hours) Solution of linear equations, roots of polynomial equations, interpolation and approximation, numerical differentiation and integration, solution of ordinary differential equations, computer arithmetic, and error analysis. Prerequisites: (MATH 2370 or CS 1324 or CS 1325 or CE 1337 or CS 1337) and (MATH 2418 and MATH 2451 or MATH 3351). ',
  },
  {
    number: 'CS 4336',
    name: 'Advanced Java',
    description:
      "Advanced Java (3 semester credit hours) Advanced Java programming techniques for enterprise application development. Covers Java Enterprise API's for working with databases, web servers, and application servers. Students will create multi-tiered web applications and web services integrated with a database. Prerequisite: (CE 2336 or CS 2336 or CS 2337) or equivalent. ",
  },
  {
    number: 'CS 4352',
    name: 'Introduction to Human-Computer Interaction',
    description:
      'Introduction to Human-Computer Interaction (3 semester credit hours) Broad overview of how human-computer interaction (HCI) informs the user-centered design (UCD) process. Practical experience in the core methods of user experience design and research throughout the product development cycle.',
  },
  {
    number: 'CS 4361',
    name: 'Computer Graphics',
    description:
      'Computer Graphics (3 semester credit hours) Review of graphic display architecture and graphic input devices. Two- and three-dimensional transformations, matrix formulations, and concatenation. Clipping and windowing. Data structures for graphics systems, segmented display files, rings, etc. Hidden line and surface elimination. Shading. Graphics packages and applications. Prerequisites: MATH 2418 and (CE 2336 or CS 2336 or CS 2337) and (CE 3345 or CS 3345 or SE 3345) or equivalent. ',
  },
  {
    number: 'CS 4365',
    name: 'Artificial Intelligence',
    description:
      'Artificial Intelligence (3 semester credit hours) Basic concepts and techniques that enable computers to perform intelligent tasks. Examples are taken from areas such as natural language understanding, computer vision, machine learning, search strategies and control, logic, and theorem proving. Prerequisite: (CE 3345 or CS 3345 or SE 3345) or equivalent. ',
  },
  {
    number: 'CS 4375',
    name: 'Introduction to Machine Learning',
    description:
      'Introduction to Machine Learning (3 semester credit hours) Algorithms for creating computer programs that can improve their performance through learning. Topics include: cross-validation, decision trees, neural nets, statistical tests, Bayesian learning, computational learning theory, instance-based learning, reinforcement learning, bagging, boosting, support vector machines, Hidden Markov Models, clustering, and semi-supervised and unsupervised learning techniques. Prerequisites: (CS 3341 or SE 3341 or (Data Science major and STAT 3355)) and (CE 3345 or CS 3345 or SE 3345) or equivalent.',
  },
  {
    number: 'CS 4376',
    name: 'Object-Oriented Design',
    description:
      ' Object-Oriented Design (3 semester credit hours) In-depth study of the features/advantages of object-oriented approach to problem solving. Special emphasis on issues of object-oriented analysis, design, implementation, and testing. Review of basic concepts of object-oriented technology (abstraction, inheritance, and polymorphism). Object-oriented programming languages, databases, and productivity tools. Prerequisites: (CE 2336 or CS 2336 or CS 2337) with a grade of C or better or equivalent and (CE 3354 or CS 3354 or SE 3354). ',
  },
  {
    number: 'CS 4386',
    name: 'Compiler Design',
    description:
      'Compiler Design (3 semester credit hours) Basic phases of a compiler and their design principles. Topics include lexical analysis, basic parsing techniques such as LR(K) and LL(K) grammars. Prerequisite: (CE 3345 or CS 3345 or SE 3345) or equivalent.',
  },
  {
    number: 'CS 4389',
    name: 'Data and Applications Security',
    description:
      'Data and Applications Security (3 semester credit hours) Data as a critical resource. Threats to data and applications security including access control violations, integrity violations, unauthorized intrusions and sabotage; techniques to enforce security. Prerequisite: CS 4347 or SE 4347.',
  },
  {
    number: 'CS 4390',
    name: 'Computer Networks',
    description:
      'Computer Networks (3 semester credit hours) The design and analysis of computer networks. Topics include the ISO reference model, transmission media, medium-access protocols, LANs, data link protocols, routing, congestion control, internetworking, and connection management. Credit cannot be received for both courses, (CE 4390 or CS 4390) and EE 4390. Prerequisite: (CE 3345 or CS 3345 or SE 3345) or equivalent. ',
  },
  {
    number: 'CS 4391',
    name: 'Introduction to Computer Vision',
    description:
      ' Introduction to Computer Vision (3 semester credit hours) Techniques for manipulating and extracting information from digital images and video. Topics include color representations, analysis and processing based on image histograms, geometric transformations, convolutions, image blurring and sharpening, extraction of edges, matching, image and video motion. Prerequisites: (CE 3345 or CS 3345 or SE 3345) or equivalent.',
  },
  {
    number: 'CS 4392',
    name: 'Computer Animation',
    description:
      'Computer Animation (3 semester credit hours) Introduction to traditional animation. Kinematics of motion. Key framing. Coordinate systems and transformations (review), Euler angles and Quaternions, Catmull Rom and B-Splines, Advanced Key framing, articulated figures (forward kinematics), human and animal modeling (soft tissue, skin, etc.). Facial animation (parametric). Physically based modeling (rigid, collision detection). Physically based modeling (deformable). Behavioral and heuristic models. Algorithmic animation. Optimization techniques. Animation languages and systems. Motion capture and real time control. Virtual reality and animation. Rendering and temporal aliasing. 2D and 3D morphing. 3D modeling. Prerequisites: MATH 2418 and (CE 3345 or CS 3345 or SE 3345) or equivalent. ',
  },
  {
    number: 'CS 4393',
    name: 'Computer and Network Security',
    description:
      'Computer and Network Security (3 semester credit hours) The study of security and vulnerabilities in computer and network systems. Common attacking techniques such as buffer overflow, viruses, worms, etc. Security in existing systems such as UNIX, Windows, and JVM. Fundamental access control and information flow concepts. Symmetric Ciphers such as DES and AES. Public-key encryption techniques and related number theory. Message authentication, hash functions, and digital signatures. Authentication applications, IP security and Web security. Prerequisites: (CE 4348 or CS 4348 or SE 4348 or equivalent) and (CE 4390 or CS 4390 or equivalent).',
  },
  {
    number: 'CS 4394',
    name: 'Implementation of Modern Operating Systems',
    description:
      ' Implementation of Modern Operating Systems (3 semester credit hours) This course focuses on developing systems implementation skills through a set of projects. Each project will explore one fundamental component of operating systems such as process scheduling, memory management, device drivers, file systems, and network communication management. The projects are expected to involve kernel-level programming. Prerequisite: CE 4348 or CS 4348 or SE 4348 or equivalent programming experience. ',
  },
  {
    number: 'CS 4395',
    name: 'Human Language Technologies',
    description:
      'Human Language Technologies (3 semester credit hours) Introduction to human language technologies (HLT), the study of natural languages from a computational perspective. Topics include computational models of syntax and semantics, natural language applications (such as machine translation, speech processing, information retrieval, and information extraction), and general machine-learning techniques commonly used in state-of-the-art HLT research. Prerequisites: (CS 3341 or SE 3341) and (CE 3345 or CS 3345 or SE 3345) or equivalent.',
  },
  {
    number: 'CS 4396',
    name: 'Networking Laboratory',
    description:
      'Networking Laboratory (3 semester credit hours) This course takes a lab-oriented approach to demonstrate how basic networking concepts are applied in a real network. The hands-on projects include setting up simple network topologies, configuring devices to run basic network protocols, and using various debugging tools to identify, locate, and fix common problems in networking. Prerequisite: CS 4390 or equivalent. ',
  },
  {
    number: 'CS 4397',
    name: 'Embedded Computer Systems',
    description:
      'Embedded Computer Systems (3 semester credit hours) Introduction to embedded computer applications and concepts. Real-time operating systems and resource management. Real-time scheduling and communication. Senior data acquisition, processing and fusion. Error handling, fault tolerance, and graceful degradation. System performance analysis and optimization techniques. Includes a project to develop and analyze a small embedded computer application. Prerequisite: (CE 4348 or CS 4348 or SE 4348) or equivalent. ',
  },
  {
    number: 'CS 4398',
    name: 'Digital Forensics',
    description:
      'Digital Forensics (3 semester credit hours) Creating and preserving digital evidence, data recovery and evidence collection algorithms, evidence construction and reconstruction, methods for certifying evidence, storing evidence, data acquisition, forensic analysis algorithms, image files, network forensics, logging methods to trace back attacks and digital trails, e-mail investigations. Prerequisites: (CE 4348 or CS 4348 or SE 4348) and (CE 4390 or CS 4390) or equivalent. ',
  },
  {
    number: 'CS 4399',
    name: 'Senior Honors in Computer Science',
    description:
      'Senior Honors in Computer Science (3 semester credit hours) For students conducting independent research for honors theses or projects. Topics may vary. Additional prerequisites may be required depending on the specific course topic. Instructor consent required. ',
  },
  {
    number: 'CS 4459',
    name: 'Cyber Attack and Defense Laboratory',
    description:
      'Cyber Attack and Defense Laboratory (4 semester credit hours) This course aims to teach a wide spectrum of offensive techniques and their defenses for computer systems. In particular, the course will cover introductory (e.g., stack overflow, shellcode) to intermediary level (e.g., heap exploits) binary reversing and pwning techniques, which include vulnerability analysis, exploit development, patching vulnerabilities, bug hunting, etc. The course comprises of eight units of hands-on labs with Capture-The-Flag (CTF) style challenges. The course will be hands-on heavy and will require students to work on a series of in-class and out-of-class CTF style challenges. Prerequisites: (CS 2340 or SE 2340) and (CS 3345 or SE 3345) and (CS 3377 or SE 3377).',
  },
  {
    number: 'EE 4325',
    name: 'Introduction to VLSI Design',
    description:
      " Introduction to VLSI Design (3 semester credit hours) Introduction to CMOS digital IC design using semi-custom and full-custom design techniques with an emphasis on techniques for rapid prototyping and use of various VLSI design tools. FPGA's, standard cell and full-custom design styles. Introduction to a wide variety of CAD tools. Prerequisite: CE 3320 or EE 3320 (or, for CS majors, CS 4341).",
  },
  {
    number: 'SE 4351',
    name: 'Requirements Engineering',
    description:
      ' Requirements Engineering (3 semester credit hours) Introduction to system and software requirements engineering. The requirements engineering process, including requirements elicitation, specification, and validation. Essential words and types of requirements. Structural, informational, and behavioral requirements. Non-functional requirements. Scenario analysis. Conventional, object-oriented and goal-oriented methodologies. Prerequisites: SE 3306 and (CE 3354 or CS 3354 or SE 3354) or instructor consent required.',
  },
  {
    number: 'SE 4352',
    name: 'Software Architecture and Design',
    description:
      'Software Architecture and Design (3 semester credit hours) Introduction to software design with emphasis on architectural design. Models of software architecture. Architecture styles and patterns, including explicit, event-driven, client-server, and middleware architectures. Decomposition and composition of architectural components and interactions. Use of non-functional requirements for tradeoff analysis. Component based software development, deployment and management. Prerequisites: SE 3306 and (CE 3354 or CS 3354 or SE 3354) or instructor consent required. (',
  },
  {
    number: 'SE 4367',
    name: 'Software Testing, Verification, Validation and Quality Assurance',
    description:
      'Software Testing, Verification, Validation and Quality Assurance (3 semester credit hours) Methods for evaluating software for correctness and reliability, including code inspections, program proofs and testing methodologies. Formal and informal proofs of correctness. Code inspections and their role in software verification. Unit and system testing techniques, testing tools and limitations of testing. Statistical testing, reliability models. Prerequisites: SE 3306 and (CE 3354 or CS 3354 or SE 3354) or instructor consent required.',
  },
  {
    number: 'SE 4381',
    name: 'Software Project Planning and Management',
    description:
      "Software Project Planning and Management (3 semester credit hours) Planning and managing of software development projects. Software process models, ISO 9000, SEI's Capability Maturity Model, continuous process improvement. Planning, scheduling, tracking, cost estimation, risk management, configuration management. Prerequisite: CE 3354 or CS 3354 or SE 3354. ",
  },
];
