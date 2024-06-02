from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
import csv
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

# Load data
training = pd.read_csv('Data/Training.csv')
cols = training.columns[:-1]
x = training[cols]
y = training['prognosis']

# Encode labels
le = preprocessing.LabelEncoder()
le.fit(y)
y = le.transform(y)

# Train model
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
clf = DecisionTreeClassifier().fit(x_train, y_train)

# Load dictionaries
severityDictionary = {}
description_list = {}
precautionDictionary = {}

def getDescription():
    global description_list
    with open('MasterData/symptom_Description.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            description_list[row[0]] = row[1]

def getSeverityDict():
    global severityDictionary
    with open('MasterData/symptom_severity.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if len(row) < 2:
                continue
            severityDictionary[row[0]] = int(row[1])

def getprecautionDict():
    global precautionDictionary
    with open('MasterData/symptom_precaution.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            if len(row) < 5:
                continue
            precautionDictionary[row[0]] = [row[1], row[2], row[3], row[4]]

getDescription()
getSeverityDict()
getprecautionDict()

symptoms = list(cols)

@app.route('/')
def index():
    return "HealthCare ChatBot API is running."

@app.route('/get_disease', methods=['POST'])
def get_disease():
    data = request.json
    
    # Extract symptoms from the input string
    symptom_string = data.get('symptoms', '')
    selected_symptoms = [symptom.strip() for symptom in symptom_string.split(',') if symptom.strip()]
    
    # Ask for name
    name = data.get('name', '')

    # Ask for number of days
    days = int(data.get('days', 0))

    # Prepare input vector
    input_vector = np.zeros(len(cols))
    for symptom in selected_symptoms:
        if symptom in symptoms:
            input_vector[symptoms.index(symptom)] = 1
    
    # Predict disease
    disease = clf.predict([input_vector])[0]
    disease_name = le.inverse_transform([disease])[0]
    
    # Get description and precautions
    description = description_list.get(disease_name, "No description available.")
    precautions = precautionDictionary.get(disease_name, ["No precautions available."])
    
    response = {
        'name': name,
        'symptom_details': {symptom: "Yes" for symptom in selected_symptoms},  # Assuming all symptoms are present
        'days': days,
        'disease': disease_name,
        'description': description,
        'precautions': precautions
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
