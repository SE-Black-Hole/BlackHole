# Author: Ian Victor Xavier

class Semester:
    semester_names = ["Fall", 'Spring', 'Summer']
    index = 0
    year = 2024
    def  __init__(self, min_credit_hours=0, max_credit_hours=16,locked=False, skip_semester=False):
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
        self.max_index_before_locked = 0
        self.coreqs_num = 0
        self.coreq_index = []
        self.contains_coreqs = False

        self.semester_name = Semester.semester_names[Semester.index] + " " + str(Semester.year)
        Semester.index = (Semester.index + 1) % 3
        if Semester.index == 1: Semester.year += 1

    def create_schedule(self):
 
        courses_to_update = []
        
        while not self.locked and self.can_make_schedule: #add iteration for coreq courses adjust for locked courses
            i = 0
            while i < len(self.index_courses) - self.max_index_before_locked:
                if len(self.courses_avail) - (i + 1) - self.index_courses[i] > 0:
                    courses_to_update += self.current_courses[i].take_drop()
                    self.current_credit_hours -= self.current_courses[i].credits - self.courses_avail[self.index_courses[i] + 1].credits
                    self.index_courses[i] += 1
                    self.current_courses[i] = self.courses_avail[self.index_courses[i]]
                    courses_to_update += self.current_courses[i].take_drop() 
                    courses_to_update += self.reset(i)
                    i = 0
                else:
                    i += 1

                if i == 0 and self.current_credit_hours >= self.min_credit_hours:
                    if self.current_credit_hours <= self.max_credit_hours:
                        self.can_return_this_size = True                        
                        return courses_to_update
                    
            
            if self.contains_coreqs:
                self.coreq_schedule()

                
            else:
                self.courses_num += 1
                if self.contains_coreqs:
                    self.coreqs_num = 0
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

    def coreq_schedule(self):
        if not self.coreqs_num or self.coreqs_index[- 1] == len(self.coreqs_duo) - self.coreqs_num/2:
            self.coreqs_num += 2
            if self.coreqs_num + len(self.required_courses) > self.courses_num:
                return
            # set up a new list
            for i in self.coreq_index:
                pass
            for i in range(self.coreqs_num/2, -1, -1):
                pass
        else:
            coreqs_to_update = 0
            for i in range(self.coreq_index):
                if self.coreq_index[i] < len(self.coreqs_duo) - 1 - i:
                    self.coreq_index[i] += 1
                    self.reset_coreq(i)
                    coreqs_to_update = i

    def reset(self, index):
        courses_to_update = []

        
        for i in range(index - 1, -1,-1):
            courses_to_update += self.current_courses[i].take_drop()
            self.current_credit_hours -= self.current_courses[i] - self.courses_avail[self.index_courses[i] + 1]
            self.index_courses[i] = self.index_courses[i + 1] + 1
            self.current_courses[i] = self.courses_avail[self.index_courses[i]]
            courses_to_update += self.current_courses[i].take_drop()


        return courses_to_update
    
    def reset_coreq (self,index):
        if self.coreq_index[index] + 1 >= self.coreq_index[index]:
            return 
        
        for i in range(index - 1, -1,-1):
            self.coreq_index[i] = self.coreq_index[i + 1] + 1

    def get_current_courses(self):
        arr = list(self.current_courses)
        for i in range(len(arr)):
            arr[i] = arr[i].classNumber

        return arr

    def set_required_courses(self, courses):
        self.required_courses = courses
        for course in courses:
            course.set_locked()
        self.max_index_before_locked = len(self.required_courses)

    def add_required_course(self,course):
        self.required_courses.append(course)
        course.set_locked()
        self.max_index_before_locked = len(self.required_courses)

    def remove_required_courses(self,courses):
        for course in courses:
            self.required_courses.remove(course)
            course.set_locked()
        self.max_index_before_locked = len(self.required_courses)

    def set_courses_avail(self, courses_avail): # TODO make it use the method above and check for sum_all_classes > min
        self.courses_avail = list(courses_avail)
        
        if self.min_credit_hours <= sum([n.credits for n in self.courses_avail]) and min([True] + [(i in self.courses_avail) for i in self.required_courses]):
            self.can_make_schedule = True
            for index in range(len(self.required_courses)):
                old_index = self.courses_avail.index(self.required_courses[index])
                self.courses_avail[index], self.courses_avail[old_index] = self.courses_avail[old_index], self.courses_avail[index]
            

        courses_to_update = []
        if self.can_make_schedule:
            for course in self.courses_avail:
                if course.check_if_coreq_available():
                    self.coreqs_duo.append([course, course.coOf[0]])
            # if len(self.coreqs_duo):
            if len(self.coreqs_duo):
                self.contains_coreqs = True

            for i in range(self.courses_num, -1,-1):
                self.index_courses.append(i)
                self.current_courses.append(self.courses_avail[i])
                courses_to_update += self.current_courses[-1].take_drop()
        else:
            self.current_courses = []
        return courses_to_update


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
    

    