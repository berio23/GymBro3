from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSON
import json
import os

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

project_root = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(project_root, 'instance', 'gymbro.db')

app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'



db = SQLAlchemy(app)
migrate = Migrate(app, db)

with app.app_context():
    sqlite_path = db.engine.url.database
    absolute_path = os.path.abspath(sqlite_path)
    print("Using SQLite database at:", absolute_path)


class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)  # Add name attribute
    description = db.Column(db.String, nullable=True)  # Add description attribute
    date = db.Column(db.Date, nullable=False)  # Add date attribute
    sets = db.Column(db.Integer, nullable=False)
    repetitions = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    setType = db.Column(db.String, nullable=False)
    exercises = db.Column(JSON, nullable=True)  # Add exercises attribute

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'date': self.date.strftime('%Y-%m-%d'),
            'sets': self.sets,
            'repetitions': self.repetitions,
            'weight': self.weight,
            'setType': self.setType,
            'exercises': self.exercises if isinstance(self.exercises, list) else json.loads(self.exercises) if self.exercises else []
        }


class WorkoutSession(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    workout_id = db.Column(db.Integer, db.ForeignKey('complete_workout.id'), nullable=False)
    workout = db.relationship('CompleteWorkout', backref=db.backref('sessions', lazy=True))
    date = db.Column(db.Date, nullable=False)
    duration = db.Column(db.Integer, nullable=False) # Add a new column for workout duration in seconds
    exercises = db.Column(JSON, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'workout_id': self.workout_id,
            'date': self.date.strftime('%Y-%m-%d'),
            'duration': self.duration, # Include duration in the serialized output
            'exercises': self.exercises if isinstance(self.exercises, list) else json.loads(self.exercises) if self.exercises else []
        }

class CompleteWorkout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    exercises = db.Column(JSON, nullable=False) # Storing exercises as a JSON object

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'exercises': self.exercises if isinstance(self.exercises, list) else json.loads(self.exercises) if self.exercises else []
        }

@app.route('/api/workouts', methods=['GET'])
def get_workouts():
    workouts = Workout.query.all()
    return jsonify([workout.serialize() for workout in workouts])

@app.route('/api/workout-sessions', methods=['POST'])
def save_workout_session():
    data = request.get_json()

    
    print(f"Received duration: {data['duration']}")  # Add this line

    # Convert the date string to a Python date object
    date_object = datetime.strptime(data['date'], '%Y-%m-%d').date()

    new_workout_session = WorkoutSession(
        workout_id=data['workout_id'],
        date=date_object,
        duration=data['duration'], # Add this line to store the duration
        exercises=data['exercises']
    )
    db.session.add(new_workout_session)
    db.session.commit()
    return jsonify(new_workout_session.serialize())

@app.route('/api/workout-sessions', methods=['GET'])
def get_workout_sessions():
    workout_sessions = WorkoutSession.query.all()

    for workout_session in workout_sessions:
        print(f"Workout session ID: {workout_session.id}, duration: {workout_session.duration}")

    return jsonify([workout_session.serialize() for workout_session in workout_sessions])

@app.route('/api/workout-sessions/<int:session_id>', methods=['DELETE'])
def delete_workout_session(session_id):
    session = WorkoutSession.query.get(session_id)
    if session:
        db.session.delete(session)
        db.session.commit()
        return jsonify({'message': 'Session deleted successfully.'})
    else:
        return jsonify({'error': 'Session not found.'}), 404

@app.route('/api/workouts', methods=['POST'])
def create_workout():
    data = request.get_json()
    new_workout = Workout(
        sets=data['sets'],
        repetitions=data['repetitions'],
        weight=data['weight'],
        setType=data['setType']
    )
    db.session.add(new_workout)
    db.session.commit()
    return jsonify(new_workout.serialize()), 201

@app.route('/api/workouts/<int:workout_id>', methods=['PUT'])
def update_workout(workout_id):
    workout = Workout.query.get(workout_id)
    if not workout:
        return jsonify({'error': 'Workout not found'}), 404

    data = request.get_json()
    workout.sets = data['sets']
    workout.repetitions = data['repetitions']
    workout.weight = data['weight']
    workout.setType = data['setType']
    db.session.commit()

    return jsonify(workout.serialize())

# New routes for complete workouts
@app.route('/api/complete-workouts', methods=['GET'])
def get_complete_workouts():
    complete_workouts = CompleteWorkout.query.all()
    return jsonify([workout.serialize() for workout in complete_workouts])

@app.route('/api/complete-workouts', methods=['POST'])
def save_complete_workout():
    data = request.get_json()
    new_complete_workout = CompleteWorkout(
        name=data['name'],
        exercises=data['exercises']
    )
    db.session.add(new_complete_workout)
    db.session.commit()
    return jsonify(new_complete_workout.serialize())

@app.route('/api/complete-workouts/<int:workout_id>', methods=['DELETE'])
def delete_complete_workout(workout_id):
    workout = CompleteWorkout.query.get(workout_id)

    if workout is None:
        return jsonify({'message': 'Workout not found'}), 404

    # Manually delete associated workout sessions
    WorkoutSession.query.filter_by(workout_id=workout_id).delete()
    db.session.commit()

    db.session.delete(workout)
    db.session.commit()

    return jsonify({'message': 'Workout has been deleted'})
with app.app_context():
    db.create_all()

def main():
    app.run()

if __name__ == '__main__':
    main()
