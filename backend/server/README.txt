There are two test cases for the database under the \server directory:
	- mixue_bao_test_case_1.py - used to run the test case for fetching all classes from MongoDB database
	- mixue_bao_test_case_2.py - used to run the test case to fetch a single class from the MongoDB database with filter
	
Running these test cases will connect to the database, execute the query, and print the results.

Steps to run test cases:
- open up the command line / Powershell
- Python must be installed
- install python packages by typing in "pip install -r requirements.txt" in command line
- to run Test Case 1, type in "python mixue_bao_test_case_1.py" in command line
- to run Test Case 2, type in "python mixue_bao_test_case_2.py" in command line
- will need to wait a few seconds to connect to database in each test case