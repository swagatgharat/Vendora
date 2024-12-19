# Vendora--Chatbot Application

Vendora is a chatbot application designed to enable seamless interaction using natural language processing (NLP). The project is implemented in Python and leverages PyTorch for training and deploying the chatbot model. It also features a user-friendly web interface for easy interaction. Vendora provides a seamless and customizable platform for deploying intelligent chatbot solutions.

---

## Project Structure
The project is organized as follows:

```
Vendora/
├── app.py                  # Main application script for starting the server
├── chat.py                 # Chatbot logic and response handling
├── train.py                # Script for training the chatbot model
├── model.py                # Definition of the chatbot's neural network model
├── nltk_utils.py           # Helper functions for NLP tasks like tokenization and stemming
├── intents.json            # JSON file defining chatbot intents and responses
├── data.pth                # File containing the pre-trained model weights
├── instance/
│   └── users.db            # SQLite database for storing user information
├── static/
│   ├── app.js             # Frontend JavaScript for dynamic behavior
│   ├── style.css          # CSS file for styling the web interface
│   └── images/            # Directory for storing static assets like images
├── templates/
│   ├── base.html          # Base HTML template for the application
│   ├── login.html         # Template for the login page
│   └── register.html      # Template for the registration page
└── __pycache__/           # Compiled Python files (auto-generated)
```

---

## Setup Instructions
Follow these steps to set up and run the Vendora chatbot application:

### 1. **Clone or Download the Repository**
Clone the repository using Git or download the ZIP file and extract its contents.
```bash
# Clone the repository
git clone https://github.com/swagatgharat/vendora.git
cd vendora
```

### 2. **Install Dependencies**
Set up a Python virtual environment and install the required packages.

- Create and activate a virtual environment:
  ```bash
  python -m venv venv
  source venv/bin/activate    # On Windows: venv\Scripts\activate
  ```

- Install the required packages from `requirements.txt`:
  ```bash
  pip install -r requirements.txt
  ```

### 3. **Prepare the Database**
Ensure the `users.db` file exists in the `instance` directory:

- If the database does not exist, create it and define the necessary schema.
- Use an SQLite database browser if required for manual configuration.

### 4. **Run the Application**
Start the Flask application:
```bash
python app.py
```
The application will be accessible at `http://127.0.0.1:5000/` in your web browser.

### 5. **Train the Model (if needed)**
If you want to update or customize the chatbot's responses, modify the `intents.json` file and retrain the model:
```bash
python train.py
```
This will save updated model weights to `data.pth`.

---

## Features

### 1. **Natural Language Chatbot**
Vendora uses predefined intents in the `intents.json` file to understand and respond to user queries.

### 2. **Web Interface**
- User-friendly web interface with login and registration functionality.
- Chat interface for interacting with the chatbot.

### 3. **Customizable Training**
- Easily update chatbot intents by modifying the `intents.json` file.
- Retrain the model to include new intents or responses.

---

## Technologies Used

### **Backend**
- Python
- Flask

### **Machine Learning**
- PyTorch

### **Frontend**
- HTML
- CSS
- JavaScript

### **Database**
- SQLite
