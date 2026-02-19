from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

# Load the trained model
MODEL_PATH = 'models/flower_model.pkl'
model = None

# Flower species names
FLOWER_NAMES = ['Setosa', 'Versicolor', 'Virginica']

# Flower descriptions
FLOWER_INFO = {
    'Setosa': 'Iris Setosa is characterized by its small petals and distinctive appearance.',
    'Versicolor': 'Iris Versicolor has medium-sized petals with beautiful purple-blue colors.',
    'Virginica': 'Iris Virginica features large petals and is often found in wetland areas.'
}

def load_model():
    """Load the trained model"""
    global model
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
        print("Model loaded successfully!")
    else:
        print("Model not found. Please train the model first by running train_model.py")

@app.route('/')
def home():
    """Render the home page"""
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    """Handle prediction requests"""
    try:
        # Get input data from request
        data = request.get_json()
        
        # Extract features
        sepal_length = float(data['sepal_length'])
        sepal_width = float(data['sepal_width'])
        petal_length = float(data['petal_length'])
        petal_width = float(data['petal_width'])
        
        # Validate input ranges
        if not (4.0 <= sepal_length <= 8.0):
            return jsonify({'error': 'Sepal length must be between 4.0 and 8.0 cm'}), 400
        if not (2.0 <= sepal_width <= 5.0):
            return jsonify({'error': 'Sepal width must be between 2.0 and 5.0 cm'}), 400
        if not (1.0 <= petal_length <= 7.0):
            return jsonify({'error': 'Petal length must be between 1.0 and 7.0 cm'}), 400
        if not (0.1 <= petal_width <= 3.0):
            return jsonify({'error': 'Petal width must be between 0.1 and 3.0 cm'}), 400
        
        # Prepare features for prediction
        features = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
        
        # Make prediction
        prediction = model.predict(features)[0]
        prediction_proba = model.predict_proba(features)[0]
        
        # Get flower name and confidence
        flower_name = FLOWER_NAMES[prediction]
        confidence = float(prediction_proba[prediction] * 100)
        
        # Get all probabilities
        probabilities = {
            FLOWER_NAMES[i]: float(prediction_proba[i] * 100)
            for i in range(len(FLOWER_NAMES))
        }
        
        # Prepare response
        response = {
            'prediction': flower_name,
            'confidence': round(confidence, 2),
            'description': FLOWER_INFO[flower_name],
            'probabilities': probabilities
        }
        
        return jsonify(response)
    
    except ValueError as e:
        return jsonify({'error': 'Invalid input. Please enter valid numbers.'}), 400
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    load_model()
    app.run(debug=True, host='0.0.0.0', port=5000)
