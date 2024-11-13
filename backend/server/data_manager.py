# Author: Mixue Bao
# Description: Connect to database (MongoDB) and fetch data

import pymongo
from pymongo import MongoClient
from typing import List, Dict
import ssl
from models import Course, Student  # Assuming these are defined elsewhere
import config  # Assuming this contains mongo_url, mongo_port, and db_name

class DataManager:
    def __init__(self):
        print('Connecting to database...')
        client = MongoClient(config.mongo_url, config.mongo_port, tls=True, tlsAllowInvalidCertificates=True)
        self.db = client[config.db_name]
        
        # Ensure unique index on the username field
        self.db.students.create_index([("username", pymongo.ASCENDING)], unique=True)
        print('Connection successful!')
        
    def get_all_classes(self):
        return [Course(**document) for document in self.db.classes.find()]
        
    def get_all_classes_for_major(self, major):
        return [Course(**document) for document in self.db.classes.find({'major': major})]
        
    def get_class(self, classNumber):
        document = self.db.classes.find_one({'classNumber': classNumber})
        return Course(**document) if document else None

    def create_student(self, student: Student):
        self.db.students.insert_one(student.dict())
        
    def update_student(self, student: Student):
        self.db.students.update_one({'username': student.username}, {"$set": student.dict()})
        
    def get_student(self, username: str, password: str):
        document = self.db.students.find_one({'username': username, 'password': password})
        return Student(**document) if document else None
    
    def update_student_courses(self, username: str, completed_courses: List[str], remaining_courses: List[str]):
        result = self.db.students.update_one(
            {"username": username},
            {"$set": {
                "coursesCompleted": completed_courses,
                "coursesRemaining": remaining_courses
            }},
            upsert=True
        )
    def get_completed_courses(self, username: str) -> list:

        # Fetch student by username
        student = self.db.students.find_one({"username": username})
    
        if not student:
        # Return an error if student not found
            return {"error": "Student not found"}, 404

    # Use the correct field names from the Student model
        completed_courses = student.get('coursesCompleted', [])
        all_courses = student.get('coursesRemaining', [])  # Assuming this field contains all course details

        if not completed_courses:
            print(f"No completed courses found for {username}.")
            return []

        if not all_courses:
            print(f"No courses found in the student's record for {username}.")
            return []

    # Fetch details of only completed courses
        completed_courses_details = [
            course for course in all_courses if course['classNumber'] in completed_courses
        ]

    # Debug statements to check values
        print(f"Completed Courses for {username}: {completed_courses}")

        return completed_courses_details

    
        
        return result.modified_count  # Return the number of modified documents to confirm success
