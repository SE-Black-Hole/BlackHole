#author: Rithwik
#description: saving Poset object for faster access and performance

import pickle
from poset import Poset, Node
import sys

# Adding server folder to paths in sys
# it has to be the absolute path so adjust the path as needed
sys.path.insert(1, 'C:\\Users\\ianvi\\Documents\\GitHub\\BlackHole\\server') 

from data_manager import DataManager

dm = DataManager()
requiredByDegree = []
electives = []
core = []
temps = []
classes = dm.get_all_classes()
# print(type(dm.get_all_classes()[0]))

def makeRetrieveNode(c):
    classNumber = None

    if type(c) == str:
        classNumber = c
    else:
        classNumber = c.classNumber
        # if classNumber == "CS2336":
        #     print(c)
        if c.major == 'Core_Classes' :
            return Node(classNumber), False, True

    # if classNumber == "CS2336":
    #         print(str(c) + " helloooo")
    for node in requiredByDegree:
        if node.classNumber == classNumber:
            # if classNumber == "CS2336":
            #     print(c + " wow")
            return node, True, False

    for node in electives:
        if node.classNumber == classNumber:
            return node, True, False
        
    for node in temps:
        if node.classNumber == classNumber:
            return node, False, False
    
    temps.append(Node(classNumber))

    return temps[-1], False, False

for c in classes:
    node, retrieved, isCore = makeRetrieveNode(c)
    # print(node)
    if isCore:
        core.append(node)
        continue

    node.pre = [makeRetrieveNode(c2)[0] for c2 in c.prerequisites + c.corequisites]
    node.co = [makeRetrieveNode(c2)[0] for c2 in c.corequisites]
    for n2 in node.pre:
        # print(n2)
        n2.preOf.append(node)
        node.set_semesters_required(n2.semesters_required  + 1)
    for n2 in node.co:
        n2.coOf.append(node)
    if c.isMajorElective:
        node.isMajorElective = True 
        if not retrieved:
            electives.append(node)
    elif not retrieved:
        requiredByDegree.append(node)



with open("classObjects_data.pkl", 'wb') as outp:
    pickle.dump(Poset(requiredByDegree, electives, core), outp, pickle.HIGHEST_PROTOCOL)

with open("classObjects_data.pkl", 'rb') as inp:
    poset = pickle.load(inp)
    print(poset)
    # prin
    # print(poset.fetch("CS3377"))
    # print(poset.fetch("CS2336"))
    # print(poset.fetch("CS3377").pre[0] == poset.fetch("CS2336"))
    # print("HELLOOOOOO")
    # node = None
    # for n in poset.
    