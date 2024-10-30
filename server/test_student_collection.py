# Author: Mixue Bao
# Description: Runs use case 1

from data_manager import DataManager
from models import Student

dm = DataManager()

print('\n----------------------')
print('Create student in database')
print('----------------------')

# change the username here for each new test since it must be unique each time
username = "mixue_bao5"
password = "abc123"

student = Student(username=username, password=password)
dm.create_student(student)
print('created successfully')

print('\n----------------------')
print('Get student from database')
print('----------------------')

student = dm.get_student(username, password)
print(str(student))

print('\n----------------------')
print('Update student in database')
print('----------------------')

student.coursesCompleted.append('CS3337')
dm.update_student(student)
print(str(student))


