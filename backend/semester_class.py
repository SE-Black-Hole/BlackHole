# Author: Ian Victor Xavier

class Semester:
    semester_names = ["Fall", 'Spring', 'Summer']
    index = 0
    year = 2024
    def  __init__(self, credit_hours=15, max_credit_hours=19, req_by_user=[],locked=False):
        self.max_credit_hours = max_credit_hours
        self.req_by_user = req_by_user
        self.courses_avail = []
        self.courses_taken = []
        self.locked = locked
        self.semester_name = Semester.semester_names[Semester.index] + " " + str(Semester.year)
        Semester.index = (Semester.index + 1) % 3
        if Semester.index == 1: Semester.year += 1
        self.credit_hours = credit_hours if "Summer" not in self.semester_name else 0

    def set_courses_avail(self, courses_avail):
        self.courses_avail = list(courses_avail)
        
    def add_nodes(self, nodes):
        to_update = []
        for node in nodes:    
            self.courses.append(node)
            to_update += node.take_drop()
        return to_update

    def remove_nodes(self, nodes):
        to_update = []
        for node in nodes:
            self.courses.remove(node)
            to_update += node.take_drop()

        return to_update

    def add_required_courses(self,nodes):
        self.req_by_user += nodes
    
    def remove_required_courses(self,nodes):
        for node in nodes:
            self.req_by_user.remove(node)

# semester = Semester()
    

    