from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()  # Load environment variables from a .env file if present

# --- Database Configuration ---
# Render provides a DATABASE_URL environment variable for the PostgreSQL instance.
# Use a local SQLite database for development if DATABASE_URL is not set.
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///messages.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- Database Model ---
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(200), nullable=False)
    message_body = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())

    def __repr__(self):
        return f"<Message {self.id}: {self.name}>"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.form
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message_body = data.get('message')

        if not all([name, email, subject, message_body]):
            return jsonify({'success': False, 'message': 'All fields are required.'}), 400

        # Create a new message object and add it to the database
        new_message = Message(
            name=name,
            email=email,
            subject=subject,
            message_body=message_body
        )
        db.session.add(new_message)
        db.session.commit()
        
        return jsonify({'success': True, 'message': 'Message saved successfully!'})
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'success': False, 'message': 'An error occurred while saving the message.'}), 500

# A simple command to create the database tables
@app.cli.command("init-db")
def init_db_command():
    """Creates the database tables."""
    db.create_all()
    print("Initialized the database.")

if __name__ == '__main__':
    with app.app_context():
        db.create_all() # Create tables for local development
    app.run(debug=True)
