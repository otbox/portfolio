


function switchLanguage(language) {

    const imagem1 = '/assets/brasil.png';
    const imagem2 = '/assets/reino-unido.png';
    const image = document.getElementById('language');

    if (image.src.includes(imagem1)) {
        image.src = imagem2;
        language = 'en';
    } else {
        image.src = imagem1;
        language = 'pt';
      }

    console.log("teste");
    if (language === 'pt') {
        const ptElements = document.getElementsByClassName('pt');
        const enElements = document.getElementsByClassName('en');
        image.src = `.${imagem1}`;
    
        for (let i = 0; i < ptElements.length; i++) {
            ptElements[i].style.display = 'block';
        }
        
        for (let i = 0; i < enElements.length; i++) {
            enElements[i].style.display = 'none';
        }
    } else if (language === 'en') {
        image.src = `.${imagem2}`;
        const ptElements = document.getElementsByClassName('pt');
        const enElements = document.getElementsByClassName('en');
    
        for (let i = 0; i < ptElements.length; i++) {
            ptElements[i].style.display = 'none';
        }
    
        for (let i = 0; i < enElements.length; i++) {
            enElements[i].style.display = 'block';
        }
    }
    
}

// Detectar a linguagem padrão do navegador
function detectLanguage() {
    const userLang = navigator.language || navigator.userLanguage;  // Ex: "pt-BR" ou "en-US"
    if (userLang.startsWith('pt')) {
        switchLanguage('pt');
    } else {
        switchLanguage('en');
    }
}

// Chama a função de detecção quando a página carrega
window.onload = detectLanguage;
