// Arquivo para gerenciar a internacionalização
const translations = {
  pt: {
    // Navegação
    "nav_home": "Início",
    "nav_stats": "Estatísticas",
    "nav_reports": "Relatórios",
    "nav_about": "Sobre",
    
    // Página inicial
    "app_title": "Previsor Euromilhões",
    "app_description": "Descubra os números com maior probabilidade de sair no próximo sorteio do Euromilhões, baseado em análise estatística avançada.",
    "generate_prediction": "Gerar Previsão",
    "view_statistics": "Ver Estatísticas",
    "predictions_title": "Previsões para o Euromilhões",
    "new_prediction": "Gerar Nova Previsão",
    
    // Formulário de previsão
    "prediction_method": "Método de Previsão",
    "method_hybrid": "Híbrido (Recomendado)",
    "method_frequency": "Baseado em Frequência",
    "method_recency": "Baseado em Recência",
    "num_predictions": "Número de Previsões",
    "prediction_1": "1 previsão",
    "prediction_3": "3 previsões",
    "prediction_5": "5 previsões",
    "prediction_10": "10 previsões",
    
    // Resultados
    "prediction_results": "Resultados da Previsão",
    "numbers": "Números",
    "stars": "Estrelas",
    "method_used": "Método utilizado",
    "date_generated": "Data de geração",
    
    // Estatísticas
    "stats_title": "Estatísticas do Euromilhões",
    "frequency_title": "Frequência dos Números",
    "most_frequent": "Números mais frequentes",
    "least_frequent": "Números menos frequentes",
    "frequency_stars": "Frequência das Estrelas",
    "most_frequent_stars": "Estrelas mais frequentes",
    "least_frequent_stars": "Estrelas menos frequentes",
    
    // Relatórios
    "reports_title": "Relatórios de Análise",
    "frequency_analysis": "Análise de Frequência",
    "pattern_analysis": "Análise de Padrões",
    "prediction_accuracy": "Precisão das Previsões",
    
    // Sobre
    "about_title": "Sobre o Previsor Euromilhões",
    "about_description": "O Previsor Euromilhões é uma ferramenta que utiliza análise estatística avançada para identificar padrões nos sorteios anteriores e gerar previsões para os próximos sorteios.",
    "methodology": "Metodologia",
    "methodology_description": "Utilizamos três métodos diferentes para gerar previsões:",
    "method_frequency_desc": "Analisa a frequência histórica de cada número e estrela.",
    "method_recency_desc": "Prioriza números e estrelas que não saem há mais tempo.",
    "method_hybrid_desc": "Combina os métodos de frequência e recência para uma previsão mais equilibrada.",
    
    // Idioma
    "language": "Idioma",
    "language_pt": "Português",
    "language_en": "Inglês",
    "change_language": "Mudar idioma"
  },
  en: {
    // Navigation
    "nav_home": "Home",
    "nav_stats": "Statistics",
    "nav_reports": "Reports",
    "nav_about": "About",
    
    // Home page
    "app_title": "EuroMillions Predictor",
    "app_description": "Discover the numbers most likely to appear in the next EuroMillions draw, based on advanced statistical analysis.",
    "generate_prediction": "Generate Prediction",
    "view_statistics": "View Statistics",
    "predictions_title": "EuroMillions Predictions",
    "new_prediction": "Generate New Prediction",
    
    // Prediction form
    "prediction_method": "Prediction Method",
    "method_hybrid": "Hybrid (Recommended)",
    "method_frequency": "Frequency-Based",
    "method_recency": "Recency-Based",
    "num_predictions": "Number of Predictions",
    "prediction_1": "1 prediction",
    "prediction_3": "3 predictions",
    "prediction_5": "5 predictions",
    "prediction_10": "10 predictions",
    
    // Results
    "prediction_results": "Prediction Results",
    "numbers": "Numbers",
    "stars": "Stars",
    "method_used": "Method used",
    "date_generated": "Generation date",
    
    // Statistics
    "stats_title": "EuroMillions Statistics",
    "frequency_title": "Number Frequency",
    "most_frequent": "Most frequent numbers",
    "least_frequent": "Least frequent numbers",
    "frequency_stars": "Star Frequency",
    "most_frequent_stars": "Most frequent stars",
    "least_frequent_stars": "Least frequent stars",
    
    // Reports
    "reports_title": "Analysis Reports",
    "frequency_analysis": "Frequency Analysis",
    "pattern_analysis": "Pattern Analysis",
    "prediction_accuracy": "Prediction Accuracy",
    
    // About
    "about_title": "About EuroMillions Predictor",
    "about_description": "The EuroMillions Predictor is a tool that uses advanced statistical analysis to identify patterns in previous draws and generate predictions for upcoming draws.",
    "methodology": "Methodology",
    "methodology_description": "We use three different methods to generate predictions:",
    "method_frequency_desc": "Analyzes the historical frequency of each number and star.",
    "method_recency_desc": "Prioritizes numbers and stars that haven't appeared for a longer time.",
    "method_hybrid_desc": "Combines frequency and recency methods for a more balanced prediction.",
    
    // Language
    "language": "Language",
    "language_pt": "Portuguese",
    "language_en": "English",
    "change_language": "Change language"
  }
};

