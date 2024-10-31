# Author: Mixue Bao
# Description: Runs use case 1

from data_manager import DataManager

dm = DataManager()

print('----------------------')
print('Use Case #1: Get All Classes from Database')
print('----------------------')
print(dm.get_all_classes())
