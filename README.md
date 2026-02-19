# 🌸 Iris Flower Species Predictor

A beautiful, modern web application that predicts iris flower species using Machine Learning. Built with Python, Flask, and scikit-learn.

## ✨ Features

- **Machine Learning Model**: Random Forest Classifier trained on the Iris dataset
- **Real-time Predictions**: Instant flower species classification
- **Confidence Scores**: See prediction confidence with visual progress bars
- **Probability Distribution**: View probabilities for all species
- **Interactive Visualizations**: 4 dynamic charts powered by Chart.js
  - Probability Pie Chart (Doughnut)
  - Confidence Bar Chart
  - Feature Radar Chart
  - Feature Comparison Bar Chart
- **Modern UI**: Responsive, gradient-themed design with smooth animations
- **Input Validation**: Real-time validation with helpful error messages
- **RESTful API**: Clean Flask backend with JSON responses

## 🎯 Predicted Species

- **Setosa**: Small petals with distinctive appearance
- **Versicolor**: Medium-sized petals with purple-blue colors
- **Virginica**: Large petals, often found in wetland areas

## 📋 Requirements

- Python 3.8+
- Flask
- scikit-learn
- NumPy
- Pandas
- joblib

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
cd flower-prediction-app
```

### 2. Create Virtual Environment (Recommended)

```bash
python -m venv venv
```

Activate on Windows:
```bash
venv\Scripts\activate
```

Activate on macOS/Linux:
```bash
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Train the Machine Learning Model

```bash
python train_model.py
```

This will:
- Load the Iris dataset
- Train a Random Forest Classifier
- Display accuracy metrics
- Save the model to `models/flower_model.pkl`

Expected output:
```
Model Training Complete!
Accuracy: 100.00%
Model saved to 'models/flower_model.pkl'
```

### 5. Run the Flask Application

```bash
python app.py
```

The application will start on `http://localhost:5000`

### 6. Open in Browser

Navigate to `http://localhost:5000` in your web browser.

## 📁 Project Structure

```
flower-prediction-app/
│
├── app.py                  # Flask application & API endpoints
├── train_model.py          # ML model training script
├── requirements.txt        # Python dependencies
├── README.md              # Project documentation
│
├── models/
│   └── flower_model.pkl   # Trained ML model (generated)
│
├── static/
│   ├── style.css          # Custom CSS styles
│   └── script.js          # Frontend JavaScript
│
└── templates/
    └── index.html         # Main HTML template
```

## 🎨 UI Features

- **Gradient Background**: Beautiful purple gradient theme
- **Floating Animations**: Smooth icon animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Input Validation**: Real-time feedback on input values
- **Progress Bars**: Visual confidence indicators
- **Interactive Charts**: 4 dynamic visualizations with Chart.js
  - Doughnut chart for probability distribution
  - Bar chart for confidence comparison
  - Radar chart for feature visualization
  - Bar chart for feature value comparison
- **Error Handling**: User-friendly error messages
- **Smooth Transitions**: Animated chart rendering

## 🔧 API Endpoints

### GET `/`
Returns the main HTML page

### POST `/predict`
Predicts flower species based on input features

**Request Body:**
```json
{
  "sepal_length": 5.1,
  "sepal_width": 3.5,
  "petal_length": 1.4,
  "petal_width": 0.2
}
```

**Response:**
```json
{
  "prediction": "Setosa",
  "confidence": 100.0,
  "description": "Iris Setosa is characterized by its small petals...",
  "probabilities": {
    "Setosa": 100.0,
    "Versicolor": 0.0,
    "Virginica": 0.0
  }
}
```

### GET `/health`
Health check endpoint

## 📊 Input Ranges

- **Sepal Length**: 4.0 - 8.0 cm
- **Sepal Width**: 2.0 - 5.0 cm
- **Petal Length**: 1.0 - 7.0 cm
- **Petal Width**: 0.1 - 3.0 cm

## 🧪 Example Predictions

### Setosa
- Sepal Length: 5.1 cm
- Sepal Width: 3.5 cm
- Petal Length: 1.4 cm
- Petal Width: 0.2 cm

### Versicolor
- Sepal Length: 5.9 cm
- Sepal Width: 3.0 cm
- Petal Length: 4.2 cm
- Petal Width: 1.5 cm

### Virginica
- Sepal Length: 6.5 cm
- Sepal Width: 3.0 cm
- Petal Length: 5.5 cm
- Petal Width: 2.0 cm

## 🛠️ Technologies Used

- **Backend**: Flask (Python web framework)
- **ML Library**: scikit-learn (Random Forest Classifier)
- **Data Processing**: NumPy, Pandas
- **Model Persistence**: joblib
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5
- **Charts**: Chart.js 4.4.0
- **Icons**: Font Awesome 6
- **Visualization**: Matplotlib, Seaborn (optional for backend)

## 📈 Model Performance

The Random Forest Classifier achieves:
- **Accuracy**: ~100% on test set
- **Training Data**: 120 samples
- **Test Data**: 30 samples
- **Features**: 4 (sepal length/width, petal length/width)
- **Classes**: 3 (Setosa, Versicolor, Virginica)

## 🎓 Learning Resources

- [Iris Dataset](https://scikit-learn.org/stable/auto_examples/datasets/plot_iris_dataset.html)
- [Random Forest Classifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html)
- [Flask Documentation](https://flask.palletsprojects.com/)

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📝 License

This project is open source and available for educational purposes.

## 🌟 Acknowledgments

- Iris dataset from UCI Machine Learning Repository
- Bootstrap for responsive UI components
- Font Awesome for beautiful icons

---

Made with ❤️ using Machine Learning & Flask