// Função para obter o idioma atual
function getCurrentLanguage() {
  return localStorage.getItem('language') || 'pt';
}

// Função para definir o idioma
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updatePageContent();
}

// Função para obter uma tradução
function getTranslation(key) {
  const lang = getCurrentLanguage();
  return translations[lang][key] || key;
}

// Função para atualizar o conteúdo da página
function updatePageContent() {
  const lang = getCurrentLanguage();
  
  // Atualizar elementos com atributo data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Atualizar placeholders com atributo data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    if (translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // Atualizar o seletor de idioma
  const languageSelector = document.getElementById('language-selector');
  if (languageSelector) {
    languageSelector.value = lang;
  }
  
  // Atualizar o texto do botão de idioma
  const languageButton = document.getElementById('language-button');
  if (languageButton) {
    languageButton.textContent = lang === 'pt' ? 'EN' : 'PT';
    languageButton.title = lang === 'pt' ? 'Switch to English' : 'Mudar para Português';
  }
  
  // Atualizar o atributo lang do HTML
  document.documentElement.lang = lang;
}

// Alternar entre idiomas
function toggleLanguage() {
  const currentLang = getCurrentLanguage();
  const newLang = currentLang === 'pt' ? 'en' : 'pt';
  setLanguage(newLang);
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Criar botão de idioma se não existir
  if (!document.getElementById('language-button')) {
    const navBar = document.querySelector('nav') || document.querySelector('header');
    if (navBar) {
      const languageButton = document.createElement('button');
      languageButton.id = 'language-button';
      languageButton.className = 'language-toggle-btn';
      languageButton.textContent = getCurrentLanguage() === 'pt' ? 'EN' : 'PT';
      languageButton.title = getCurrentLanguage() === 'pt' ? 'Switch to English' : 'Mudar para Português';
      languageButton.onclick = toggleLanguage;
      
      // Adicionar estilos ao botão
      languageButton.style.position = 'absolute';
      languageButton.style.right = '10px';
      languageButton.style.top = '10px';
      languageButton.style.padding = '5px 10px';
      languageButton.style.backgroundColor = '#f0f0f0';
      languageButton.style.border = '1px solid #ccc';
      languageButton.style.borderRadius = '4px';
      languageButton.style.cursor = 'pointer';
      languageButton.style.fontWeight = 'bold';
      languageButton.style.zIndex = '1000';
      
      navBar.appendChild(languageButton);
    }
  }
  
  // Atualizar conteúdo da página
  updatePageContent();
});

// Exportar funções para uso global
window.i18n = {
  getCurrentLanguage,
  setLanguage,
  getTranslation,
  updatePageContent,
  toggleLanguage
};
