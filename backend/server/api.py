from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo.errors import DuplicateKeyError
from data_manager import DataManager  
from models import Student  

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
data_manager = DataManager()  

@app.route('/update-student-courses', methods=['POST', 'OPTIONS'])
def update_student_courses():
    if request.method == 'OPTIONS':
        return jsonify({'status': 'OK'}), 200
    data = request.json
    username = data.get("username")
    completed_courses = data.get("completed_courses")
    remaining_courses = data.get("remaining_courses")
    
    if not username or completed_courses is None or remaining_courses is None:
        return jsonify({"error": "Missing username, completed_courses, or remaining_courses"}), 400

    try:
        modified_count = data_manager.update_student_courses(username, completed_courses, remaining_courses)
        if modified_count:
            return jsonify({"message": "Student courses updated successfully"}), 200
        else:
            return jsonify({"message": "No changes made. Student not found or courses are the same."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-completed-courses', methods=['GET', 'OPTIONS'])
def get_completed_courses():
    try:
        result = data_manager.get_courses_completed_by_username()
        
        if result is None:
            return jsonify({"message": "Student not found"}), 404
        elif result:  
            return jsonify({"completed_courses_details": result}), 200
        else:
            return jsonify({"message": "No completed courses found for this student."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/get-remaining-courses', methods=['GET', 'OPTIONS'])
def get_remaining_courses():
    try:
        result = data_manager.get_courses_remaining_by_username()
        
        if result is None:
            return jsonify({"message": "Student not found"}), 404
        elif result:  
            return jsonify({"remaining_courses_details": result}), 200
        else:
            return jsonify({"message": "No completed courses found for this student."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
