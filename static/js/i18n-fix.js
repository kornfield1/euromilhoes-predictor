// Arquivo para gerenciar a internacionalização do Previsor Euromilhões
document.addEventListener('DOMContentLoaded', function() {
  console.log("Inicializando sistema de internacionalização...");
  
  // Carregar as traduções
  const translations = window.translations || {};
  console.log("Traduções carregadas:", translations);
  
  // Detectar o idioma do navegador
  let userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.split('-')[0]; // Pegar apenas a parte principal (pt-BR -> pt)
  console.log("Idioma do navegador detectado:", userLang);
  
  // Verificar se há um idioma salvo no localStorage
  let currentLang = localStorage.getItem('euromilhoes_language') || (userLang === 'pt' ? 'pt' : 'en');
  console.log("Idioma atual:", currentLang);
  
  // Adicionar seletor de idioma ao menu
  addLanguageSelector(currentLang);
  
  // Aplicar traduções iniciais
  applyTranslations(currentLang);
  
  // Função para adicionar seletor de idioma
  function addLanguageSelector(selectedLang) {
    console.log("Adicionando seletor de idioma...");
    
    // Criar o elemento de seleção de idioma
    const navbarNav = document.querySelector('.navbar-nav');
    if (!navbarNav) {
      console.error("Elemento .navbar-nav não encontrado!");
      return;
    }
    
    // Verificar se o seletor já existe
    if (document.getElementById('languageDropdown')) {
      console.log("Seletor de idioma já existe, atualizando...");
      document.getElementById('languageDropdown').innerHTML = 
        `<i class="fas fa-globe me-1"></i> ${selectedLang === 'pt' ? 'PT' : 'EN'}`;
      return;
    }
    
    const langSelector = document.createElement('li');
    langSelector.className = 'nav-item dropdown ms-2';
    langSelector.innerHTML = `
      <a class="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fas fa-globe me-1"></i> ${selectedLang === 'pt' ? 'PT' : 'EN'}
      </a>
      <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
        <li><a class="dropdown-item ${selectedLang === 'pt' ? 'active' : ''}" href="#" data-lang="pt">Português</a></li>
        <li><a class="dropdown-item ${selectedLang === 'en' ? 'active' : ''}" href="#" data-lang="en">English</a></li>
      </ul>
    `;
    
    // Adicionar ao navbar
    navbarNav.appendChild(langSelector);
    console.log("Seletor de idioma adicionado com sucesso!");
    
    // Adicionar event listeners para mudança de idioma
    setTimeout(() => {
      const langOptions = document.querySelectorAll('[data-lang]');
      console.log("Opções de idioma encontradas:", langOptions.length);
      
      langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
          e.preventDefault();
          const newLang = this.getAttribute('data-lang');
          console.log("Mudando idioma para:", newLang);
          
          localStorage.setItem('euromilhoes_language', newLang);
          applyTranslations(newLang);
          
          // Atualizar texto do dropdown
          const dropdown = document.getElementById('languageDropdown');
          if (dropdown) {
            dropdown.innerHTML = `<i class="fas fa-globe me-1"></i> ${newLang === 'pt' ? 'PT' : 'EN'}`;
          }
          
          // Atualizar classes active
          langOptions.forEach(opt => opt.classList.remove('active'));
          this.classList.add('active');
        });
      });
    }, 500);
  }
  
  // Função para aplicar traduções
  function applyTranslations(lang) {
    console.log("Aplicando traduções para:", lang);
    
    // Verificar se o idioma existe nas traduções
    if (!translations[lang]) {
      console.error(`Traduções para o idioma ${lang} não encontradas.`);
      return;
    }
    
    // Aplicar traduções aos elementos com atributo data-i18n
    const i18nElements = document.querySelectorAll('[data-i18n]');
    console.log("Elementos com data-i18n encontrados:", i18nElements.length);
    
    i18nElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
        console.log(`Traduzido: ${key} -> ${translations[lang][key]}`);
      } else {
        console.warn(`Chave de tradução não encontrada: ${key}`);
      }
    });
    
    // Aplicar traduções específicas para elementos sem data-i18n
    updateSpecificElements(lang);
    
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = lang;
    console.log("Idioma do documento atualizado para:", lang);
  }
  
  // Função para atualizar elementos específicos
  function updateSpecificElements(lang) {
    console.log("Atualizando elementos específicos...");
    
    // Título da página
    document.title = lang === 'pt' ? 'Previsor Euromilhões - Página Inicial' : 'EuroMillions Predictor - Home';
    
    // Navbar - Usando seletores mais robustos
    updateElementBySelector('.navbar-brand', translations[lang].app_title);
    updateElementBySelector('.navbar-nav li:nth-child(1) .nav-link', translations[lang].nav_home, true);
    updateElementBySelector('.navbar-nav li:nth-child(2) .nav-link', translations[lang].nav_statistics, true);
    updateElementBySelector('.navbar-nav li:nth-child(3) .nav-link', translations[lang].nav_reports, true);
    updateElementBySelector('.navbar-nav li:nth-child(4) .nav-link', translations[lang].nav_about, true);
    
    // Banner principal
    updateElementBySelector('h1.display-4', translations[lang].app_title);
    updateElementBySelector('p.lead', translations[lang].app_description);
    updateElementBySelector('#btn-gerar-previsao', translations[lang].btn_generate, true);
    updateElementBySelector('a.btn-outline-secondary', translations[lang].btn_view_stats, true);
    
    // Seção de previsões
    updateElementBySelector('h2.text-center', translations[lang].prediction_title);
    updateElementBySelector('.card-header h5', translations[lang].new_prediction);
    updateElementBySelector('label[for="metodo"]', translations[lang].method_label);
    updateSelectOptionBySelector('#metodo option[value="hibrido"]', translations[lang].method_hybrid);
    updateSelectOptionBySelector('#metodo option[value="frequencia"]', translations[lang].method_frequency);
    updateSelectOptionBySelector('#metodo option[value="recencia"]', translations[lang].method_recency);
    updateElementBySelector('label[for="num_previsoes"]', translations[lang].num_predictions);
    updateSelectOptionBySelector('#num_previsoes option[value="1"]', translations[lang].prediction_singular);
    updateSelectOptionBySelector('#num_previsoes option[value="3"]', translations[lang].prediction_plural.replace('{count}', '3'));
    updateSelectOptionBySelector('#num_previsoes option[value="5"]', translations[lang].prediction_plural.replace('{count}', '5'));
    updateSelectOptionBySelector('#num_previsoes option[value="10"]', translations[lang].prediction_plural.replace('{count}', '10'));
    updateElementBySelector('button[type="submit"]', translations[lang].btn_generate, true);
    updateElementBySelector('#loading p', translations[lang].loading);
    
    // Previsões recentes
    updateElementBySelector('h3.text-center', translations[lang].recent_predictions);
    
    // Estatísticas rápidas
    updateElementBySelector('section:nth-of-type(2) h2', translations[lang].quick_stats);
    
    // Rodapé
    updateElementBySelector('footer h5', translations[lang].app_title);
    updateElementBySelector('footer p.mb-0', translations[lang].footer_description);
    updateElementBySelector('footer p.text-muted.small em', translations[lang].disclaimer);
    updateElementBySelector('footer p.mt-2', translations[lang].copyright);
    
    console.log("Elementos específicos atualizados com sucesso!");
  }
  
  // Funções auxiliares melhoradas
  function updateElementBySelector(selector, text, preserveIcon = false) {
    const elements = document.querySelectorAll(selector);
    console.log(`Atualizando ${elements.length} elementos com seletor: ${selector}`);
    
    elements.forEach(el => {
      if (preserveIcon && el.querySelector('i')) {
        const icon = el.querySelector('i').outerHTML;
        el.innerHTML = icon + ' ' + text;
      } else {
        el.textContent = text;
      }
    });
  }
  
  function updateSelectOptionBySelector(selector, text) {
    const option = document.querySelector(selector);
    if (option) {
      option.textContent = text;
      console.log(`Opção atualizada: ${selector} -> ${text}`);
    } else {
      console.warn(`Opção não encontrada: ${selector}`);
    }
  }
});
