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
        self.previous_courses = []
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
        self.coreqs_index = []
        self.coreqs_num_total = 0

        self.semester_name = Semester.semester_names[Semester.index] + " " + str(Semester.year)
        Semester.index = (Semester.index + 1) % 3
        if Semester.index == 1: Semester.year += 1

    def create_schedule(self):
        while not self.locked and self.can_make_schedule: #add iteration for coreq courses adjust for locked courses
            i = 0
            while i < len(self.index_courses) - self.max_index_before_locked - self.coreqs_num:
                if len(self.courses_avail) - (i + 1) - self.index_courses[i] > 0:
                    self.current_credit_hours -= self.current_courses[i].credits - self.courses_avail[self.index_courses[i] + 1].credits
                    self.index_courses[i] += 1
                    self.current_courses[i] = self.courses_avail[self.index_courses[i]]
                    self.reset(i)
                    i = 0
                else:
                    i += 1

                if i == 0 and self.current_credit_hours >= self.min_credit_hours and self.current_credit_hours <= self.max_credit_hours:
                    self.can_return_this_size = True                        
                    return self.get_courses_to_update()
                
            # if self.coreqs_num_total:
            #     self.coreq_schedule()

            self.courses_num += 1
            # if self.coreqs_num_total:
            #     self.coreqs_num = 0

            if self.can_return_this_size and self.courses_num <= len(self.courses_avail):
                self.can_return_this_size = False
                self.index_courses = [i for i in range(self.courses_num - 1, -1, -1)]
                self.current_credit_hours = sum([node.credits for node in self.current_courses])
                self.current_courses = [self.courses_avail[i] for i in range(self.courses_num)]
                if self.current_credit_hours >= self.min_credit_hours and self.current_credit_hours <= self.max_credit_hours:
                    self.can_return_this_size = True                        
                    return self.get_courses_to_update()
            else:
                self.can_make_schedule = False
                self.current_courses = []

        return self.get_courses_to_update()

    def get_courses_to_update(self):
        courses_to_update = []

        for course in self.current_courses:
            if not course.taken:
                courses_to_update += course.take_drop()
            course.mark_as_taken_dropped()
                
        for course in self.previous_courses:
            if course.taken:
                courses_to_update += course.take_drop()
            course.mark_as_taken_dropped()

        self.previous_courses = list(self.current_courses)
        return courses_to_update

    def coreq_schedule(self):
        coreq_can_update = False
        for i in range(self.coreqs_num/2):
            if self.coreq_index[i] < len(self.coreqs_duo) - 1 - i:
                self.coreq_index[i] += 1
                self.reset_coreq(i)
                coreq_can_update = True
                
        if not self.coreqs_num or self.coreqs_index[-1] == len(self.coreqs_duo) - self.coreqs_num/2:
            self.coreqs_num += 2
            if self.coreqs_num + len(self.required_courses) > self.courses_num:            
                j = 0
                for i in range(self.coreqs_num/2, -1, -1):
                    self.coreqs_index[j] = i
                    j += 1
                coreq_can_update = True

        if coreq_can_update:
            for i in range(self.max_index_before_locked, len(self.index_courses)):
                pass
        return False


        

    def reset(self, index):
        
        for i in range(index - 1, -1,-1):
            self.current_credit_hours -= self.current_courses[i] - self.courses_avail[self.index_courses[i] + 1]
            self.index_courses[i] = self.index_courses[i + 1] + 1
            self.current_courses[i] = self.courses_avail[self.index_courses[i]]
    
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
        self.can_make_schedule = False
        
        if self.min_credit_hours <= sum([n.credits for n in self.courses_avail]) and min([True] + [(i in self.courses_avail) for i in self.required_courses]):
            self.can_make_schedule = True
            for index in range(len(self.required_courses)):
                old_index = self.courses_avail.index(self.required_courses[index])
                self.courses_avail[index], self.courses_avail[old_index] = self.courses_avail[old_index], self.courses_avail[index]
            

        if self.can_make_schedule:
            for course in self.courses_avail:
                if course.check_if_coreq_available():
                    self.coreqs_duo.append([course, course.coOf[0]])
                    self.coreqs_index.append(-1)
            # if len(self.coreqs_duo):
            self.coreqs_num_total = len(self.coreqs_duo)
            if not self.courses_num: 
                self.courses_num = 1
            for i in range(self.courses_num - 1, -1,-1):
                self.index_courses.append(i)
                self.current_courses.append(self.courses_avail[i])
        else:
            self.current_courses = []

        return self.get_courses_to_update()

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
    

    