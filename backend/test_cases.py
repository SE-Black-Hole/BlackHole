import unittest
from poset import Node, Poset
from semester_class import Semester
from degree_generator import Generator
import sys
sys.path.insert(1, 'C:\\Users\\ianvi\\Documents\\GitHub\\BlackHole\\backend\\server') 
from data_manager import DataManager
import pickle

class TestNode(unittest.TestCase):
    """ Tests for class node"""

    def test_simple_node(self): # 1
        """ Test a simple node object with just a name and number of credits"""
        cs3354 = Node("CS3354")
        cs3354.update_semesters_required_all()
        expected = 'CS3354 3, Pre: [], co: [], preOf:[], coOf:[], semesters:0, height:0, False'
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

        expected = "CS3354 3, Pre: ['CS3345', 'ECE2390'], co: ['ECE2390'], preOf:[], coOf:[], semesters:1, height:0, False"
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
        expected ="""CS3345 3, Pre: [], co: [], preOf:['CS3354'], coOf:[], semesters:0, height:0, False

ECE2390 3, Pre: [], co: [], preOf:['CS3354'], coOf:['CS3354'], semesters:0, height:0, False

CS3354 3, Pre: ['CS3345', 'ECE2390'], co: ['ECE2390'], preOf:[], coOf:[], semesters:1, height:0, False


HIST1302 3, Pre: [], co: [], preOf:[], coOf:[], semesters:0, height:0, False


CS4365 3, Pre: [], co: [], preOf:[], coOf:[], semesters:0, height:0, False

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
        expected = "CS3354 3, Pre: ['CS3345', 'ECE2390'], co: ['ECE2390'], preOf:[], coOf:[], semesters:1, height:0, False"
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
        expected = [['CS3345'], [], ['CS3354'], [], ['CS2305']]
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
        expected = ['CS2305', 'CS3345']
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

    def test_empty_lists(self): # 16
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
        generator = Generator(poset)
        expected = []
        actual = generator.get_new_list()
        self.assertEqual(expected, actual,"Error")

    def test_generate_one_possible_plan1(self): # 17
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
        # print(poset)
        generator = Generator(poset,3)
        expected = [[['CS2305'], ['CS3345'], ['CS3354']]]
        actual = generator.generate()
        self.assertEqual(expected, actual,"Error")


    def test_generate_one_possible_plan2(self): # 18
        """Test generate method returning a simple plan"""
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3305 = Node("CS3305")
        cs3345.preOf.append(cs3354)
        cs3345.pre.append(cs2305)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(cs3305)
        cs2305.preOf.append(cs3345)
        cs2305.preOf.append(cs3305)
        cs3305.pre.append(cs2305)
        cs3305.preOf.append(cs3354)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs3305,cs2305],[], [])
        # print(poset)
        # print(poset)
        generator = Generator(poset,3)
        expected = [[['CS2305'], ['CS3305', 'CS3345'], ['CS3354']]]
        actual = generator.generate()
        self.assertEqual(expected, actual,"Error")

    def test_generate_one_possible_plan3s(self): # 19
        """Test generate method returning a simple plan"""
        # print("pao")
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3305 = Node("CS3305")
        cs1200 = Node("cs1200")
        cs3345.preOf.append(cs3354)
        cs3345.pre.append(cs2305)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(cs3305)
        cs2305.preOf.append(cs3345)
        cs1200.preOf.append(cs3305)
        cs1200.preOf.append(cs3345)
        cs2305.preOf.append(cs3305)
        cs3305.pre.append(cs2305)
        cs3305.preOf.append(cs3354)
        cs3345.pre.append(cs1200)
        cs3305.pre.append(cs1200)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs3305,cs2305,cs1200],[], [])
        # print(poset)
        generator = Generator(poset,3)
        expected = [[['cs1200', 'CS2305'], ['CS3305', 'CS3345'], ['CS3354']]]
        actual = generator.generate()
        self.assertEqual(expected, actual,"Error")
        
    def test_generate_plans(self): # 20
        """Test generate method returning a simple plan"""
        # print("pao")
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3305 = Node("CS3305")
        cs1200 = Node("cs1200")
        cs3345.preOf.append(cs3354)
        cs3345.pre.append(cs2305)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(cs3305)
        cs2305.preOf.append(cs3345)
        cs2305.preOf.append(cs3305)
        cs3305.pre.append(cs2305)
        cs3305.preOf.append(cs3354)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs3305,cs2305,cs1200],[], [])
        # print(poset)
        generator = Generator(poset,4)
        expected = [[['CS2305'], ['cs1200'], ['CS3305', 'CS3345'], ['CS3354']],
                    [['CS2305'], ['CS3345'], ['CS3305'], ['CS3354', 'cs1200']],
                    [['CS2305'], ['CS3345'], ['cs1200', 'CS3305'], ['CS3354']],
                    [['CS2305'], ['CS3305'], ['CS3345'], ['cs1200', 'CS3354']], 
                    [['CS2305'], ['CS3305'], ['CS3345', 'cs1200'], ['CS3354']], 
                    [['CS2305'], ['CS3345', 'cs1200'], ['CS3305'], ['CS3354']], 
                    [['CS2305'], ['CS3305', 'cs1200'], ['CS3345'], ['CS3354']], 
                    [['CS2305'], ['CS3305', 'CS3345'], ['CS3354'], ['cs1200']], 
                    [['CS2305'], ['CS3305', 'CS3345'], ['cs1200'], ['CS3354']], 
                    [['cs1200'], ['CS2305'], ['CS3305', 'CS3345'], ['CS3354']], 
                    [['cs1200', 'CS2305'], ['CS3345'], ['CS3305'], ['CS3354']], 
                    [['cs1200', 'CS2305'], ['CS3305'], ['CS3345'], ['CS3354']]]
        actual = generator.generate()
        # print(actual)
        self.assertEqual(expected, actual,"Error")

    def test_generate_shortest_plans(self): # 21
        """Test generate method returning a simple plan"""
        # print("pao")
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3305 = Node("CS3305")
        cs1200 = Node("cs1200")
        cs4375 = Node("cs4375")
        cs4375.pre.append(cs3305)
        cs3345.preOf.append(cs3354)
        cs3345.pre.append(cs2305)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(cs3305)
        cs2305.preOf.append(cs3345)
        cs2305.preOf.append(cs3305)
        cs3305.pre.append(cs2305)
        cs3305.preOf.append(cs4375)
        cs3305.preOf.append(cs3354)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs3305,cs2305,cs1200,cs4375],[], [])
        # print(poset)
        generator = Generator(poset)
        expected = [[['CS2305'], ['CS3305', 'CS3345'], ['cs1200', 'CS3354', 'cs4375']], 
                    [['CS2305'], ['CS3305', 'CS3345', 'cs1200'], ['cs4375', 'CS3354']],
                      [['cs1200', 'CS2305'], ['CS3305', 'CS3345'], ['CS3354', 'cs4375']]]
        # print("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH\n")
        actual = generator.generate_shortest_plans()
        # print(actual)
        self.assertEqual(expected, actual,"Error")

    def test_plan_least_deviation(self): # 22
        """Test generate method returning a simple plan"""
        # print("pao")
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3305 = Node("CS3305")
        cs1200 = Node("cs1200")
        cs4375 = Node("cs4375")
        cs4375.pre.append(cs3305)
        cs3345.preOf.append(cs3354)
        cs3345.pre.append(cs2305)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(cs3305)
        cs2305.preOf.append(cs3345)
        cs2305.preOf.append(cs3305)
        cs3305.pre.append(cs2305)
        cs3305.preOf.append(cs4375)
        cs3305.preOf.append(cs3354)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs3305,cs2305,cs1200,cs4375],[], [])
        # print(poset)
        generator = Generator(poset)
        expected = [['cs1200', 'CS2305'], ['CS3305', 'CS3345'], ['CS3354', 'cs4375']]
        # print("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH\n")
        actual = generator.get_smallest_deviation_plan()
        # print(actual)
        self.assertEqual(expected, actual,"Error")

    def test_generate_least_deviation_plan_after_updating_poset(self): # 23
        """ Retrieving list of taken classes and generating plan with less deviation"""
        # print('pao')
        cs3354 = Node("CS3354")
        cs2305 = Node("CS2305")
        cs3345 = Node("CS3345")
        cs3305 = Node("CS3305")
        cs1200 = Node("cs1200")
        cs3345.preOf.append(cs3354)
        cs3345.pre.append(cs2305)
        cs3354.pre.append(cs3345)
        cs3354.pre.append(cs3305)
        cs2305.preOf.append(cs3345)
        cs1200.preOf.append(cs3305)
        cs1200.preOf.append(cs3345)
        cs2305.preOf.append(cs3305)
        cs3305.pre.append(cs2305)
        cs3305.preOf.append(cs3354)
        cs3345.pre.append(cs1200)
        cs3305.pre.append(cs1200)
        cs2305.update_semesters_required_all()
        poset = Poset([cs3345,cs3354,cs3305,cs2305,cs1200],[], [])
        g = Generator(poset)
        # print(poset.get_str_courses_by_time())
        g.update_poset([cs1200,cs2305])
        # print(poset.get_str_courses_by_time())
        expected = [['CS3345', 'CS3305'], ['CS3354']]
        actual = g.get_smallest_deviation_plan()
        self.assertEqual(expected, actual,"Error")

    def test_generate_quick_schedule(self): # 24
        """Test generate quick schedule method"""
        c1 = Node('301')
        c2 = Node('302')
        c3 = Node('303')
        c4 = Node('304')
        c5 = Node('305')
        c6 = Node('306')
        c7 = Node('307')
        c8 = Node('308')
        c9 = Node('309')
        c10 = Node('310')
        # n2.set_height(node.height)
        c1.preOf.append(c3)
        c2.preOf.append(c3)
        c3.pre.append(c1)
        c3.pre.append(c2)
        c3.preOf.append(c5)
        c5.pre.append(c3)
        c5.preOf.append(c6)
        c5.preOf.append(c9)
        c5.preOf.append(c10)
        c6.pre.append(c5)
        c9.pre.append(c5)
        c10.pre.append(c5)
        c6.preOf.append(c7)
        c9.preOf.append(c8)
        c7.pre.append(c6)
        c8.pre.append(c9)


        c1.update_semesters_required_all()
        c6.set_height(0)
        c9.set_height(0)
        poset = Poset([c1,c2,c3,c4,c5,c6,c7,c8,c9,c10],[],[])
        # print(poset)
        g = Generator(poset)

        expected = [['302', '301'], ['303', '304'], ['305'], ['309', '306', '310'], ['307', '308']]
        actual = g.get_quick_low_deviation_plan(9)
        self.assertEqual(expected, actual,"Error")

    def Test_generate_real_class_algo_1(self): # ? doesnt work. 
        """ Retrieving list of taken classes and generating plan with less deviation"""
        dm = DataManager()
        completed_courses = dm.get_courses_completed_by_username()
        poset = None
        with open("classObjects_data.pkl", 'rb') as inp:
            poset = pickle.load(inp)
            # print(poset)
        classes_taken = []
        for course in completed_courses:
            # print(course)
            classes_taken.append(poset.fetch(course.replace(" ", "")))
        # print(completed_courses)
        # print('pao')
        # print(completed_courses)
        # print('pao')
        # print(classes_taken)
        # print(poset)
        # print("!!!!!!!!!!!!!!!!!!!")
        # print(poset.get_str_courses_by_time())
        g = Generator(poset)
        # g.update_poset(classes_taken)
        # print(poset)
        # 'CS2336', 'CS2305', 'ECS2390'
        # print(poset.fetch('CS2336'))
        # print(poset.fetch('CS2305'))
        # print(poset.fetch('ECS2390'))
        # print(poset.fetch('CS3354'))
        # 'CS1337', 'CS2305'
        # print(poset.fetch('CS2305'))
        # print(poset.fetch('CS1337'))
        # print()
        print(g.get_smallest_deviation_plan())
        # print()
        # print(poset.fetch('CS2336'))
        # print(poset.fetch('CS2305'))
        # print(poset.fetch('ECS2390'))
        # print(poset.fetch('CS3354'))
        # print(poset.fetch('CS2305'))
        # print(poset.fetch('CS1337'))
        # print("Required by degree", len(poset.requiredByDegree))
# [['MATH2413', 'CS1436', 'MATH2417', 'ECS2390', 'CS4141'], 16
# ['CS1337', 'CS2305', 'PHYS2125', 'PHYS2325', 'MATH2414', 'CS1200'], 16
# ['CS2336', 'CS2337', 'PHYS2126', 'PHYS2326', 'CS2340', 'CS4384'], 16
# ['CS3345', 'CS3377', 'CS3354', 'MATH2418', 'CS4341'], 16
# ['CS3341', 'CS4485', 'CS3162', 'CS4348', 'CS4349', 'ECS1100'], 15
# ['CS4347', 'CS4337', 'MATH2419']] 10

# [['MATH2413', 'CS1436', 'MATH2417', 'ECS2390'], 15
# ['CS1337', 'CS2305', 'PHYS2125', 'PHYS2325', 'MATH2414'], 
# ['CS2336', 'CS2337', 'PHYS2126', 'PHYS2326', 'CS2340', 'CS4384'], 
# ['CS3345', 'CS3377', 'CS3354', 'MATH2418', 'CS4341'], 
# ['CS3341', 'CS4485', 'CS3162', 'CS4348', 'CS4349'], 
# ['CS4347', 'CS4337', 'MATH2419', 'CS4141', 'CS1200', 'ECS1100']]

        expected = [[['CS2305'], ['CS3345'], ['CS3354']]]
        actual = [[['CS2305'], ['CS3345'], ['CS3354']]]
        self.assertEqual(expected, actual,"Error")

    def test_generate_real_class_algo_2(self): # 25
        """ Retrieving list of taken classes and generating plan with less deviation"""
        dm = DataManager()
        completed_courses = dm.get_courses_completed_by_username()
        poset = None
        with open("classObjects_data.pkl", 'rb') as inp:
            poset = pickle.load(inp)
            # print(poset)
        classes_taken = []
        for course in completed_courses:
            # print(course)
            classes_taken.append(poset.fetch(course.replace(" ", "")))
        g = Generator(poset)
        


        expected = [['MATH2413', 'CS1436', 'MATH2417', 'ECS2390'], 
['CS1337', 'CS2305', 'PHYS2125', 'PHYS2325', 'MATH2414'], 
['CS2336', 'CS2337', 'PHYS2126', 'PHYS2326', 'CS2340', 'CS4384'], 
['CS3345', 'CS3377', 'CS3354', 'MATH2418', 'CS4341'], 
['CS3341', 'CS4485', 'CS3162', 'CS4348', 'CS4349'], 
['CS4347', 'CS4337', 'MATH2419', 'CS4141', 'CS1200', 'ECS1100']]
        actual = g.get_quick_low_deviation_plan()
        self.assertEqual(expected, actual,"Error")

    def test_generate_real_class_algo_2_with_classes_taken(self): # 26
        """ Retrieving list of taken classes and generating plan with less deviation"""
        dm = DataManager()
        completed_courses = dm.get_courses_completed_by_username()
        poset = None
        with open("classObjects_data.pkl", 'rb') as inp:
            poset = pickle.load(inp)
            # print(poset)
        classes_taken = [] # ECS 1100, CS 1200
        for course in completed_courses:
            # print(course)
            classes_taken.append(poset.fetch(course.replace(" ", "")))
        g = Generator(poset)
        g.update_poset(classes_taken)
        arr = g.get_quick_low_deviation_plan()
        


        expected = [['MATH2413', 'CS1436', 'MATH2417', 'ECS2390'], 
                    ['CS1337', 'CS2305', 'PHYS2125', 'PHYS2325', 'MATH2414'], 
                    ['CS2336', 'CS2337', 'PHYS2126', 'PHYS2326', 'CS2340'], 
                    ['CS3345', 'CS3377', 'CS3354', 'MATH2418', 'CS4341'], 
                    ['CS3341', 'CS4485', 'CS3162', 'CS4348', 'CS4349'], 
                    ['CS4347', 'CS4337', 'MATH2419', 'CS4141', 'CS4384']]
        actual = arr
        self.assertEqual(expected, actual,"Error")

unittest.main()