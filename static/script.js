// Global chart instances
let pieChart = null;
let barChart = null;
let radarChart = null;
let featureBarChart = null;

// Form submission handler
document.getElementById('predictionForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get input values
    const sepalLength = parseFloat(document.getElementById('sepalLength').value);
    const sepalWidth = parseFloat(document.getElementById('sepalWidth').value);
    const petalLength = parseFloat(document.getElementById('petalLength').value);
    const petalWidth = parseFloat(document.getElementById('petalWidth').value);
    
    // Hide previous results and errors
    document.getElementById('results').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    
    // Show loading spinner
    document.getElementById('loadingSpinner').style.display = 'block';
    
    try {
        // Make prediction request
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sepal_length: sepalLength,
                sepal_width: sepalWidth,
                petal_length: petalLength,
                petal_width: petalWidth
            })
        });
        
        const data = await response.json();
        
        // Hide loading spinner
        document.getElementById('loadingSpinner').style.display = 'none';
        
        if (response.ok) {
            // Display results
            const inputFeatures = {
                sepalLength,
                sepalWidth,
                petalLength,
                petalWidth
            };
            displayResults(data, inputFeatures);
        } else {
            // Display error
            showError(data.error || 'An error occurred during prediction');
        }
    } catch (error) {
        // Hide loading spinner
        document.getElementById('loadingSpinner').style.display = 'none';
        showError('Failed to connect to the server. Please try again.');
    }
});

// Display prediction results
function displayResults(data, inputFeatures) {
    // Set prediction text
    document.getElementById('predictionResult').textContent = data.prediction;
    document.getElementById('predictionDescription').textContent = data.description;
    
    // Set confidence score
    const confidence = data.confidence;
    document.getElementById('confidenceBadge').textContent = `${confidence.toFixed(1)}%`;
    
    const confidenceBar = document.getElementById('confidenceBar');
    confidenceBar.style.width = `${confidence}%`;
    confidenceBar.textContent = `${confidence.toFixed(1)}%`;
    
    // Set confidence bar color based on value
    if (confidence >= 80) {
        confidenceBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-success';
    } else if (confidence >= 60) {
        confidenceBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-warning';
    } else {
        confidenceBar.className = 'progress-bar progress-bar-striped progress-bar-animated bg-danger';
    }
    
    // Display all probabilities
    const probabilitiesList = document.getElementById('probabilitiesList');
    probabilitiesList.innerHTML = '';
    
    // Sort probabilities by value (descending)
    const sortedProbs = Object.entries(data.probabilities).sort((a, b) => b[1] - a[1]);
    
    sortedProbs.forEach(([species, probability]) => {
        const probItem = document.createElement('div');
        probItem.className = 'probability-item';
        probItem.innerHTML = `
            <span class="probability-name">${species}</span>
            <div class="probability-bar-container">
                <div class="probability-bar">
                    <div class="probability-bar-fill" style="width: ${probability}%"></div>
                </div>
            </div>
            <span class="probability-value">${probability.toFixed(1)}%</span>
        `;
        probabilitiesList.appendChild(probItem);
    });
    
    // Create visualizations
    createVisualizations(data, inputFeatures);
    
    // Show results with animation
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Create all visualizations
function createVisualizations(data, inputFeatures) {
    // Destroy existing charts
    if (pieChart) pieChart.destroy();
    if (barChart) barChart.destroy();
    if (radarChart) radarChart.destroy();
    if (featureBarChart) featureBarChart.destroy();
    
    // Create charts
    createProbabilityPieChart(data.probabilities);
    createProbabilityBarChart(data.probabilities);
    createFeatureRadarChart(inputFeatures);
    createFeatureBarChart(inputFeatures);
}

// Probability Pie Chart
function createProbabilityPieChart(probabilities) {
    const ctx = document.getElementById('probabilityPieChart').getContext('2d');
    const species = Object.keys(probabilities);
    const values = Object.values(probabilities);
    
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: species,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(72, 187, 120, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(72, 187, 120, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}

// Probability Bar Chart
function createProbabilityBarChart(probabilities) {
    const ctx = document.getElementById('probabilityBarChart').getContext('2d');
    const species = Object.keys(probabilities);
    const values = Object.values(probabilities);
    
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: species,
            datasets: [{
                label: 'Confidence (%)',
                data: values,
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(72, 187, 120, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(72, 187, 120, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Confidence: ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}

// Feature Radar Chart
function createFeatureRadarChart(features) {
    const ctx = document.getElementById('featureRadarChart').getContext('2d');
    
    // Normalize features to 0-100 scale for better visualization
    const normalizedData = [
        (features.sepalLength / 8.0) * 100,
        (features.sepalWidth / 5.0) * 100,
        (features.petalLength / 7.0) * 100,
        (features.petalWidth / 3.0) * 100
    ];
    
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'],
            datasets: [{
                label: 'Feature Values',
                data: normalizedData,
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: 'rgba(102, 126, 234, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(102, 126, 234, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 25,
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const labels = ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'];
                            const values = [
                                features.sepalLength,
                                features.sepalWidth,
                                features.petalLength,
                                features.petalWidth
                            ];
                            return labels[context.dataIndex] + ': ' + values[context.dataIndex] + ' cm';
                        }
                    }
                }
            }
        }
    });
}

// Feature Bar Chart
function createFeatureBarChart(features) {
    const ctx = document.getElementById('featureBarChart').getContext('2d');
    
    featureBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'],
            datasets: [{
                label: 'Value (cm)',
                data: [
                    features.sepalLength,
                    features.sepalWidth,
                    features.petalLength,
                    features.petalWidth
                ],
                backgroundColor: [
                    'rgba(102, 126, 234, 0.8)',
                    'rgba(118, 75, 162, 0.8)',
                    'rgba(72, 187, 120, 0.8)',
                    'rgba(245, 101, 101, 0.8)'
                ],
                borderColor: [
                    'rgba(102, 126, 234, 1)',
                    'rgba(118, 75, 162, 1)',
                    'rgba(72, 187, 120, 1)',
                    'rgba(245, 101, 101, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 8,
                    ticks: {
                        callback: function(value) {
                            return value + ' cm';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Value: ' + context.parsed.y + ' cm';
                        }
                    }
                }
            }
        }
    });
}

// Display error message
function showError(message) {
    document.getElementById('errorText').textContent = message;
    document.getElementById('errorMessage').style.display = 'block';
    document.getElementById('errorMessage').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add input validation feedback
const inputs = document.querySelectorAll('.form-control');
inputs.forEach(input => {
    input.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        const min = parseFloat(e.target.min);
        const max = parseFloat(e.target.max);
        
        if (value < min || value > max) {
            e.target.classList.add('is-invalid');
        } else {
            e.target.classList.remove('is-invalid');
        }
    });
});
