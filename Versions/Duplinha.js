(function() {
    'use strict';

    // Configurações do scripts
    const CONFIG = {
        localStorage_key: 'palavreio_game_v2_2',
        modal_display_time: 1000,
        notification_display_time: 5000,
        animation_duration: 500
    };

    // Estilos CSS globais
    const globalStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .palavreio-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(139, 92, 246, 0.9);
            backdrop-filter: blur(8px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 999999;
            opacity: 0;
            animation: fadeIn 0.3s ease-out forwards;
        }

        .palavreio-modal {
            background: linear-gradient(135deg, #6d28d9 0%, #4c1d95 100%);
            border-radius: 20px;
            padding: 0;
            max-width: 520px;
            width: 95%;
            max-height: 85vh;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(139, 92, 246, 0.8);
            transform: scale(0.9) translateY(20px);
            animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .palavreio-modal::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
            border-radius: 20px;
            pointer-events: none;
        }

        .palavreio-header {
            background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
            padding: 30px;
            border-radius: 20px 20px 0 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .palavreio-content {
            background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
            padding: 30px;
            border-radius: 0 0 20px 20px;
            overflow-y: auto;
            max-height: 50vh;
        }

        .palavreio-title {
            font-family: 'Inter', sans-serif;
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            margin: 0 0 12px 0;
            text-align: center;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .palavreio-subtitle {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
            font-weight: 500;
            margin: 0;
        }

        .palavreio-section {
            margin-bottom: 25px;
        }

        .palavreio-section-title {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
            margin: 0 0 15px 0;
            padding-bottom: 8px;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .palavreio-text {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.9);
            margin: 0 0 12px 0;
        }

        .palavreio-link {
            color: #e5e7eb;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .palavreio-link:hover {
            color: #ffffff;
        }

        .palavreio-creator {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 20px;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
        }

        .palavreio-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            border: 3px solid #ffffff;
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        .palavreio-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .palavreio-creator-info h3 {
            font-family: 'Inter', sans-serif;
            margin: 0 0 4px 0;
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
        }

        .palavreio-creator-info h4 {
            font-family: 'Inter', sans-serif;
            margin: 0 0 8px 0;
            font-size: 14px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
        }

        .palavreio-social {
            display: flex;
            gap: 8px;
        }

        .palavreio-social a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: white;
            transition: all 0.2s ease;
            backdrop-filter: blur(4px);
        }

        .palavreio-social a:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }

        .palavreio-button {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #4c1d95, #312e81);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 12px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .palavreio-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            background: linear-gradient(135deg, #5b21b6, #3730a3);
        }

        .palavreio-button:active {
            transform: translateY(0);
        }

        .palavreio-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #7c3aed, #5b21b6);
            color: white;
            padding: 18px 24px;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(124, 58, 237, 0.6);
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-weight: 500;
            z-index: 999998;
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            animation: notificationSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 350px;
        }

        .palavreio-notification::before {
            content: '🎯';
            font-size: 20px;
        }

        .palavreio-word {
            font-weight: 700;
            background: rgba(255, 255, 255, 0.15);
            padding: 4px 8px;
            border-radius: 6px;
            letter-spacing: 1px;
            text-transform: uppercase;
            border: 1px solid rgba(255, 255, 255, 0.3);
            margin: 0 4px;
        }

        .palavreio-words-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 8px;
        }

        .palavreio-word-pair {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .palavreio-word-number {
            font-weight: 600;
            color: rgba(255, 255, 255, 0.8);
            min-width: 20px;
        }

        @keyframes fadeIn {
            to { opacity: 1; }
        }

        @keyframes modalSlideIn {
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }

        @keyframes notificationSlideIn {
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes notificationSlideOut {
            to {
                opacity: 0;
                transform: translateY(20px) scale(0.9);
            }
        }

        .palavreio-fade-out {
            animation: notificationSlideOut 0.3s ease-out forwards;
        }

        @media (max-width: 600px) {
            .palavreio-modal {
                width: 95%;
                margin: 10px;
            }
            
            .palavreio-header,
            .palavreio-content {
                padding: 20px;
            }
            
            .palavreio-title {
                font-size: 24px;
            }
            
            .palavreio-notification {
                bottom: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }

        .palavreio-icon {
            width: 20px;
            height: 20px;
            color: rgba(255, 255, 255, 0.9);
        }
    `;

    // Função para injetar estilos
    function injectStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = globalStyles;
        document.head.appendChild(styleElement);
        return styleElement;
    }

    // Função para criar o modal de introdução
    function createIntroModal() {
        const modalHTML = `
            <div class="palavreio-overlay" id="palavreio-overlay">
                <div class="palavreio-modal">
                    <div class="palavreio-header">
                        <h2 class="palavreio-title">Palavreio Helper</h2>
                        <p class="palavreio-subtitle">Automação inteligente para o jogo Palavreio</p>
                    </div>
                    <div class="palavreio-content">
                        <div class="palavreio-section">
                            <h3 class="palavreio-section-title">
                                <svg class="palavreio-icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                                Sobre o Script
                            </h3>
                            <p class="palavreio-text">
                                Bem-vindo ao <strong>Palavreio Helper</strong>! Esta automação detecta automaticamente as palavras corretas do jogo através do localStorage e exibe uma notificação elegante na tela.
                            </p>
                            <p class="palavreio-text">
                                Desenvolvido para manter seu histórico de acertos perfeito sem perder tempo procurando respostas em sites externos. Clean, simples e eficiente.
                            </p>
                        </div>
                        
                        <div class="palavreio-section">
                            <h3 class="palavreio-section-title">
                                <svg class="palavreio-icon" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                </svg>
                                Desenvolvedor
                            </h3>
                            <div class="palavreio-creator">
                                <div class="palavreio-avatar">
                                    <img src="https://camo.githubusercontent.com/b70b8c5422070cccc3b26ada797e9794ab2eed08ac7889807c7bc5fffaa62a88/68747470733a2f2f696d6775722e636f6d2f4a524b42356f632e706e67" alt="rbnwonknui">
                                </div>
                                <div class="palavreio-creator-info">
                                    <h3>rbnwonknui</h3>
                                    <h4>Full Stack Developer</h4>
                                    <div class="palavreio-social">
                                        <a href="https://github.com/rbnwonknui" target="_blank" title="GitHub">
                                            <svg fill="currentColor" width="16" height="16" viewBox="0 0 496 512">
                                                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button class="palavreio-button" id="palavreio-close-modal">
                            Começar Jogo
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return modalHTML;
    }

    // Função para mostrar notificação das palavras
    function showWordsNotification(words) {
        const notification = document.createElement('div');
        notification.className = 'palavreio-notification';
        
        notification.innerHTML = `
            <div>As palavras são:</div>
            <div class="palavreio-words-container">
                ${words.map((word, index) => `
                    <div class="palavreio-word-pair">
                        <span class="palavreio-word-number">${index + 1}.</span>
                        <span class="palavreio-word">${word}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.body.appendChild(notification);

        // Remover após o tempo configurado
        setTimeout(() => {
            notification.classList.add('palavreio-fade-out');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, CONFIG.notification_display_time);

        return notification;
    }

    // Função para extrair as palavras do localStorage
    function extractWordsFromStorage() {
        const storageData = localStorage.getItem(CONFIG.localStorage_key);
        
        if (!storageData) {
            console.warn(`🎯 Palavreio Helper: Chave "${CONFIG.localStorage_key}" não encontrada no localStorage.`);
            return null;
        }

        try {
            const parsedData = JSON.parse(storageData);
            
            // Verificar se há colunas com goalWords
            if (!parsedData.columns || !Array.isArray(parsedData.columns)) {
                console.warn('🎯 Palavreio Helper: Campo "columns" não encontrado ou não é um array.');
                return null;
            }

            // Extrair todas as palavras das colunas
            const words = parsedData.columns
                .filter(column => column.goalWord && column.goalWord.palavra)
                .map(column => column.goalWord.palavra.toUpperCase());

            if (words.length === 0) {
                console.warn('🎯 Palavreio Helper: Nenhuma palavra encontrada nas colunas.');
                return null;
            }
            
            return words;
        } catch (error) {
            console.error('🎯 Palavreio Helper: Erro ao processar dados do localStorage:', error);
            return null;
        }
    }

    // Função principal de inicialização
    function initialize() {
        console.log('🎯 Palavreio Helper: Inicializando...');
        
        // Injetar estilos
        const styleElement = injectStyles();
        
        // Mostrar modal de introdução
        document.body.insertAdjacentHTML('beforeend', createIntroModal());
        
        // Configurar evento para fechar modal
        const closeButton = document.getElementById('palavreio-close-modal');
        const overlay = document.getElementById('palavreio-overlay');
        
        const closeModal = () => {
            overlay.style.animation = 'fadeIn 0.2s ease-out reverse';
            setTimeout(() => {
                overlay.remove();
                // Mostrar palavras após fechar o modal
                const words = extractWordsFromStorage();
                if (words && words.length > 0) {
                    showWordsNotification(words);
                    console.log(`🎯 Palavreio Helper: Palavras encontradas - ${words.join(', ')}`);
                } else {
                    console.log('🎯 Palavreio Helper: Nenhuma palavra encontrada no momento.');
                }
            }, 200);
        };
        
        closeButton.addEventListener('click', closeModal);
        
        // Fechar ao clicar fora do modal
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        // Cleanup ao sair da página
        window.addEventListener('beforeunload', () => {
            if (styleElement.parentNode) {
                styleElement.remove();
            }
        });
        
        console.log('🎯 Palavreio Helper: Inicialização completa!');
    }

    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

})();
