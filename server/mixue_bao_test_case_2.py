# Author: Mixue Bao
# Description: Runs test case 2

from data_manager import DataManager

dm = DataManager()

print('\n----------------------')
print('Test Case #2: Get a Single Class from Database with Filter')
print('----------------------')
course = dm.get_class('CS3345')
print(course)
