from flask import Flask, render_template, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)

# VADER analizörü oluşturma
analyzer = SentimentIntensityAnalyzer()

# Ana sayfa yönlendirmesi
@app.route('/')
def index():
    return render_template('index.html')

# Duygu analizi API'si
@app.route('/analyze-sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    text = data.get('text')

    # VADER ile metin analizi yap
    sentiment_score = analyzer.polarity_scores(text)

    # Sentiment skoru üzerinden duygu belirleme
    if sentiment_score['compound'] >= 0.05:
        sentiment = "positive"
    elif sentiment_score['compound'] <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return jsonify({'sentiment': sentiment, 'score': sentiment_score})

if __name__ == '__main__':
    app.run(debug=True)
