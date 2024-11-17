# Automatic Degree Planner

A React-based application for managing and tracking degree progress, featuring course management and degree planning capabilities.

## Setup and Running Instructions

### Prerequisites
- Node.js (latest stable version)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blackhole
```



2. Install dependencies:
```bash
npm install
pip install python3
pip install -r requirements.txt
```

3. Start the development server:
```bash
npm run start
```

The application will open in your default browser at `http://localhost:3000`

### Login Credentials
- Username: DegreePlanner1
- Password: 2




## Test Cases

# Backend Test Cases
- **Description**: Total: 17 Test Cases
- **Test Steps**:
1. Run the test_cases.py file.
   ```bash
cd backend
```
```bash
python test_cases.py
```
2. Expected Output: Python will output a message like:
```bash
Ran 17 tests in *seconds*
OK
```
3. Check the function definitions in test_cases.py for details about each specific test case.

# Database Test Cases 
There are two test cases for the database under the \server directory:
	- mixue_bao_test_case_1.py - used to run the test case for fetching all classes from MongoDB database
	- mixue_bao_test_case_2.py - used to run the test case to fetch a single class from the MongoDB database with filter
	
Running these test cases will connect to the database, execute the query, and print the results.

- **Test Steps**:
1. to run Test Case 1, type in "python mixue_bao_test_case_1.py" in command line
```bash
cd server
```
```bash
python  mixue_bao_test_case_1.py
```
2. to run Test Case 2, type in "python mixue_bao_test_case_2.py" in command line
```bash
cd server
```
```bash
python mixue_bao_test_case_2.py
```
3. will need to wait a few seconds to connect to database in each test case
	 
## UI Test Cases

# Test Case 1: Plan Schedule Selection
- **Description**: User can view completed courses in their CS degree plan
- **Test Steps**:
  1. Launch the application
  2. Log in using the credentials:
     - Username: DegreePlanner1
     - Password: 1
  3. On the home dashboard, navigate to Plan Schedule.
  4. Select courses taken.
  5. Example Test Cases:
     - Select all classes up to CS 3354.
     - Sorting works in both ascending and descending order
     - Select only freshman first-semester classes (up to CS 2305).

# Test Case 2:Visual Flowchart View
- **Description**: User can view a visual flowchart showcasing remaining classes in the degree plan.
- **Test Steps**:
  1. From the Plan Schedule interface, after selecting completed classes, choose Visual Flowchart.
  2. Verify that the flowchart correctly highlights completed and remaining classes in a visual format.

# Test Case 3: Completed and Remaining Classes Views
- **Description**:User can view completed and remaining classes in separate, sortable tables. Remember to go back plan schedule if you want to recheck the functionality
- **Test Steps**:
  1. On the home dashboard, navigate to Plan Schedule.
  2. Select classes taken
  3. From the Plan Schedule interface:
     - Click View Completed Classes to see all classes marked as completed.
     - Click Remaining Classes to view courses still required for degree completion.
  4. Verify 
     - Each table displays the correct list of classes.
     - Sorting functionality works for headers (e.g., Course Name, Credit Hours).
     - Classes are accurately categorized as completed or remaining.
     
