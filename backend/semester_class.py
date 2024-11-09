# Author: Ian Victor Xavier

class Semester:
    semester_names = ["Fall", 'Spring', 'Summer']
    index = 0
    year = 2024
    def  __init__(self, min_credit_hours=15, max_credit_hours=19,locked=False, skip_semester=False):
        self.max_credit_hours = max_credit_hours
        self.required_courses = []
        self.courses_avail = []
        self.current_courses = []
        self.locked = locked
        self.current_credit_hours = 0
        self.min_credit_hours = min_credit_hours
        self.skip_semester = skip_semester
        self.can_return_this_size = False
        self.index_courses = []
        self.coreqs_duo = []
        self.can_make_schedule = False
        self.courses_num = int(self.min_credit_hours/3)
        

        self.semester_name = Semester.semester_names[Semester.index] + " " + str(Semester.year)
        Semester.index = (Semester.index + 1) % 3
        if Semester.index == 1: Semester.year += 1

    def create_schedule(self):
 
        courses_to_update = []
        
        while not self.locked and self.can_make_schedule: #add iteration for coreq courses adjust for locked courses, remember state
            for i in range(len(self.index_courses)): 

                if len(self.courses_avail) - (i + 1) - self.index_courses[i] > 0:
                    courses_to_update += self.current_courses[i].take_drop()
                    self.current_credit_hours -= self.current_courses[i] - self.courses_avail[self.index_courses[i] + 1]
                    self.index_courses[i] += 1
                    self.current_courses[i] = self.courses_avail[self.index_courses[i]]
                    courses_to_update += self.current_courses[i].take_drop() 
                elif (i < len(self.index_courses) - 1) and self.index_courses[i+1] + 2 < self.index_courses[i]:
                    courses_to_update += self.current_courses[i].take_drop()
                    self.current_credit_hours -= self.current_courses[i] - self.courses_avail[self.index_courses[i] + 1]
                    self.index_courses[i] = self.index_courses[i + 1] + 1
                    self.current_courses[i] = self.courses_avail[self.index_courses[i]]
                    courses_to_update += self.current_courses[i].take_drop()
                
                if self.current_credit_hours >= self.min_credit_hours:
                    if self.current_credit_hours <= self.max_credit_hours:
                        self.can_return_this_size = True                        
                        return courses_to_update
            # if       
            self.courses_num += 1
            if self.can_return_this_size and self.courses_num <= len(self.courses_avail):
                self.can_return_this_size = False
                self.index_courses = [i for i in range(self.courses_num, -1, -1)]
                temp = [self.courses_avail[i] for i in range(self.courses_num)]
                for i in range(len(temp)): # know if courses remains and if it is new
                    if (not temp[i].taken):
                        courses_to_update += temp[i].take_drop()
                    if i != len(self.current_courses) and self.current_courses[i] not in temp:
                        courses_to_update += self.current_courses[i].take_drop()
                self.current_credit_hours = sum([node.credits for node in self.current_courses])
                self.current_courses = temp
                if self.current_credit_hours >= self.min_credit_hours:
                    if self.current_credit_hours <= self.max_credit_hours:
                        self.can_return_this_size = True                        
                        return courses_to_update
            else:
                self.can_make_schedule = False
                for course in self.current_courses:
                    course.take_drop()
                self.current_courses = []


        return courses_to_update

    def get_current_courses(self):
        return list(self.current_courses)

    def set_required_courses(self, courses):
        self.required_courses = courses
        for course in courses:
            course.set_locked()

    def remove_required_courses(self,courses):
        for course in course:
            self.required_courses.remove(course)
            course.set_locked()

    def set_courses_avail(self, courses_avail): # TODO make it use the method above and check for sum_all_classes > min
        self.courses_avail = list(courses_avail)
        if self.min_credit_hours <= sum([n.credits for n in self.courses_avail]):
            self.can_make_schedule = True
        for course in self.courses_avail:
            if course.check_if_coreq_available():
                self.coreqs_duo.append([course, course.coOf[0]])
        return self.create_schedule()
        
    def add_nodes(self, nodes):
        self.current_credit_hours += sum([course.credits for course in nodes])
        to_update = []
        for node in nodes:    
            self.courses.append(node)
            to_update += node.take_drop()
        return to_update

    def remove_nodes(self, nodes):
        self.current_credit_hours -= sum([course.credits for course in nodes])
        to_update = []
        for node in nodes:
            self.courses.remove(node)
            to_update += node.take_drop()

        return to_update

    def add_required_courses(self,nodes):
        self.current_credit_hours += sum([course.credits for course in nodes])
        to_update = []
        for node in nodes:    
            node.locked_by_user = True
            self.courses.append(node)
            to_update += node.take_drop()
        return to_update
    
    def remove_required_courses(self,nodes):
        self.current_credit_hours -= sum([course.credits for course in nodes])
        to_update = []
        for node in nodes:
            node.locked_by_user = False
            self.courses.remove(node)
            to_update += node.take_drop()

        return to_update

# semester = Semester()
    

    