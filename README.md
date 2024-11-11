# Automatic Degree Planner

A React-based application for managing and tracking degree progress, featuring course management and degree planning capabilities.

## Test Cases

> **Important**: These test cases are implemented in the `sofia-use-cases` branch, not in the main branch. To test these features, make sure you checkout the correct branch:
```bash
git checkout sofia-use-cases
```

### Test Case 1: Completed Courses View
- **Description**: User can view completed courses in their CS degree plan
- **Test Steps**:
  1. Launch the application
  2. Log in using the credentials:
     - Username: DegreePlanner
     - Password: 123456
  3. On the home dashboard, click "View Completed Courses"
  4. Test the sorting functionality by clicking on:
     - Course Name header (to sort alphabetically)
     - Credit Hours header (to sort numerically)
     - Semester Completed header (to sort chronologically)
  5. Verify that:
     - The table displays all completed courses
     - Sorting works in both ascending and descending order
     - The data is properly formatted and aligned

### Test Case 2: Remaining Courses View
- **Description**: User can view remaining courses in their CS degree plan
- **Test Steps**:
  1. Launch the application
  2. Log in using the credentials:
     - Username: DegreePlanner
     - Password: 123456
  3. On the home dashboard, click "View Remaining Courses"
  4. Test the sorting functionality by clicking on:
     - Course Name header (to sort alphabetically)
     - Credit Hours header (to sort numerically)
     - Course Level header (to sort by academic level)
  5. Verify that:
     - The table displays all remaining required courses
     - Sorting works in both ascending and descending order
     - Course levels are properly ordered (Freshman → Senior)

### Database Test Cases (Mixue Bao)
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

2. Switch to the test cases branch:
```bash
git checkout sofia-use-cases
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

### Login Credentials
- Username: DegreePlanner
- Password: 123456

## Expected Test Results
- Both tables should display properly formatted data
- Sorting functionality should work smoothly in both directions
- Tables should be responsive on different screen sizes
- Course data should be accurately displayed
- UI should maintain consistent dark theme styling
- Sort indicators (arrows) should properly show current sort state
