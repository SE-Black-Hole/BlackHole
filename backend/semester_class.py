# Author: Ian Victor Xavier
       
         
class Semester:
    semester_names = ["Fall", 'Spring', 'Summer']
    
    def  __init__(self, credit_hours=15, max_credit_hours=19, coursesUser=[]):
        self.credit_hours = credit_hours
        self.max_credit_hours = max_credit_hours
        self.coursesUser = coursesUser
        self.courses = []

    def add_node(self, node):
        
        for preOf in node.preOf:
            preOf.semesters_required -= 1

        node.used = True

        self.courses.append(node)

    def remove_node(self, node):
        
        for preOf in node.preOf:
            preOf.semesters_required += 1

        node.used = False

        self.courses.remove(node)

    

    