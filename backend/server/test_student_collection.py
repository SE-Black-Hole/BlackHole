# Author: Mixue Bao
# Description: Runs use case 1

from data_manager import DataManager
from models import Student

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

