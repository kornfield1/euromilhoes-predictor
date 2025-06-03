from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime
import os
import random
import hashlib

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

def generate_random_numbers():
    """Gera 5 números aleatórios únicos entre 1 e 50"""
    return sorted(random.sample(range(1, 51), 5))

def generate_random_stars():
    """Gera 2 estrelas aleatórias únicas entre 1 e 12"""
    return sorted(random.sample(range(1, 13), 2))

def generate_frequency_based_numbers():
    """Gera números baseados em frequências históricas simuladas"""
    # Simulação de números com maior frequência histórica
    high_frequency = [1, 3, 5, 9, 17, 19, 21, 23, 27, 33, 37, 42, 44, 47, 50]
    medium_frequency = [4, 6, 10, 12, 15, 16, 20, 24, 26, 29, 31, 35, 38, 41, 45]
    # Restantes números têm frequência mais baixa
    
    # Escolhe 3 números de alta frequência e 2 de média frequência
    numbers = random.sample(high_frequency, 3) + random.sample(medium_frequency, 2)
    return sorted(numbers)

def generate_frequency_based_stars():
    """Gera estrelas baseadas em frequências históricas simuladas"""
    # Simulação de estrelas com maior frequência histórica
    high_frequency_stars = [2, 3, 5, 8, 9]
    # Restantes estrelas têm frequência mais baixa
    
    # Escolhe pelo menos uma estrela de alta frequência
    stars = random.sample(high_frequency_stars, 1)
    remaining_stars = list(range(1, 13))
    for star in stars:
        if star in remaining_stars:
            remaining_stars.remove(star)
    
    # Adiciona mais uma estrela das restantes
    stars += random.sample(remaining_stars, 1)
    return sorted(stars)

def generate_pattern_based_numbers():
    """Gera números baseados em padrões simulados"""
    # Diferentes padrões possíveis
    patterns = [
        # Padrão 1: Números próximos em grupos
        lambda: sorted(random.sample(range(1, 20), 2) + random.sample(range(20, 40), 2) + random.sample(range(40, 51), 1)),
        # Padrão 2: Distribuição uniforme
        lambda: sorted([random.randint(1, 10), random.randint(11, 20), 
                       random.randint(21, 30), random.randint(31, 40), 
                       random.randint(41, 50)]),
        # Padrão 3: Baseado em paridade (3 ímpares, 2 pares)
        lambda: sorted(random.sample([n for n in range(1, 51) if n % 2 == 1], 3) + 
                      random.sample([n for n in range(1, 51) if n % 2 == 0], 2)),
    ]
    
    # Escolhe um padrão aleatório
    chosen_pattern = random.choice(patterns)
    numbers = chosen_pattern()
    
    # Garante que não há duplicados
    while len(set(numbers)) < 5:
        numbers = chosen_pattern()
    
    return sorted(numbers)

def generate_pattern_based_stars():
    """Gera estrelas baseadas em padrões simulados"""
    # Diferentes padrões possíveis para estrelas
    patterns = [
        # Padrão 1: Uma estrela baixa, uma alta
        lambda: sorted([random.randint(1, 6), random.randint(7, 12)]),
        # Padrão 2: Duas estrelas próximas
        lambda: sorted(random.sample(range(random.randint(1, 10), random.randint(11, 13)), 2)),
        # Padrão 3: Uma par, uma ímpar
        lambda: sorted([random.choice([n for n in range(1, 13) if n % 2 == 0]),
                       random.choice([n for n in range(1, 13) if n % 2 == 1])]),
    ]
    
    # Escolhe um padrão aleatório
    chosen_pattern = random.choice(patterns)
    stars = chosen_pattern()
    
    # Garante que não há duplicados
    while len(set(stars)) < 2:
        stars = chosen_pattern()
    
    return sorted(stars)

def generate_hybrid_numbers():
    """Combina diferentes métodos para gerar números"""
    methods = [generate_random_numbers, generate_frequency_based_numbers, generate_pattern_based_numbers]
    weights = [0.3, 0.4, 0.3]  # Pesos para cada método
    
    chosen_method = random.choices(methods, weights=weights, k=1)[0]
    return chosen_method()

