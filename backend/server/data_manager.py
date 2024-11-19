# Author: Mixue Bao
# Description: Connect to database (MongoDB) and fetch data
import pymongo
from pymongo import MongoClient
from typing import List, Dict
import ssl
from models import Course, Student  
import config  

class DataManager:
    def __init__(self):
        print('Connecting to database...')
        client = MongoClient(config.mongo_url, config.mongo_port, tls=True, tlsAllowInvalidCertificates=True)
        self.db = client[config.db_name]
        students_collection = self.db['CS3354_Project_Group4.students']  

        
        self.db.students.create_index([("username", pymongo.ASCENDING)], unique=True)
        print('Connection successful!')
        
    def get_all_classes(self):
        return [Course(**document).dict() for document in self.db.classes.find()]
        
    def get_all_classes_for_major(self, major: str):
        major = "CS"
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
    def get_courses_completed_by_username(self) -> List[str]:
        username = "DegreePlanner1"
        result = self.db.students.find_one({"username": username})
    
        if result:
            return result.get("coursesCompleted", [])
        else:
            print("Student not found")
            return []
    
    def get_courses_remaining_by_username(self) -> List[str]:
        username = "DegreePlanner1"
        result = self.db.students.find_one({"username": username})
    
        if result:
            return result.get("coursesRemaining", [])
        else:
            print("Student not found")
            return []


    
        
