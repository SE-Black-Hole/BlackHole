# author: Rithwik
# description: data structure for generation of courses

class Poset(object):
    def __init__(self, required, electives, core):
        self.requiredByDegree = sorted(required, key=lambda node : node.semesters_required)
        self.electives = electives
        self.core = core
        self.all = required + electives + core
        self.total_classes = len(self.all)
        self.courses_by_time = self.create_separate_courses_by_time()

    def fetch(self, classNumber):
        for node in self.all:
            if classNumber == node.classNumber:
                return node
        return None

    def create_separate_courses_by_time(self):
        courses_by_time = []
        for course in self.requiredByDegree: 
            if len(self.courses_by_time) == course.semesters_required:
                courses_by_time.append([course])
            else:
                courses_by_time[-1].append(course)

        return courses_by_time
    def update_semesters_required(self,coursesANDchanges):
        for courseANDchange in coursesANDchanges:
            self.courses_by_time[courseANDchange[0].semesters_required + courseANDchange[1]].remove(courseANDchange[0])
            self.courses_by_time[courseANDchange[0].semesters_required].append(courseANDchange[0])

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
    
    def __init__(self, classNumber = "", locked_by_user=False):
        self.classNumber = classNumber
        self.credits = int(classNumber[-3])
        self.pre = []
        self.preOf = []
        self.co = []
        self.semesters_required = 0
        self.isMajorElective = False
        self.locked_by_user = False
        self.taken = False

    def set_semesters_required(self, num_courses):
        if self.semesters_required < num_courses:
            self.semesters_required = num_courses
            for node in self.preOf:
                 node.set_semesters_required(num_courses + 1)

    def update_semesters_required(self, updated_courses):
        semesters_required = self.semesters_required
        self.semesters_required = max(self.pre,key=lambda course: course.semesters_required) + 1
        if (semesters_required != self.semesters_required):
            updated_courses.append([self, semesters_required - self.semesters_required])
            for course in self.preOf:
                course.update_semesters_required()

    def set_required_by_user(self):
        if (not self.required_by_user):
            self.required_by_user = True
        else:
            self.required_by_user = False

    def take_drop(self):
        courses_to_update = []
        if not self.semesters_required:
            self.semesters_required = -1
        elif self.semesters_required == -1:
            self.semesters_required = 0
        else: 
            print("error for course: %s"% (self.classNumber))
            return
        self.taken = not self.taken
        self.update_semesters_required(courses_to_update)
        return courses_to_update
            


    def __str__(self):
        return self.classNumber + " " + str(self.credits) + ", Pre: " + \
        str([str(n.classNumber) for n in self.pre ]) + ", co: " + str([str(n.classNumber) for n in self.co ]) + \
        ", preOf:" + str([str(n.classNumber) for n in self.preOf ]) + ", " + str(self.semesters_required) + ", " + str(self.isMajorElective)


