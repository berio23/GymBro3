from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.dialects.postgresql import JSON
import json


app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///gymbro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sets = db.Column(db.Integer, nullable=False)
    repetitions = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    setType = db.Column(db.String, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'date': self.date.strftime('%Y-%m-%d'),
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

with app.app_context():
    db.create_all()

def main():
    app.run()

if __name__ == '__main__':
    main()