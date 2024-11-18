from semester_class import Semester
from math import ceil
from sys import maxsize

class Generator(object):

    def __init__(self, poset, time_required=0):
         #userReqCourses is an array of arrays within each is 'index of semester, [array of classes] 

        self.semesters = []
        self.poset = poset
        self.major_electives_credits = 12
        self.time_required = time_required
        # self.create_semesters(self.time_to_graduate)
        self.total_credits = self.poset.get_total_credits()
        self.total_credits_left = self.total_credits
        self.average_credits = 0
        self.create_semesters(self.time_required)
        self.credits_per_semester = []

    def generate(self):
        # print("HELLLOOOO")
        plans = []
        self.credits_per_plan_per_semester = []
        plan = self.get_new_list()
        if not len(self.semesters):
            return []
        
        self.semesters[0].set_courses_avail([])
        semester_index = 0
        while self.semesters[0].can_make_schedule or not len(self.semesters[0].courses_avail):
            courses_to_update = []
            # print(self.semesters[semester_index].get_courses_avail())
            if not self.semesters[semester_index].can_make_schedule:
                courses_to_update = self.semesters[semester_index].set_courses_avail(self.poset.courses_by_time[0])
                plan[semester_index] = self.semesters[semester_index].get_current_courses()   
                if not self.semesters[semester_index].can_make_schedule: semester_index -= 1
                elif semester_index < len(self.semesters) - 1 : semester_index += 1
                # elif self.semesters[semester_index].can_make_schedule: semester_index -= 1
            else:
                courses_to_update = self.semesters[semester_index].create_schedule()
                plan[semester_index] = self.semesters[semester_index].get_current_courses()    
                if not self.semesters[semester_index].can_make_schedule: semester_index -= 1
                elif semester_index < len(self.semesters) - 1: semester_index += 1
                
            self.poset.update_semesters_required(courses_to_update)
            # print("all classes by time:", self.poset.get_str_courses_by_time())
            # print(plan)
            # print(self.semesters[1].get_courses_avail())
            # print(semester_index == len(self.semesters) - 1 , self.semesters[semester_index].can_make_schedule , self.get_credits() == self.total_credits_left)
            # print(self.get_credits(),self.total_credits_left)
            # print()
            if semester_index == len(self.semesters) - 1 and self.semesters[semester_index].can_make_schedule and self.get_credits() == self.total_credits_left:
                plans.append(plan)
                self.credits_per_plan_per_semester.append([semester.current_credit_hours for semester in self.semesters])
                plan = self.get_new_list()
        
        # print(plans)
        return plans
    
    def get_credits(self):
        credits = 0
        
        for semester in self.semesters:
            credits += semester.get_credits()
        
        # print(len(plan), credits)
        return credits
    
    def get_credits_per_semester(self):
        credits = []
        
        for semester in self.semesters:
            credits.append(semester.get_credits())
        
        # print(len(plan), credits)
        return credits
    
    def generate_shortest_plans(self):
        plans = []

        while not len(plans) and self.time_required < 11:
            # print(self.poset)
            plans = self.generate()
            # print('hello')
            if not len(plans):
                self.append_semester()
                # self.poset.create_separate_courses_by_time()
            

        if self.time_required > 10:
            print("Error: reached timeout")
            return []
        
        self.average_credits = ceil(self.total_credits_left / self.time_required)
    
        return plans

    def get_smallest_deviation_plan(self):
        plan = []
        plans = self.generate_shortest_plans()
        if not len(plans):
            return plan
        
        deviation = maxsize
        for i in range(len(plans)):
            deviation_plan = self.get_deviation(self.credits_per_plan_per_semester[i])
            if deviation_plan < deviation:
                deviation  = deviation_plan
                plan = plans[i]

        return plan


    def get_deviation(self, credits_per_semester):
        return sum([abs(credits - self.average_credits) for credits in credits_per_semester])
        
    def create_semesters(self,time_required):
        # for past_semester in classes_taken_per_semester: # courses should have required_by_user set to True
        #     self.semesters.append(Semester(req_by_user=past_semester,locked=True))
        self.time_required = time_required
        self.semesters = []
        for i in range(time_required):
            self.semesters.append(Semester())
        
   
    def append_semester(self, min=0, max=16):
        self.semesters.append(Semester(min,max))
        self.time_required += 1

    def update_poset(self, classes_taken):
        to_update = []
        if not len(classes_taken):
            return
        # print('HahahahahaHAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        classes_taken_sorted = sorted(classes_taken, key= lambda course : course.semesters_required)
        for course in classes_taken_sorted:
            to_update += course.take_drop()
            self.total_credits_left -= course.credits

        str_to_update = []
        for i in to_update:
            str_to_update.append(i.classNumber)
        # print(str_to_update)
        self.poset.update_semesters_required(to_update)
        # print(self.poset.get_str_courses_by_time())
        # print(self.poset)
        # for i in range(len(self.poset.courses_by_time) - 3, -1,-1):
        #     if len(self.poset.courses_by_time[i]):
        #         self.time_to_graduate = ceil(self.poset.courses_by_time[i][0].semesters_required/2)
        #         break
        # print("time:", self.time_required)
        self.create_semesters(self.time_required)

    def get_quick_low_deviation_plan(self,max=16):
        # print(self.poset.get_str_courses_by_time())
        while len(self.poset.courses_by_time[0]):
            # print(self.poset.get_str_courses_by_time())
            self.append_semester(max=max)
            self.poset.courses_by_time[0] = sorted(self.poset.courses_by_time[0], key= lambda course : course.height)
            # print(self.poset.courses_by_time[0][-1].preOf[0] == self.poset.courses_by_time[1][-1])
            # print(self.poset.get_str_courses_by_time())
            self.poset.update_semesters_required(self.semesters[-1].setup_quick_schedule(self.poset.courses_by_time[0]))
            # print("ha")
            # print(self.poset.get_str_courses_by_time())
        # print("AHOHAHAOAHAOH")
        # print(self.poset.get_str_courses_by_time())
        # print(self.poset.get_str_courses_by_time())
        plan = []
        print(self.get_credits_per_semester())
        for i in self.semesters:
            plan.append(i.get_current_courses())
        print(plan)
        for i in range(len(self.semesters) - 1): # it does not check for all free credit hours like 3,2,1. It just picks the last in the list
            while self.semesters[i].can_move_courses:
                # print("Trying to move a course")
                least_credits = self.semesters[i + 1].current_credit_hours
                semester = self.semesters[i + 1]
                for j in self.semesters[i + 2:]:
                    if j.current_credit_hours < least_credits:
                        least_credits = j.current_credit_hours
                        semester = j

                credits = self.semesters[i].current_courses[-1].credits
                # print(semester.current_credit_hours + credits <= semester.max_credit_hours, self.semesters[i].current_credit_hours, 
                # abs(self.semesters[i].current_credit_hours - semester.current_credit_hours),
                # abs(self.semesters[i].current_credit_hours - 2*credits - semester.current_credit_hours))
                if semester.current_credit_hours + credits <= semester.max_credit_hours and \
                abs(self.semesters[i].current_credit_hours - semester.current_credit_hours) > \
                abs(self.semesters[i].current_credit_hours - 2*credits - semester.current_credit_hours):
                    semester.add_taken_course(self.semesters[i].current_courses[-1])
                    # print(self.semesters[i].get_current_courses())
                    self.semesters[i].remove_taken_course(self.semesters[i].current_courses[-1])
                else:
                    break

        print(self.get_credits_per_semester())
        plan = []
        for i in self.semesters:
            plan.append(i.get_current_courses())
        # print(plan)
        return plan


    def get_new_list(self):
        plan = []
        for semester in self.semesters:
            plan.append(semester.get_current_courses())
        return plan
        