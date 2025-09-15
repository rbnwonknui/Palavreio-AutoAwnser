(function() {
    const chave = 'palavreio_game_v2_1';
    const valor = localStorage.getItem(chave);

    if (!valor) {
        console.warn(`Chave "${chave}" não encontrada no localStorage.`);
        return;
    }

    let palavra;
    try {
        const dados = JSON.parse(valor);
        palavra = dados.columns?.[0]?.goalWord?.palavra;
        if (!palavra) {
            console.warn('Campo "palavra" não encontrado.');
            return;
        }
    } catch (e) {
        console.error('Erro ao fazer parse do JSON:', e);
        return;
    }

    const estilo = document.createElement('style');
    estilo.textContent = `
        .notificacao-palavra {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #4b6cb7, #182848);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-family: sans-serif;
            font-size: 16px;
            z-index: 9999;
            opacity: 0;
            animation: fadein 0.5s forwards, fadeout 0.5s 4.5s forwards;
        }

        @keyframes fadein {
            to { opacity: 1; }
        }

        @keyframes fadeout {
            to { opacity: 0; transform: translateY(10px); }
        }
    `;
    document.head.appendChild(estilo);

    const div = document.createElement('div');
    div.className = 'notificacao-palavra';
    div.textContent = `A palavra correta é: ${palavra}`;
    document.body.appendChild(div);

    setTimeout(() => {
        div.remove();
        estilo.remove();
    }, 5000);
})();
