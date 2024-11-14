from semester_class import Semester
from math import ceil
from sys import maxsize

class Generator(object):

    def __init__(self, poset, time_required=1):
         #userReqCourses is an array of arrays within each is 'index of semester, [array of classes] 

        self.semesters = []
        self.poset = poset
        self.major_electives_credits = 12
        self.time_required = time_required
        # self.create_semesters(self.time_to_graduate)
        self.total_credits = sum([node.credits for node in self.poset.requiredByDegree])
        self.total_credits_left = self.total_credits
        self.average_credits = 0
        self.create_semesters(self.time_required)

    def generate(self):
        # print("HELLLOOOO")
        plans = [self.get_new_empty_lists_per_semester()]

        if not len(self.semesters):
            return []
        
        self.poset.update_semesters_required(self.semesters[0].set_courses_avail(self.poset.courses_by_time[0]))
        plans[0][0] = self.semesters[0].get_current_courses()

        if len(self.semesters) == 1:
            self.poset.update_semesters_required(self.semesters[0].create_schedule())
            if self.get_credits(plans[0]) == self.poset.total_credits:
                return plans
            else:
                return []
            
        semester_index = 0
        while self.semesters[0].can_make_schedule:
            courses_to_update = []
            if semester_index < len(self.semesters) - 1 and self.semesters[semester_index].can_make_schedule:
                semester_index += 1
                courses_to_update = self.semesters[semester_index].set_courses_avail(self.poset.courses_by_time[0])
            else:
                semester_index -= 1
                courses_to_update = self.semesters[semester_index].create_schedule()
            string = ""
            for i in courses_to_update:
                string += str(i)
            self.poset.update_semesters_required(courses_to_update)
            # print(self.poset)
            if self.semesters[semester_index].can_make_schedule:
                plans[-1][semester_index] = self.semesters[semester_index].get_current_courses()    
                if semester_index == len(self.semesters) - 1:
                    plans.append(self.get_new_empty_lists_per_semester())
                    semester_index += 1
        
        if self.get_credits(plans[0]) == self.poset.total_credits:
            del plans[-1]
            return plans
        else:
            return []
    
    def get_credits(self, plan):
        credits = 0
        # print(plan)
        for i in plan:
            for j in i:
                credits += int(j[-3])
        
        # print(len(plan), credits)
        return credits
    def generate_shortest_plans(self):
        plans = []

        while not len(plans) and self.time_required < 5:
            # print(self.poset)
            plans = self.generate()
            
            if not len(plans):
                self.time_required += 1
                self.append_semester()
                # self.poset.create_separate_courses_by_time()
            

        if self.time_required > 5:
            return []
        
        self.average_credits = self.total_credits_left / self.time_required
    
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
        
    def create_semesters(self,time_required):
        # for past_semester in classes_taken_per_semester: # courses should have required_by_user set to True
        #     self.semesters.append(Semester(req_by_user=past_semester,locked=True))
        self.semesters = []
        for i in range(time_required):
            self.semesters.append(Semester())
        
   
    def append_semester(self):
        self.semesters.append(Semester())

    def update_poset(self, classes_taken):
        to_update = []
        classes_taken_sorted = sorted(classes_taken, key= lambda course : course.semesters_required)
        for course in classes_taken_sorted:
            to_update += course.take_drop()
            self.total_credits_left -= course.credits

        str_to_update = []
        for i in to_update:
            str_to_update.append(i.classNumber)
        print(str_to_update)
        self.poset.update_semesters_required(to_update)

        self.time_to_graduate = ceil(self.poset.courses_by_time[-3][0].semesters_required/2)
        self.create_semesters(self.time_required)

    def get_new_empty_lists_per_semester(self):
        return [[] for i in self.semesters]
        