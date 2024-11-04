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
        
        self.index_courses = []
        self.can_make_schedule = True
        self.courses_num = int(self.min_credit_hours/3)
        
        

        self.semester_name = Semester.semester_names[Semester.index] + " " + str(Semester.year)
        Semester.index = (Semester.index + 1) % 3
        if Semester.index == 1: Semester.year += 1

    def create_valid_schedule(self):
 
        courses_to_update = []
        
        while self.locked or not self.can_make_schedule:
            for i in range(len(self.index_courses)): 

                if len(self.courses_avail) - (i + 1) - self.index_courses[i] > 0:
                    courses_to_update += self.current_courses[i].take_drop()
                    self.current_credit_hours += self.current_courses[i] - self.courses_avail[self.index_courses[i] + 1]
                    self.index_courses[i] += 1
                    self.current_courses[i] = self.courses_avail[self.index_courses[i]]
                    courses_to_update += self.current_courses[i].take_drop() 
                    return self.can_make_schedule, courses_to_update
                elif i < len(self.index_courses) - 1:
                    courses_to_update += self.current_courses[i].take_drop()
                    self.current_credit_hours += self.current_courses[i] - self.courses_avail[self.index_courses[i] + 1]
                    self.index_courses[i] = self.index_courses[i + 1] + 1
                    self.current_courses[i] = self.courses_avail[self.index_courses[i]]
                    courses_to_update += self.current_courses[i].take_drop() 
                else: # TODO take_trop previous courses
                    self.courses_num += 1
                    if self.courses_num <= len(self.courses_avail):
                        self.index_courses = [i for i in range(self.courses_num, -1, -1)]
                        self.current_courses = [self.courses_avail[i] for i in range(self.courses_num)]
                        for course in self.current_courses:
                            courses_to_update += course.take_drop()
                        self.current_credit_hours = sum([node.credits for node in self.current_courses])
                    else:
                        self.can_make_schedule = False
                    return courses_to_update


        return self.can_make_schedule, courses_to_update

    def get_courses_to_update():
        pass

    def set_courses_avail(self, courses_avail):
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
        return courses_to_update
        
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
    

    