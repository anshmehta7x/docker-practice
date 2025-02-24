from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
import os

DB_USER = os.environ.get('POSTGRES_USER')
DB_PASSWORD = os.environ.get('POSTGRES_PASSWORD')
DB_HOST = os.environ.get('POSTGRES_HOST')
DB_PORT = os.environ.get('POSTGRES_PORT')
DB_NAME = os.environ.get('POSTGRES_DB')


DB_URI = f'postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI  # name the postgres container db instead of localhost
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)
@app.route("/",methods=["GET"])
def hello_world():
    return "HELLLOOLOLLOOLOL"

class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    completed = db.Column(db.Boolean, default=False)

@app.route("/tasks",methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify(
        [{"id": task.id, "title": task.title, "description": task.description, "completed": task.completed} for task in tasks]
    )

@app.route("/tasks",methods=["POST"])
def create_task():
    data = request.get_json()
    new_task = Task(
        title=data['title'],
        description=data['description'],
        completed=data['completed']
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"id": new_task.id, "title": new_task.title, "description": new_task.description, "completed": new_task.completed}), 201

@app.route("/tasks/<int:task_id>",methods=["PUT"])
def update_task(task_id):
    data = request.get_json()
    task = Task.query.get_or_404(task_id)
    task.title = data['title']
    task.description = data['description']
    task.completed = data['completed']
    db.session.commit()
    return jsonify({"id": task.id, "title": task.title, "description": task.description, "completed": task.completed})

@app.route("/tasks/<int:task_id>",methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted successfully"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
