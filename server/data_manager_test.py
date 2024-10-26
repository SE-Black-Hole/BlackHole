
from data_manager import DataManager

dm = DataManager()

print('----------------------')
print('Get all classes')
print('----------------------')
print(dm.get_all_classes())

print('\n----------------------')
print('Get single class')
print('----------------------')
print(dm.get_class('CS3345'))