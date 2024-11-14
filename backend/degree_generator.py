from semester_class import Semester
from math import ceil
from sys import maxsize

class Generator(object):

    def __init__(self, poset):
         #userReqCourses is an array of arrays within each is 'index of semester, [array of classes] 

        self.semesters = []
        self.poset = poset
        self.major_electives_credits = 12
        self.time_to_graduate = 1
        # self.create_semesters(self.time_to_graduate)
        self.total_credits = sum([node.credits for node in self.poset.requiredByDegree])
        self.total_credits_left = self.total_credits
        self.average_credits = 0

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
    
    def generate_shortest_plans(self):
        plans = ["HELLOOOOOOO!"]

        while not len(plans) and self.time_required < 30:
            plans = self.generate()
            self.time_to_graduate += 1

        if self.required > 29:
            return []
        
        self.average_credits = self.total_credits_left / self.time_to_graduate
    
        return plans

    def get_smallest_deviation_plan(self):
        plan = []
        plans = self.generate_shortest_plans()
        if not len(plans):
            return plan
        
        deviation = maxsize
        for p in plans:
            deviation_plan = self.get_deviation(plan)
            if deviation_plan < deviation:
                deviation  = deviation_plan
                plan = p

        return plan


    def get_deviation(self, plan):
        return sum([abs(semester.current_credit_hours - self.average_credits) for semester in plan])
        
    def create_semesters(self,time_to_graduate):
        # for past_semester in classes_taken_per_semester: # courses should have required_by_user set to True
        #     self.semesters.append(Semester(req_by_user=past_semester,locked=True))

        for i in range(time_to_graduate):
            self.semesters.append(Semester())
   
    def append_semester(self):
        self.semesters.append(Semester)

    def update_poset(self, classes_taken):
        to_update = []
        classes_taken_sorted = sorted(classes_taken, key= lambda course : course.semesters_required)
        for course in classes_taken_sorted:
            to_update += course.take_drop()
            self.total_credits_left -= course.credits()

        self.poset.update_semesters_required(to_update)

        self.time_to_graduate = ceil(self.poset.courses_by_time[-3]/2)

    def get_new_empty_lists_per_semester(self):
        return [[] for i in self.semesters]
        