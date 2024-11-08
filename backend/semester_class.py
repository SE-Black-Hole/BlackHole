# Author: Ian Victor Xavier

class Semester:
    semester_names = ["Fall", 'Spring', 'Summer']
    index = 0
    year = 2024
    def  __init__(self, min_credit_hours=15, max_credit_hours=19, req_by_user=[],locked=False, skip_semester=False):
        self.max_credit_hours = max_credit_hours
        self.req_by_user = req_by_user
        self.courses_avail = []
        self.current_courses = []
        self.locked = locked
        self.current_credit_hours = 0
        self.min_credit_hours = min_credit_hours
        self.skip_semester = skip_semester
        self.can_return_this_size = False
        self.index_courses = []
        self.can_make_schedule = True
        self.courses_num = int(self.min_credit_hours/3)
        
        

        self.semester_name = Semester.semester_names[Semester.index] + " " + str(Semester.year)
        Semester.index = (Semester.index + 1) % 3
        if Semester.index == 1: Semester.year += 1

    def create_schedule(self):
 
        courses_to_update = []
        
        while not self.locked and self.can_make_schedule: # TODO check if courses_to_update is empty after can mmake schedule is false
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
                
                if self.current_credit_hours > self.min_credit_hours:
                        if self.current_credit_hours < self.max_credit_hours:
                            self.can_return_this_size = True                        
                            return self.can_make_schedule, courses_to_update
                    
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
                if self.current_credit_hours > self.min_credit_hours:
                    if self.current_credit_hours < self.max_credit_hours:
                        self.can_return_this_size = True                        
                        return self.can_make_schedule, courses_to_update
            else:
                self.can_make_schedule = False


        return self.can_make_schedule, courses_to_update

    def get_courses_to_update():
        pass

    def set_courses_avail(self, courses_avail): # TODO make it use the method above and check for sum_all_classes > min
        self.courses_avail = list(courses_avail)
        courses_to_update = []
        if self.courses_num <= len(self.courses_avail):
            self.index_courses = [i for i in range(self.courses_num, -1, -1)]
            self.current_courses = [self.courses_avail[i] for i in range(self.courses_num)]
            for course in self.current_courses:
                courses_to_update += course.take_drop()
            self.current_credit_hours = sum([node.credits for node in self.current_courses])
        else:
            self.can_make_schedule = False
        return self.can_make_schedule, courses_to_update
        
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
    

    