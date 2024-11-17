# Author: Mixue Bao
# Description: Runs use case 1

from data_manager import DataManager
from models import Student, DegreePlan

dm = DataManager()


# change the username here for each new test since it must be unique each time
username = "DegreePlanner1"
password = "1"


completed_courses = dm.get_completed_courses(username)

if isinstance(completed_courses, list):
    if completed_courses:
        print(f"Completed Courses for {username}:")
        for course in completed_courses:
            print(f"- {course['classNumber']}: {course['className']} ({course['creditHours']} credit hours)")
    else:
        print(f"No completed courses found for {username}.")
elif isinstance(completed_courses, tuple) and completed_courses[1] == 404:
    print(completed_courses[0]) 
else:
    print("An unexpected error occurred.")

print('\n----------------------')
print('Get student from database')
print('----------------------')

student = dm.get_student(username, password)
print(str(student))

print('\n----------------------')
print('Update student in database')
print('----------------------')

student.degreePlans.append(DegreePlan(courses=['CS3354', 'CS4337'], currentPlan=True, major='CS'))
dm.update_student(student)
print(str(student))
