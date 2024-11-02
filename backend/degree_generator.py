from semester_class import Semester

class generator(object):

    def __init__(self, poset, major_electives_credits, time_to_graduate, classes_taken_per_semester, userReqCourses):

        self.semesters = []
        self.poset = poset
        self.major_electives_credits = major_electives_credits
        self.create_semesters(time_to_graduate, classes_taken_per_semester,userReqCourses)
        self.userReqCourses = userReqCourses

    def generate(self):
        plans = []
        self.semesters[0].set_courses_avail(list(self.poset.courses_by_time[0]))
        # while

        return plans
    def create_semesters(self,time_to_graduate, classes_taken_per_semester,userReqCourses):
        pass
        