
import config
import pymongo

from models import Course

class DataManager:

	def __init__(self):
		print('Connecting to database...')
		client = pymongo.MongoClient(config.mongo_url, config.mongo_port)
		self.db = client['CS3354_Project_Group4']
		
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
