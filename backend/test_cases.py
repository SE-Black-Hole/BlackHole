import unittest
from poset import Node, Poset
from semester_class import Semester
from degree_generator import Generator

class TestNode(unittest.TestCase):
    """ Tests for class node"""

    def test_simple_node(self): # 1
        """ Test a simple node object with just a name and number of credits"""
        cs3354 = Node("CS3354")
        cs3354.update_semesters_required_all()
        expected = 'CS3354 3, Pre: [], co: [], preOf:[], coOf:[], 0, False'
        actual = str(cs3354)
        self.assertEqual(expected, actual,"Error")

    def test_node_with_coreq_prereq(self): # 2
        """ Test a node with both corequisites and prerequisites and number of credits"""
        cs3354 = Node("CS3354")
        ece2390 = Node("ECE2390")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(ece2390)
        ece2390.preOf.append(cs3354)
        cs3354.co.append(ece2390)
        ece2390.coOf.append(cs3354)
        ece2390.update_semesters_required_all()
        cs3345.update_semesters_required_all()

        expected = "CS3354 3, Pre: ['CS3345', 'ECE2390'], co: ['ECE2390'], preOf:[], coOf:[], 1, False"
        actual = str(cs3354)
        self.assertEqual(expected, actual,"Error")
        
    def test_node_semesters_required(self): # 3
        """Test a node giving the number of semesters necessary to take it"""
        cs3354 = Node("CS3354")
        cs3345 = Node("CS3345")
        cs2336 = Node("CS2336")
        cs3354.pre.append(cs3345)
        cs3345.preOf.append(cs3354)
        cs3345.pre.append(cs2336)
        cs2336.preOf.append(cs3345)
        cs3345.set_semesters_required(1)
        expected = 2
        actual = cs3354.semesters_required
        self.assertEqual(expected, actual,"Error")

    def test_take_drop_method(self): # 4
        """Test node that is being taken (semesters_required should be -1 or -2)"""
        cs3354 = Node("CS3354")
        cs3354.update_semesters_required_all()
        cs3354.take_drop()
        expected = -1
        actual = cs3354.semesters_required
        self.assertEqual(expected, actual,"Error")

    def test_corequisite_available_True(self): # 5
        """ Test node returning True when it is possible to take it with its corequisite"""
        cs3354 = Node("CS3354")
        ece2390 = Node("ECE2390")
        cs3354.pre.append(ece2390)
        ece2390.preOf.append(cs3354)
        cs3354.co.append(ece2390)
        ece2390.coOf.append(cs3354)
        ece2390.update_semesters_required_all()
        expected = True
        actual = ece2390.check_if_coreq_available()
        self.assertEqual(expected, actual,"Error")

    def test_corequisite_available_False(self): # 6
        """ Test node returning False when it is not possible to take it with its corequisite"""
        cs3354 = Node("CS3354")
        ece2390 = Node("ECE2390")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(ece2390)
        ece2390.preOf.append(cs3354)
        cs3354.co.append(ece2390)
        ece2390.coOf.append(cs3354)
        ece2390.update_semesters_required_all()
        cs3345.update_semesters_required_all()
        expected = False
        actual = ece2390.check_if_coreq_available()
        self.assertEqual(expected, actual,"Error")

class TestPoset(unittest.TestCase):
    """Tests for poset class """

    def test_string_method(self): # 7
        """" Test string method of a poset with 3 courses (3 for each required, 1 for elective, 1 for core)"""
        self.maxDiff = None
        cs3354 = Node("CS3354")
        ece2390 = Node("ECE2390")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(ece2390)
        ece2390.preOf.append(cs3354)
        cs3354.co.append(ece2390)
        ece2390.coOf.append(cs3354)
        ece2390.update_semesters_required_all()
        cs3345.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,ece2390],[Node("CS4365")], [Node("HIST1302")])
        expected ="""CS3345 3, Pre: [], co: [], preOf:['CS3354'], coOf:[], 0, False

ECE2390 3, Pre: [], co: [], preOf:['CS3354'], coOf:['CS3354'], 0, False

CS3354 3, Pre: ['CS3345', 'ECE2390'], co: ['ECE2390'], preOf:[], coOf:[], 1, False

HIST1302 3, Pre: [], co: [], preOf:[], coOf:[], 0, False

CS4365 3, Pre: [], co: [], preOf:[], coOf:[], 0, False

"""
        actual = str(poset)
        self.assertEqual(expected, actual,"Error")

    def test_fetch_a_node_exists(self): # 8
        """ Test poset object returning the correct node object"""
        cs3354 = Node("CS3354")
        ece2390 = Node("ECE2390")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(ece2390)
        ece2390.preOf.append(cs3354)
        cs3354.co.append(ece2390)
        ece2390.coOf.append(cs3354)
        ece2390.update_semesters_required_all()
        cs3345.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,ece2390],[Node("CS4365")], [Node("HIST1302")])
        expected = "CS3354 3, Pre: ['CS3345', 'ECE2390'], co: ['ECE2390'], preOf:[], coOf:[], 1, False"
        actual = str(poset.fetch("CS3354"))
        self.assertEqual(expected, actual,"Error")

    def test_fetch_a_node_None(self): # 9
        """ Test fetch method returning None when the node does not exist"""
        cs3354 = Node("CS3354")
        ece2390 = Node("ECE2390")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(ece2390)
        ece2390.preOf.append(cs3354)
        cs3354.co.append(ece2390)
        ece2390.coOf.append(cs3354)
        ece2390.update_semesters_required_all()
        cs3345.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,ece2390],[Node("CS4365")], [Node("HIST1302")])
        expected = "None"
        actual = str(poset.fetch("CS4375"))
        self.assertEqual(expected, actual,"Error")

    def test_separate_courses_by_time(self): # 10
        """ Test poset separating 3 courses by semesters needed to take each one plus 2 empty array in the end 
        for taken classes"""
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3345.pre.append(cs2305)
        cs2305.preOf.append(cs3345)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs2305],[], [])
        arr = poset.courses_by_time
        for i in arr:
            for j in range(len(i)):
                i[j] = i[j].classNumber
        expected = [['CS2305'], ['CS3345'], ['CS3354'], [], []]
        actual = arr
        self.assertEqual(expected, actual,"Error")

    def test_update_separate_courses_by_time(self): #11
        """ Test poset updating list courses_by_time"""
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3345.pre.append(cs2305)
        cs2305.preOf.append(cs3345)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs2305],[], [])
        poset.update_semesters_required(cs2305.take_drop())
        arr = poset.courses_by_time
        for i in arr:
            for j in range(len(i)):
                i[j] = i[j].classNumber
        expected = [['CS3345'], ['CS3354'], [], [], ['CS2305']]
        actual = arr
        self.assertEqual(expected, actual,"Error")

