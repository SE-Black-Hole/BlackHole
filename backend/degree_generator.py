from semester_class import Semester

class generator(object):

    def __init__(self, poset, major_electives_credits, time_to_graduate, classes_taken_per_semester, userReqCourses):
         #userReqCourses is an array of arrays within each is 'index of semester, [array of classes] 

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
        for past_semester in classes_taken_per_semester: # courses should have required_by_user set to True
            self.semesters.append(Semester(req_by_user=past_semester,locked=True))

        for i in range(time_to_graduate):
            self.semester.append(Semester())

        for wished_by_user in userReqCourses:
            self.semesters[wished_by_user[0]].add_required_courses(wished_by_user[1])
        