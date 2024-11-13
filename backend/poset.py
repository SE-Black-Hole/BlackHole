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
            if len(courses_by_time) == course.semesters_required:
                courses_by_time.append([course])
            else:
                courses_by_time[-1].append(course)
        
        courses_by_time.append([])
        courses_by_time.append([])
        
        return courses_by_time
    def update_semesters_required(self,courses):
        for course in courses:
            if not course.updated:
                self.courses_by_time[course.previous_semesters_required].remove(course)
                self.courses_by_time[course.semesters_required].append(course)
                course.update()

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
        self.coOf = []
        self.semesters_required = 0
        self.previous_semesters_required = 0
        self.isMajorElective = False
        self.locked = False
        self.taken = False
        self.updated = True

    def update_semesters_required_all(self, semesters_required=0):
        self.semesters_required = semesters_required
        for node in self.preOf:
            node.set_semesters_required(self.semesters_required + 1)

    def set_semesters_required(self, num_courses):
        if self.semesters_required < num_courses:
            self.semesters_required = num_courses
            for node in self.preOf:
                 node.set_semesters_required(num_courses + 1)

    def update_semesters_required(self, updated_courses):

        semesters_required = self.semesters_required
        new_index = max(self.pre,key=lambda course: course.semesters_required).semesters_required + 1
        self.semesters_required = 0 if new_index < 0 else new_index
        if (semesters_required != self.semesters_required):
            if self.updated:
                updated_courses.append(self)
                self.updated = False
            self.previous_semesters_required = semesters_required
            for course in self.preOf:
                course.update_semesters_required(updated_courses)

    def check_if_coreq_available(self):
        if not len(self.coOf):
            return False
        for course in self.coOf[0].pre:
            if course != self and not (course.semesters_required < 0):
                return False
        return True
    
    def update(self):
        self.updated = True

    def set_required_by_user(self):
        self.required_by_user = not self.required_by_user

    def mark_as_taken_dropped(self):
        self.taken = not self.taken

    def take_drop(self):
        course_to_update = []
        semesters_required = self.semesters_required
        if not self.semesters_required:
            self.semesters_required = -1
        elif self.semesters_required == -1:
            self.semesters_required = 0
        elif self.semesters_required == -2:
            self.semesters_required = 1
        elif self.semesters_required == 1:
            self.semesters_required = -2
        else: 
            print("error for course: %s"% (self.classNumber))
            return
        
        if self.updated:
            course_to_update.append(self)
            self.updated = False
            self.previous_semesters_required = semesters_required
        for course in self.preOf:
            course.update_semesters_required(course_to_update)
        return course_to_update
            
    def set_locked(self):
        self.locked = not self.locked

    def __str__(self):
        return self.classNumber + " " + str(self.credits) + ", Pre: " + \
        str([str(n.classNumber) for n in self.pre ]) + ", co: " + str([str(n.classNumber) for n in self.co ]) + \
        ", preOf:" + str([str(n.classNumber) for n in self.preOf ]) + ", coOf:" + str([str(n.classNumber) for n in self.coOf ]) + ", " + str(self.semesters_required) + ", " + str(self.isMajorElective)