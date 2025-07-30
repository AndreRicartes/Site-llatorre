// Script para o site do Centro Assistencial Espírita Raphael Latorre

document.addEventListener('DOMContentLoaded', function() {
    // Menu móvel
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Acessibilidade: aria-expanded
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            // Criar overlay quando o menu estiver aberto
            if (isExpanded) {
                const overlay = document.createElement('div');
                overlay.className = 'menu-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
                overlay.style.zIndex = '999';
                
                document.body.appendChild(overlay);
                
                overlay.addEventListener('click', function() {
                    nav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', false);
                    document.body.removeChild(overlay);
                });
            } else {
                const overlay = document.querySelector('.menu-overlay');
                if (overlay) {
                    document.body.removeChild(overlay);
                }
            }
        });
    }

    // Tamanho da fonte ajustável
    const createFontSizeControls = () => {
        const controls = document.createElement('div');
        controls.className = 'font-size-controls';
        
        const increaseBtn = document.createElement('button');
        increaseBtn.innerHTML = 'A+';
        increaseBtn.setAttribute('aria-label', 'Aumentar tamanho da fonte');
        
        const decreaseBtn = document.createElement('button');
        decreaseBtn.innerHTML = 'A-';
        decreaseBtn.setAttribute('aria-label', 'Diminuir tamanho da fonte');
        
        controls.appendChild(increaseBtn);
        controls.appendChild(decreaseBtn);
        
        document.body.appendChild(controls);
        
        // Obter tamanho atual da fonte
        let currentSize = parseInt(window.getComputedStyle(document.body).fontSize);
        
        increaseBtn.addEventListener('click', () => {
            if (currentSize < 24) {
                currentSize += 2;
                document.body.style.fontSize = currentSize + 'px';
                localStorage.setItem('fontSize', currentSize);
            }
        });
        
        decreaseBtn.addEventListener('click', () => {
            if (currentSize > 12) {
                currentSize -= 2;
                document.body.style.fontSize = currentSize + 'px';
                localStorage.setItem('fontSize', currentSize);
            }
        });
        
        // Verificar se há um tamanho salvo no localStorage
        const savedSize = localStorage.getItem('fontSize');
        if (savedSize) {
            currentSize = parseInt(savedSize);
            document.body.style.fontSize = currentSize + 'px';
        }
    };
    
    createFontSizeControls();
    
    // Animações de scroll
    const animateOnScroll = () => {
        const elementsToAnimate = document.querySelectorAll('.atividade-item, .evento-card, .assistencia-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elementsToAnimate.forEach(element => {
            // Inicialmente, definir os elementos como invisíveis e deslocados
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            observer.observe(element);
        });
    };
    
    // Verificar se o navegador suporta IntersectionObserver
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }
    
    // Formulário de contato com validação
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let valid = true;
            const name = contactForm.querySelector('#name');
            const email = contactForm.querySelector('#email');
            const message = contactForm.querySelector('#message');
            
            // Validação simples
            if (!name.value.trim()) {
                showError(name, 'Por favor, informe seu nome');
                valid = false;
            } else {
                clearError(name);
            }
            
            if (!email.value.trim()) {
                showError(email, 'Por favor, informe seu e-mail');
                valid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Por favor, informe um e-mail válido');
                valid = false;
            } else {
                clearError(email);
            }
            
            if (!message.value.trim()) {
                showError(message, 'Por favor, escreva sua mensagem');
                valid = false;
            } else {
                clearError(message);
            }
            
            if (valid) {
                // Aqui você pode adicionar o código para enviar o formulário
                // Por enquanto, vamos apenas simular o envio
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = 'Enviando...';
                
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    
                    // Mostrar mensagem de sucesso
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert-success';
                    successMessage.style.backgroundColor = '#dff0d8';
                    successMessage.style.color = '#3c763d';
                    successMessage.style.padding = '15px';
                    successMessage.style.marginBottom = '20px';
                    successMessage.style.borderRadius = '4px';
                    successMessage.innerHTML = '<strong>Mensagem enviada com sucesso!</strong> Entraremos em contato em breve.';
                    
                    contactForm.parentNode.insertBefore(successMessage, contactForm);
                    
                    // Remover a mensagem após alguns segundos
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    function showError(input, message) {
        // Remover mensagem de erro anterior, se existir
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Criar nova mensagem de erro
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#a94442';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        input.style.borderColor = '#a94442';
        input.parentNode.appendChild(errorDiv);
    }
    
    function clearError(input) {
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Inicializar formulário de busca
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Aqui você pode implementar a lógica de busca
                // Por enquanto, vamos apenas redirecionar para uma página de resultados fictícia
                window.location.href = `pages/resultados-busca.html?q=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
});
