# Author: Mixue Bao
# Description: Connect to database (MongoDB) and fetch data

import config
import pymongo
import ssl

from models import Course, Student

class DataManager:

	def __init__(self):
		print('Connecting to database...')
		client = pymongo.MongoClient(config.mongo_url, config.mongo_port, tls=True, tlsAllowInvalidCertificates=True)
		self.db = client[config.db_name]
		
		self.db.students.create_index([("username", pymongo.ASCENDING)], unique=True)
		
	def get_all_classes(self):
		results = []
		for document in self.db.classes.find():
			results.append(Course(**document))
		return results
		
	def get_all_classes_for_major(self, major):
		results = []
		for document in self.db.classes.find({'major' : major}):
			results.append(Course(**document))
		return results
		
	def get_class(self, classNumber):
		return Course(**self.db.classes.find_one({'classNumber' : classNumber}))

	def create_student(self, student):
		self.db.students.insert_one(student.dict())
		
	def update_student(self, student):
		self.db.students.update_one({'username' : student.username}, {"$set": student.dict()})
		
	def get_student(self, username, password):
		return Student(**self.db.students.find_one({'username' : username, 'password' : password}))
		