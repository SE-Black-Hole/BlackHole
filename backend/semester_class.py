# Author: Ian Victor Xavier

class Semester:
    semester_names = ["Fall", 'Spring', 'Summer']
    index = 0
    year = 2024
    def  __init__(self, credit_hours=15, max_credit_hours=19, coursesUser=[]):
        self.max_credit_hours = max_credit_hours
        self.coursesUser = coursesUser
        self.courses_avail = []
        self.courses_taken = []

        self.semester_name = Semester.semester_names[Semester.index] + " " + str(Semester.year)
        Semester.index = (Semester.index + 1) % 3
        if Semester.index == 1: Semester.year += 1
        self.credit_hours = credit_hours if "Summer" not in self.semester_name else 0

    def set_courses_avail(self, courses_avail):
        self.courses_avail = courses_avail
        
    def add_node(self, node):
        
        self.courses.append(node)

    def remove_node(self, node):

        self.courses.remove(node)

semester = Semester()
    

    