def generate_hybrid_stars():
    """Combina diferentes métodos para gerar estrelas"""
    methods = [generate_random_stars, generate_frequency_based_stars, generate_pattern_based_stars]
    weights = [0.3, 0.4, 0.3]  # Pesos para cada método
    
    chosen_method = random.choices(methods, weights=weights, k=1)[0]
    return chosen_method()

def generate_ai_based_numbers():
    """Simula geração baseada em IA usando hash e data atual"""
    # Usa a data atual como semente para simular análise de IA
    # Modificado para usar segundos para garantir variação entre chamadas
    current_date = datetime.now().strftime("%Y%m%d%H%M%S")
    seed = int(hashlib.md5(current_date.encode()).hexdigest(), 16) % 10000
    
    random.seed(seed)
    
    # Simula análise de padrões complexos
    base_numbers = list(range(1, 51))
    
    # Aplica "pesos" baseados em simulação de análise de IA
    weighted_numbers = []
    for num in base_numbers:
        # Simula diferentes pesos baseados em vários fatores
        weight = 1.0
        
        # Fator 1: Números primos têm peso ligeiramente maior
        if all(num % i != 0 for i in range(2, int(num**0.5) + 1)) and num > 1:
            weight *= 1.2
            
        # Fator 2: Números na faixa média têm peso ligeiramente menor
        if 20 <= num <= 30:
            weight *= 0.9
            
        # Fator 3: Alguns números específicos têm peso maior baseado em "análise histórica"
        if num in [3, 7, 9, 17, 23, 27, 33, 42, 47]:
            weight *= 1.3
            
        # Adiciona o número com seu peso
        weighted_numbers.extend([num] * int(weight * 10))
    
    # Escolhe 5 números únicos
    numbers = []
    while len(numbers) < 5:
        chosen = random.choice(weighted_numbers)
        if chosen not in numbers:
            numbers.append(chosen)
    
    # Restaura a semente aleatória
    random.seed()
    
    return sorted(numbers)

def generate_ai_based_stars():
    """Simula geração de estrelas baseada em IA usando hash e data atual"""
    # Usa a data atual como semente para simular análise de IA
    # Modificado para usar segundos para garantir variação entre chamadas
    current_date = datetime.now().strftime("%Y%m%d%H%M%S")
    seed = int(hashlib.md5((current_date + "stars").encode()).hexdigest(), 16) % 10000
    
    random.seed(seed)
    
    # Simula análise de padrões complexos para estrelas
    base_stars = list(range(1, 13))
    
    # Aplica "pesos" baseados em simulação de análise de IA
    weighted_stars = []
    for star in base_stars:
        # Simula diferentes pesos baseados em vários fatores
        weight = 1.0
        
        # Fator 1: Estrelas específicas têm peso maior baseado em "análise histórica"
        if star in [2, 3, 5, 8, 9]:
            weight *= 1.4
            
        # Fator 2: Estrelas pares têm peso ligeiramente diferente
        if star % 2 == 0:
            weight *= 1.1
            
        # Adiciona a estrela com seu peso
        weighted_stars.extend([star] * int(weight * 10))
    
    # Escolhe 2 estrelas únicas
    stars = []
    while len(stars) < 2:
        chosen = random.choice(weighted_stars)
        if chosen not in stars:
            stars.append(chosen)
    
    # Restaura a semente aleatória
    random.seed()
    
    return sorted(stars)

def generate_prediction(method):
    """Gera uma previsão baseada no método escolhido"""
    if method == 'random':
        return generate_random_numbers(), generate_random_stars()
    elif method == 'frequency':
        return generate_frequency_based_numbers(), generate_frequency_based_stars()
    elif method == 'pattern':
        return generate_pattern_based_numbers(), generate_pattern_based_stars()
    elif method == 'ai':
        return generate_ai_based_numbers(), generate_ai_based_stars()
    else:  # hybrid (default)
        return generate_hybrid_numbers(), generate_hybrid_stars()

@app.route('/predict', methods=['POST'])
def predict():
    method = request.form.get('method', 'hybrid')
    num_predictions = int(request.form.get('num_predictions', 3))
    
    # Gera previsões baseadas no método escolhido
    predictions = []
    for i in range(num_predictions):
        numbers, stars = generate_prediction(method)
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
    
    # Gera previsões baseadas no método escolhido
    predictions = []
    for i in range(num_predictions):
        numbers, stars = generate_prediction(method)
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
