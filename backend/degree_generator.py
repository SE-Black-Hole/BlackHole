from semester_class import Semester

class generator(object):

    def __init__(self, time_to_graduate, poset, major_electives_credits):

        self.semesters = [Semester() for i in range(time_to_graduate*3)]
        