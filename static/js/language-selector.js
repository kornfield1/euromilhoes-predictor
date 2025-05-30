// Script para gerenciar o seletor de idioma do Previsor Euromilhões
document.addEventListener('DOMContentLoaded', function() {
    console.log("Inicializando seletor de idioma avançado...");
    
    // Detectar o idioma do navegador
    let userLang = navigator.language || navigator.userLanguage;
    console.log("Idioma do navegador detectado:", userLang);
    
    // Verificar se há um idioma salvo no localStorage
    let currentLang = localStorage.getItem('euromilhoes_language');
    
    // Se não houver idioma salvo, definir com base no idioma do navegador
    if (!currentLang) {
        // Verificar se é português de Portugal especificamente
        if (userLang.startsWith('pt-PT')) {
            currentLang = 'pt-PT';
        } 
        // Verificar se é outro tipo de português
        else if (userLang.startsWith('pt')) {
            currentLang = 'pt-PT'; // Padrão para qualquer variante de português
        } 
        // Caso contrário, usar inglês
        else {
            currentLang = 'en';
        }
        
        // Salvar a escolha inicial
        localStorage.setItem('euromilhoes_language', currentLang);
    }
    
    console.log("Idioma atual definido:", currentLang);
    
    // Criar e adicionar o seletor de idioma
    createLanguageSelector(currentLang);
    
    // Verificar se estamos na página de resultados de previsão
    const isPredictionResultsPage = window.location.pathname.includes('/predict');
    
    // Só redirecionar automaticamente se NÃO estivermos na página de resultados
    if (!isPredictionResultsPage) {
        redirectToCorrectLanguagePage(currentLang);
    } else {
        console.log("Estamos na página de resultados de previsão, evitando redirecionamento automático");
    }
    
    // Função para criar o seletor de idioma
    function createLanguageSelector(selectedLang) {
        console.log("Criando seletor de idioma visível...");
        
        // Criar o elemento do seletor
        const languageSelector = document.createElement('div');
        languageSelector.id = 'language-selector';
        languageSelector.className = 'language-selector-container';
        
        // Definir o HTML do seletor
        languageSelector.innerHTML = `
            <div class="language-selector-dropdown">
                <button class="language-selector-btn">
                    <span class="language-icon">🌐</span>
                    <span class="language-text">${selectedLang === 'pt-PT' ? 'PT' : 'EN'}</span>
                    <span class="language-arrow">▼</span>
                </button>
                <div class="language-selector-content">
                    <a href="#" class="language-option ${selectedLang === 'pt-PT' ? 'active' : ''}" data-lang="pt-PT">
                        <span class="language-flag">🇵🇹</span>
                        Português (Portugal, Europa)
                    </a>
                    <a href="#" class="language-option ${selectedLang === 'en' ? 'active' : ''}" data-lang="en">
                        <span class="language-flag">🇬🇧</span>
                        English
                    </a>
                </div>
            </div>
        `;
        
        // Adicionar estilos inline para garantir visibilidade
        const style = document.createElement('style');
        style.textContent = `
            .language-selector-container {
                position: fixed;
                top: 15px;
                right: 15px;
                z-index: 9999;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            .language-selector-dropdown {
                position: relative;
                display: inline-block;
            }
            
            .language-selector-btn {
                background-color: white;
                color: #1976d2;
                border: none;
                border-radius: 4px;
                padding: 8px 12px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            
            .language-selector-btn:hover {
                background-color: #f0f0f0;
            }
            
            .language-icon {
                font-size: 16px;
            }
            
            .language-text {
                font-size: 14px;
            }
            
            .language-arrow {
                font-size: 10px;
            }
            
            .language-selector-content {
                display: none;
                position: absolute;
                right: 0;
                background-color: white;
                min-width: 220px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                border-radius: 4px;
                z-index: 1;
                margin-top: 5px;
            }
            
            .language-selector-dropdown:hover .language-selector-content {
                display: block;
            }
            
            .language-option {
                color: #333;
                padding: 10px 15px;
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .language-option:hover {
                background-color: #f5f5f5;
            }
            
            .language-option.active {
                background-color: #e3f2fd;
                font-weight: bold;
            }
            
            .language-flag {
                font-size: 16px;
            }
            
            @media (max-width: 768px) {
                .language-selector-container {
                    top: 10px;
                    right: 10px;
                }
                
                .language-selector-btn {
                    padding: 6px 10px;
                }
            }
        `;
        
        // Adicionar o estilo e o seletor ao documento
        document.head.appendChild(style);
        document.body.appendChild(languageSelector);
        
        // Adicionar event listeners para as opções de idioma
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const newLang = this.getAttribute('data-lang');
                console.log("Mudando idioma para:", newLang);
                
                // Salvar a escolha do idioma
                localStorage.setItem('euromilhoes_language', newLang);
                
                // Se estamos na página de resultados, apenas atualizar a interface sem redirecionar
                if (isPredictionResultsPage) {
                    console.log("Estamos na página de resultados, apenas atualizando a interface sem redirecionar");
                    updateLanguageDisplay(newLang);
                    // Mostrar mensagem informativa para o usuário
                    showLanguageChangeMessage(newLang);
                } else {
                    // Redirecionar para a página correta
                    redirectToCorrectLanguagePage(newLang);
                }
            });
        });
        
        console.log("Seletor de idioma criado com sucesso!");
    }
    
    // Função para mostrar mensagem de mudança de idioma na página de resultados
    function showLanguageChangeMessage(lang) {
        // Criar elemento de mensagem
        const messageElement = document.createElement('div');
        messageElement.className = 'language-change-message';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${lang === 'pt-PT' ? 
                    'Idioma alterado para Português. Para ver os resultados neste idioma, gere uma nova previsão.' : 
                    'Language changed to English. To see results in this language, generate a new prediction.'}
                </p>
                <button class="close-btn">×</button>
            </div>
        `;
        
        // Adicionar estilos
        const style = document.createElement('style');
        style.textContent = `
            .language-change-message {
                position: fixed;
                top: 70px;
                right: 15px;
                background-color: #f8f9fa;
                border-left: 4px solid #1976d2;
                padding: 10px 15px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                border-radius: 4px;
                z-index: 9998;
                max-width: 300px;
                animation: slideIn 0.3s ease-out;
            }
            
            .message-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            }
            
            .message-content p {
                margin: 0;
                font-size: 14px;
                color: #333;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: #666;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            
            .close-btn:hover {
                color: #333;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(messageElement);
        
        // Adicionar evento para fechar a mensagem
        const closeBtn = messageElement.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(messageElement);
        });
        
        // Remover a mensagem automaticamente após 5 segundos
        setTimeout(function() {
            if (document.body.contains(messageElement)) {
                document.body.removeChild(messageElement);
            }
        }, 5000);
    }
    
    // Função para redirecionar para a página correta com base no idioma
    function redirectToCorrectLanguagePage(lang) {
        // Obter o caminho atual
        let currentPath = window.location.pathname;
        
        // Normalizar o caminho para evitar problemas com barras duplicadas
        if (currentPath.endsWith('/') && currentPath !== '/') {
            currentPath = currentPath.slice(0, -1);
        }
        
        // Verificar se estamos na raiz
        const isRoot = currentPath === '' || currentPath === '/';
        
        // Verificar se já estamos em uma página com prefixo /en/
        const hasEnPrefix = currentPath.startsWith('/en');
        
        // Verificar se estamos em uma página de previsão (POST-only)
        const isPredictPage = currentPath === '/predict' || currentPath === '/en/predict';
        
        // Se estamos em uma página de previsão, não redirecionar
        if (isPredictPage) {
            console.log("Estamos na página de previsão, evitando redirecionamento");
            updateLanguageDisplay(lang);
            return;
        }
        
        // Determinar o novo caminho com base no idioma selecionado
        let newPath;
        
        if (lang === 'pt-PT') {
            // Se estamos mudando para português
            if (hasEnPrefix) {
                // Se estamos em uma página com prefixo /en/, remover o prefixo
                if (currentPath === '/en' || currentPath === '/en/') {
                    // Se estamos na raiz em inglês, ir para a raiz em português
                    newPath = '/';
                } else {
                    // Caso contrário, remover o prefixo /en
                    newPath = currentPath.replace(/^\/en/, '');
                    if (newPath === '') newPath = '/';
                }
            } else {
                // Já estamos em uma página em português, não precisa mudar
                newPath = currentPath;
            }
        } else if (lang === 'en') {
            // Se estamos mudando para inglês
            if (!hasEnPrefix) {
                // Se não estamos em uma página com prefixo /en/
                if (isRoot) {
                    // Se estamos na raiz, ir para /en
                    newPath = '/en';
                } else {
                    // Caso contrário, adicionar o prefixo /en
                    newPath = '/en' + currentPath;
                }
            } else {
                // Já estamos em uma página em inglês, não precisa mudar
                newPath = currentPath;
            }
        }
        
        // Verificar se o caminho mudou
        if (newPath !== currentPath) {
            console.log("Redirecionando para:", newPath);
            window.location.href = newPath;
        } else {
            console.log("Já estamos na página correta para o idioma:", lang);
            // Atualizar a interface sem recarregar a página
            updateLanguageDisplay(lang);
        }
    }
    
    // Função para atualizar a exibição do idioma sem recarregar a página
    function updateLanguageDisplay(lang) {
        const languageText = document.querySelector('.language-text');
        if (languageText) {
            languageText.textContent = lang === 'pt-PT' ? 'PT' : 'EN';
        }
        
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            if (optionLang === lang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
});
