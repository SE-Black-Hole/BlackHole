from semester_class import Semester

class Generator(object):

    def __init__(self, poset, major_electives_credits, time_to_graduate, classes_taken_per_semester, userReqCourses):
         #userReqCourses is an array of arrays within each is 'index of semester, [array of classes] 

        self.semesters = []
        self.poset = poset
        self.major_electives_credits = major_electives_credits
        self.create_semesters(time_to_graduate, classes_taken_per_semester,userReqCourses)
        self.userReqCourses = userReqCourses

    def generate(self):
        plans = [self.get_new_empty_lists_per_semester()]
        if not len(self.semesters):
            return plans
        self.poset.update_semesters_required(self.semesters[0].set_courses_avail(self.poset.courses_by_time[0]))
        plans[0][0] = self.semesters[0].get_current_courses()
        semester_index = 0
        while self.semesters[0].can_make_schedule:
            courses_to_update = []
            if self.semesters[semester_index].can_make_schedule and semester_index < len(self.semesters) - 1:
                semester_index += 1
                courses_to_update = self.semesters[semester_index].set_courses_avail(self.poset.courses_by_time[0])
            else:
                semester_index -= 1
                courses_to_update = self.semesters[semester_index].create_schedule()
            self.poset.update_semesters_required(courses_to_update)
            if self.semesters[semester_index].can_make_schedule:
                plans[-1][semester_index] = self.semesters[semester_index].get_current_courses()    
                if semester_index == len(self.semesters) - 1:
                    plans.append(self.get_new_empty_lists_per_semester())
        del plans[-1]
        return plans
    def create_semesters(self,time_to_graduate, classes_taken_per_semester,userReqCourses):
        for past_semester in classes_taken_per_semester: # courses should have required_by_user set to True
            self.semesters.append(Semester(req_by_user=past_semester,locked=True))

        for i in range(time_to_graduate):
            self.semesters.append(Semester())

        for wished_by_user in userReqCourses:
            self.semesters[wished_by_user[0]].add_required_courses(wished_by_user[1])
   
    def get_new_empty_lists_per_semester(self):
        return [[] for i in self.semesters]
        