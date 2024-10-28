
class Poset(object):
    def __init__(self, required, electives, core):
        self.requiredByDegree = required
        self.electives = electives
        self.core = core


class Node(object):
    
    def __init__(self, classNumber = "", credits = 0):
        self.classNumber = classNumber
        self.credits = credits
        self.pre = []
        # self.co = []
        self.credits_required = 0
        self.isMajorElective = False