class TestSemester(unittest.TestCase):
    
    def test_set_courses_avail(self): # 12
        """Test if semester class is taking the list of all the courses it can use and creating a current schedule"""
        self.maxDiff = None
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs2336 = Node("CS2336")
        cs3341 = Node("CS3341")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3345.pre.append(cs2305)
        cs2305.preOf.append(cs3345)
        cs3341.preOf.append(cs3345)
        cs3345.pre.append(cs3341)
        cs2336.preOf.append(cs3345)
        cs3345.pre.append(cs2336)

        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs2305,cs3341,cs2336],[], [])
        semester = Semester(min_credit_hours=0)
        semester.set_courses_avail(poset.courses_by_time[0])
        expected = ['CS2305']
        actual = semester.get_current_courses()
        self.assertEqual(expected, actual,"Error")

    def test_set_courses_avail_courses_to_update(self): # 13
        """ Test if semester is giving the correct classes to update after taking current classes"""
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3345.pre.append(cs2305)
        cs2305.preOf.append(cs3345)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs2305],[], [])
        semester = Semester(min_credit_hours=3)
        to_update = semester.set_courses_avail(poset.courses_by_time[0])
        for i in range(len(to_update)):
            to_update[i] = to_update[i].classNumber
        expected = ['CS2305', 'CS3345', 'CS3354']
        actual = to_update
        self.assertEqual(expected, actual,"Error")

    def test_create_new_schedule(self): # 14
        """ Test semester making another schedule after set_courses_avail"""
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs2336 = Node("CS2336")
        cs3341 = Node("CS3341")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3345.pre.append(cs2305)
        cs2305.preOf.append(cs3345)
        cs3341.preOf.append(cs3345)
        cs2336.preOf.append(cs3345)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs2305,cs3341,cs2336],[], [])
        semester = Semester(min_credit_hours=0)
        semester.set_courses_avail(poset.courses_by_time[0])
        semester.create_schedule()
        expected = ['CS3341']
        actual = semester.get_current_courses()
        self.assertEqual(expected, actual,"Error")

    def test_cannot_make_schedule_when_all_courses_less_min_credits(self): # 15
        """ Test semester returning can_make_schedule = False when number of mininum credits
          set for the semester are greater than sum of all courses available for the semesters"""
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs2336 = Node("CS2336")
        cs3341 = Node("CS3341")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3345.pre.append(cs2305)
        cs2305.preOf.append(cs3345)
        cs3341.preOf.append(cs3345)
        cs2336.preOf.append(cs3345)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs2305,cs3341,cs2336],[], [])
        semester = Semester(min_credit_hours=10)
        semester.set_courses_avail(poset.courses_by_time[0])
        current_courses = semester.get_current_courses()
        for i in range(len(current_courses)):
            current_courses[i] = current_courses[i].classNumber
        expected = []
        actual = current_courses
        self.assertEqual(expected, actual,"Error")

class TestDegreeGenerator(unittest.TestCase):
    
    def test_generate(self): # 16
        """Test generate method returning a simple plan"""
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3345.pre.append(cs2305)
        cs2305.preOf.append(cs3345)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs2305],[], [])
        generator = Generator(poset,0,3,[],[])
        expected = [[['CS2305'], ['CS3345'], ['CS3354']]]
        actual = generator.generate()
        self.assertEqual(expected, actual,"Error")

    def test_empty_lists(self): # 17
        """ Test degree generator producing the correct number of empty lists"""
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3345.preOf.append(cs3354)
        cs3354.pre.append(cs3345)
        cs3345.pre.append(cs2305)
        cs2305.preOf.append(cs3345)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs2305],[], [])
        generator = Generator(poset,0,3,[],[])
        expected = [[], [], []]
        actual = generator.get_new_empty_lists_per_semester()
        self.assertEqual(expected, actual,"Error")

unittest.main()
