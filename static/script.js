let positiveCount = 0;
let negativeCount = 0;

// Buton tıklama olayını dinle
document.getElementById('submitBtn').addEventListener('click', submitText);

function submitText() {
    const text = document.getElementById('userInput').value;
    if (text === '') return;

    // Sentiment analizi için isteği gönder
    analyzeSentiment(text);
    
    // Textarea'yı temizle
    document.getElementById('userInput').value = '';
}

function analyzeSentiment(text) {
    fetch('/analyze-sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        if (data.sentiment === 'positive') {
            positiveCount++;
        } else if (data.sentiment === 'negative') {
            negativeCount++;
        }
        updateBackgroundColor();
    })
    .catch(error => {
        console.error('Error during sentiment analysis:', error);
    });
}

function updateBackgroundColor() {
    const total = positiveCount + negativeCount;

    if (total === 0) return; // No need to update if no sentiment is processed

    const positiveRatio = positiveCount / total;
    const negativeRatio = negativeCount / total;

    // Calculate RGB values for red (negative) and green (positive)
    const red = Math.min(255, Math.floor(255 * negativeRatio));  
    const green = Math.min(255, Math.floor(255 * positiveRatio));

    // Update background color
    document.body.style.backgroundColor = `rgb(${red}, ${green}, 100)`; 
}
