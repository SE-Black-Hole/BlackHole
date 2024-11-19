# Author: Mixue Bao
# Description: Runs test case 1

from data_manager import DataManager

dm = DataManager()

print('----------------------')
print('Test Case #1: Get All Classes from Database')
print('----------------------')
print(dm.get_all_classes_for_major("CS"))
