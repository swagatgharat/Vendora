from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt  # Importing Bcrypt
from chat import get_response

import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

# Setting the secret key securely
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', '7c7d3b8f8f3e40b48423d92cfc72b8d5f4c162c6e8e0fd4cb1c59e6aef65e149')

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)  # Initializing Bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False, unique=True)
    password = db.Column(db.String(150), nullable=False)

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        # Generate a hashed password using Bcrypt
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        new_user = User(username=username, password=hashed_password)
        try:
            with app.app_context():
                db.session.add(new_user)
                db.session.commit()
            return redirect(url_for("login"))
        except:
            return "Username already exists!"

    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            session['user_id'] = user.id
            return redirect(url_for("index_get"))
        else:
            return "Invalid credentials!"

    return render_template("login.html")

@app.get("/")
def index_get():
    if 'user_id' not in session:
        return redirect(url_for("login"))
    return render_template("base.html")

@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer": response}
    return jsonify(message)

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
