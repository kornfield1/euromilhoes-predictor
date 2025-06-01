from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/en')
def index_en():
    return render_template('index_en.html')

@app.route('/estatisticas')
def estatisticas():
    return render_template('estatisticas.html')

@app.route('/en/statistics')
def statistics_en():
    return render_template('estatisticas.html', lang='en')

@app.route('/relatorios')
def relatorios():
    return render_template('relatorios.html')

@app.route('/en/reports')
def reports_en():
    return render_template('relatorios.html', lang='en')

@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

@app.route('/en/about')
def about_en():
    return render_template('sobre.html', lang='en')

@app.route('/predict', methods=['POST'])
def predict():
    method = request.form.get('method', 'hybrid')
    num_predictions = int(request.form.get('num_predictions', 3))
    
    # Aqui seria implementada a lógica real de previsão
    # Por enquanto, retornamos dados simulados
    predictions = []
    for i in range(num_predictions):
        numbers = [1, 8, 21, 37, 47]
        stars = [5, 7]
        predictions.append({
            'numbers': numbers,
            'stars': stars
        })
    
    return render_template('prediction_results.html', 
                          predictions=predictions, 
                          method=method,
                          now=datetime.now)

@app.route('/en/predict', methods=['POST'])
def predict_en():
    method = request.form.get('method', 'hybrid')
    num_predictions = int(request.form.get('num_predictions', 3))
    
    # Aqui seria implementada a lógica real de previsão
    # Por enquanto, retornamos dados simulados
    predictions = []
    for i in range(num_predictions):
        numbers = [1, 8, 21, 37, 47]
        stars = [5, 7]
        predictions.append({
            'numbers': numbers,
            'stars': stars
        })
    
    return render_template('prediction_results.html', 
                          predictions=predictions, 
                          method=method,
                          lang='en',
                          now=datetime.now)

@app.route('/detect-language')
def detect_language():
    # Detecta o idioma preferido do navegador
    # e redireciona para a versão apropriada
    accept_languages = request.headers.get('Accept-Language', '')
    if 'en' in accept_languages.lower() and not 'pt' in accept_languages.lower():
        return redirect('/en')
    return redirect('/')

# Adicionar configuração para porta no Render.com
port = int(os.environ.get("PORT", 5000))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
    @app.route('/en/statistics')
def statistics_en():
    return render_template('estatisticas.html', lang='en')

