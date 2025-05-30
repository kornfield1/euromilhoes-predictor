// Arquivo de tradução para o Previsor Euromilhões
const translations = {
  pt: {
    // Navegação
    "nav_home": "Início",
    "nav_statistics": "Estatísticas",
    "nav_reports": "Relatórios",
    "nav_about": "Sobre",
    
    // Página inicial
    "app_title": "Previsor Euromilhões",
    "app_description": "Descubra os números com maior probabilidade de sair no próximo sorteio do Euromilhões, baseado em análise estatística avançada.",
    "btn_generate": "Gerar Previsão",
    "btn_view_stats": "Ver Estatísticas",
    
    // Formulário de previsão
    "prediction_title": "Previsões para o Euromilhões",
    "new_prediction": "Gerar Nova Previsão",
    "method_label": "Método de Previsão",
    "method_hybrid": "Híbrido (Recomendado)",
    "method_frequency": "Baseado em Frequência",
    "method_recency": "Baseado em Recência",
    "num_predictions": "Número de Previsões",
    "prediction_singular": "1 previsão",
    "prediction_plural": "{count} previsões",
    "loading": "A gerar previsões...",
    
    // Resultados
    "recent_predictions": "Previsões Recentes",
    "hybrid_method": "Método Híbrido",
    "frequency_method": "Método de Frequência",
    "recency_method": "Método de Recência",
    "generated_on": "Gerado em",
    
    // Estatísticas
    "quick_stats": "Estatísticas Rápidas",
    "most_frequent_number": "Número Mais Frequente",
    "appeared": "Apareceu {count} vezes",
    "most_frequent_star": "Estrela Mais Frequente",
    "average_sum": "Soma Média dos Números",
    "sum_range": "Varia entre {min} e {max}",
    "consecutive_draws": "Sorteios com Consecutivos",
    "consecutive_percentage": "Percentagem de sorteios com números consecutivos",
    "view_all_stats": "Ver Todas as Estatísticas",
    
    // Rodapé
    "footer_description": "Uma ferramenta de análise estatística para o Euromilhões.",
    "disclaimer": "Nota: Este é um projeto de demonstração. Os resultados são baseados em análise estatística e não garantem ganhos.",
    "copyright": "© 2025 Previsor Euromilhões",
    
    // Idioma
    "language": "Idioma",
    "portuguese": "Português",
    "english": "Inglês"
  },
  
  en: {
    // Navigation
    "nav_home": "Home",
    "nav_statistics": "Statistics",
    "nav_reports": "Reports",
    "nav_about": "About",
    
    // Home page
    "app_title": "EuroMillions Predictor",
    "app_description": "Discover the numbers most likely to appear in the next EuroMillions draw, based on advanced statistical analysis.",
    "btn_generate": "Generate Prediction",
    "btn_view_stats": "View Statistics",
    
    // Prediction form
    "prediction_title": "EuroMillions Predictions",
    "new_prediction": "Generate New Prediction",
    "method_label": "Prediction Method",
    "method_hybrid": "Hybrid (Recommended)",
    "method_frequency": "Frequency-Based",
    "method_recency": "Recency-Based",
    "num_predictions": "Number of Predictions",
    "prediction_singular": "1 prediction",
    "prediction_plural": "{count} predictions",
    "loading": "Generating predictions...",
    
    // Results
    "recent_predictions": "Recent Predictions",
    "hybrid_method": "Hybrid Method",
    "frequency_method": "Frequency Method",
    "recency_method": "Recency Method",
    "generated_on": "Generated on",
    
    // Statistics
    "quick_stats": "Quick Statistics",
    "most_frequent_number": "Most Frequent Number",
    "appeared": "Appeared {count} times",
    "most_frequent_star": "Most Frequent Star",
    "average_sum": "Average Sum of Numbers",
    "sum_range": "Ranges between {min} and {max}",
    "consecutive_draws": "Draws with Consecutive Numbers",
    "consecutive_percentage": "Percentage of draws with consecutive numbers",
    "view_all_stats": "View All Statistics",
    
    // Footer
    "footer_description": "A statistical analysis tool for EuroMillions.",
    "disclaimer": "Note: This is a demonstration project. Results are based on statistical analysis and do not guarantee winnings.",
    "copyright": "© 2025 EuroMillions Predictor",
    
    // Language
    "language": "Language",
    "portuguese": "Portuguese",
    "english": "English"
  }
};

// Exportar as traduções
if (typeof module !== 'undefined' && module.exports) {
  module.exports = translations;
} else {
  // Para uso no navegador
  window.translations = translations;
}
