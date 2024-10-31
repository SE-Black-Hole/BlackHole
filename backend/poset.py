# author: Rithwik
# description: data structure for generation of courses

class Poset(object):
    def __init__(self, required, electives, core):
        self.requiredByDegree = sorted(required, key=lambda node : node.semesters_required)
        self.electives = electives
        self.core = core
        self.all = required + electives + core
        self.total_classes = len(self.all)
        self.courses_by_time = []
        self.separate_courses_by_time()

    def fetch(self, classNumber):
        for node in self.all:
            if classNumber == node.classNumber:
                return node
        return None
    def separate_courses_by_time(self):
        for course in self.requiredByDegree:
            if len(self.courses_by_time) == course.semesters_required:
                self.courses_by_time.append([course])
            else:
                self.course_by_time[-1].append(course)

    def __str__(self):
        string = ""
        for n in self.requiredByDegree:
            string += str(n) + "\n\n"

        for n in self.core:
            string += str(n) + "\n\n"

        for n in self.electives:
            string += str(n) + "\n\n"
        return string



class Node(object):
    
    def __init__(self, classNumber = ""):
        self.classNumber = classNumber
        self.credits = int(classNumber[-3])
        self.pre = []
        self.preOf = []
        self.co = []
        self.semesters_required = 0
        self.isMajorElective = False
        self.Used = False

    def set_semesters_required(self, num_courses):
        if self.semesters_required < num_courses:
            self.semesters_required = num_courses
            for node in self.preOf:
                 node.set_semesters_required(num_courses + 1)

    def update_semesters_required(self):
        self.semesters_required = max(self.pre,key=lambda course: course.semesters_required) + 1

    def course

    def __str__(self):
        return self.classNumber + " " + str(self.credits) + ", Pre: " + \
        str([str(n.classNumber) for n in self.pre ]) + ", co: " + str([str(n.classNumber) for n in self.co ]) + \
        ", preOf:" + str([str(n.classNumber) for n in self.preOf ]) + ", " + str(self.semesters_required) + ", " + str(self.isMajorElective)


