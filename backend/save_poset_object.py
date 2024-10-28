import pickle
from poset import Poset, Node
import sys

# Adding server folder to paths in sys
# it has to be the absolute path so adjust the path as needed
sys.path.insert(1, 'C:\\Users\\ianvi\\Documents\\GitHub\\BlackHole\\server') 

from data_manager import DataManager

dm = DataManager()

# print('----------------------')
# print('Get all classes')
# print('----------------------')
# print(dm.get_all_classes())

# print('\n----------------------')
# print('Get single class')
# print('----------------------')
# print(dm.get_class('CS3345'))
requiredByDegree = []
electives = []
core = []
classes = dm.get_all_classes()

def makeRetrieveNode(c):
    for node2 in requiredByDegree:
        if node.classNumber == c.classNumber:
            return node2, True

    for node2 in electives:
        if node.classNumber == c.classNumber:
            return node2, True
    
    
    return Node(c.classNumber, int(c.classNumber[-3])), False

for c in classes:
    node, retrieved = makeRetrieveNode(c)
    
    
    node.pre = [makeRetrieveNode(c2) for c2 in c.prerequisites]
    if c.isMajorElective:
        node.isMajorElective = True  
        node.credits_required = 100
        if retrieved:
            electives.append(node)
    elif not retrieved:
        requiredByDegree.append(node)

with open("classObjects_data.pkl", 'wb') as outp:
    pickle.dump(Poset(requiredByDegree, electives, core), outp, pickle.HIGHEST_PROTOCOL)

    