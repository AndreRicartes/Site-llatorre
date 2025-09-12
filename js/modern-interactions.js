// === JAVASCRIPT MODERNO E INTERATIVO ===
// Centro Assistencial Espírita Raphael Latorre - Funcionalidades Avançadas

class ModernWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.initInteractions();
        this.initAccessibility();
        this.initPerformance();
    }

    // === CONFIGURAÇÃO DE EVENT LISTENERS ===
    setupEventListeners() {
        // DOM carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }

        // Scroll otimizado
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Resize otimizado
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 150);
        });
    }

    onDOMReady() {
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initFormEnhancements();
        this.initLoadingStates();
        // Desabilitar efeitos com movimento se usuário preferir menos movimento
        const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReduced) {
            this.initParallaxEffects();
        }
        this.initCarousel();
        this.initThemeToggle();
        this.showPageWithAnimation();
    }

    // === ANIMAÇÕES MODERNAS ===
    initAnimations() {
    // Intersection Observer para animações de entrada
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // pular animações
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Delay escalonado para efeito cascata
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                    
                    this.animationObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const animateElements = document.querySelectorAll(
            '.card, .activity-card, .event-card, .inspiration-section, .footer-section'
        );

        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px) scale(0.95)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transitionDelay = `${index * 0.05}s`;
            
            this.animationObserver.observe(element);
        });
    }

    // Animação de entrada da página
    showPageWithAnimation() {
        const header = document.querySelector('.header-modern');
        const hero = document.querySelector('.hero-modern');

        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                header.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }

        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = '0';
                heroContent.style.transform = 'translateY(40px)';
                
                setTimeout(() => {
                    heroContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 300);
            }
        }
    }

    // === MICRO-INTERAÇÕES ===
    initInteractions() {
        this.initMagneticEffects();
        this.initHoverEffects();
        this.initButtonAnimations();
        this.initCardInteractions();
    }

    initMagneticEffects() {
        const magneticElements = document.querySelectorAll('.btn-primary, .activity-icon, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }

    initHoverEffects() {
        const cards = document.querySelectorAll('.card, .activity-card, .event-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                
                // Efeito de glow sutil
                const glowEffect = card.querySelector('.card-glow') || document.createElement('div');
                if (!card.querySelector('.card-glow')) {
                    glowEffect.className = 'card-glow';
                    glowEffect.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: linear-gradient(135deg, rgba(67, 56, 202, 0.1), rgba(99, 102, 241, 0.05));
                        border-radius: inherit;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                        pointer-events: none;
                        z-index: -1;
                    `;
                    card.style.position = 'relative';
                    card.appendChild(glowEffect);
                }
                glowEffect.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                const glowEffect = card.querySelector('.card-glow');
                if (glowEffect) {
                    glowEffect.style.opacity = '0';
                }
            });
        });
    }

    initButtonAnimations() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-accent');
        
        buttons.forEach(button => {
            // Efeito ripple
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // CSS para animação ripple
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initCardInteractions() {
        const activityCards = document.querySelectorAll('.activity-card');
        
        activityCards.forEach(card => {
            const icon = card.querySelector('.activity-icon');
            
            card.addEventListener('mouseenter', () => {
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                    icon.style.filter = 'brightness(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = '';
                    icon.style.filter = '';
                }
            });
        });
    }

    // === MENU MÓVEL MODERNO ===
    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-modern');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!menuToggle || !nav) return;

        let isMenuOpen = false;

        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            this.toggleMobileMenu(isMenuOpen, nav, menuToggle);
        });

        // Fechar menu ao clicar em links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) {
                    isMenuOpen = false;
                    this.toggleMobileMenu(false, nav, menuToggle);
                }
            });
        });

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                isMenuOpen = false;
                this.toggleMobileMenu(false, nav, menuToggle);
            }
        });
    }

    toggleMobileMenu(isOpen, nav, toggle) {
        if (isOpen) {
            nav.classList.add('mobile-active');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            
            // Overlay
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(5px);
                z-index: 998;
                animation: fadeIn 0.3s ease;
            `;
            
            overlay.addEventListener('click', () => {
                this.toggleMobileMenu(false, nav, toggle);
            });
            
            document.body.appendChild(overlay);
        } else {
            nav.classList.remove('mobile-active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) overlay.remove();
        }
    }

    // === SCROLL SUAVE ===
    initSmoothScroll() {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');
        
        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const headerHeight = document.querySelector('.header-modern')?.offsetHeight || 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // === ESTADOS DE LOADING ===
    initLoadingStates() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            if (button.classList.contains('loading-enabled')) {
                button.addEventListener('click', () => {
                    this.showButtonLoading(button);
                });
            }
        });
    }

    showButtonLoading(button) {
        if (button.classList.contains('loading')) return;
        
        const originalText = button.innerHTML;
        button.classList.add('loading');
        button.innerHTML = '<span class="spinner"></span> Carregando...';
        button.disabled = true;
        
        // Remover loading após 2 segundos (simular)
        setTimeout(() => {
            button.classList.remove('loading');
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }

    // === MELHORIAS DE FORMULÁRIO ===
    initFormEnhancements() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                // Labels flutuantes
                this.enhanceInput(input);
                
                // Validação em tempo real
                input.addEventListener('blur', () => this.validateInput(input));
                input.addEventListener('input', () => this.clearInputError(input));
            });
            
            // Envio de formulário melhorado
            form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
        });
    }

    enhanceInput(input) {
        const wrapper = input.parentElement;
        const label = wrapper.querySelector('label');
        
        if (label) {
            label.classList.add('floating-label');
            
            input.addEventListener('focus', () => label.classList.add('focused'));
            input.addEventListener('blur', () => {
                if (!input.value) label.classList.remove('focused');
            });
            
            if (input.value) label.classList.add('focused');
        }
    }

    validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        let message = '';
        
        if (input.required && !value) {
            isValid = false;
            message = 'Este campo é obrigatório';
        } else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Digite um email válido';
        }
        
        if (!isValid) {
            this.showInputError(input, message);
        } else {
            this.clearInputError(input);
        }
        
        return isValid;
    }

    showInputError(input, message) {
        this.clearInputError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'input-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            animation: fadeIn 0.3s ease;
        `;
        
        input.classList.add('error');
        input.parentElement.appendChild(errorDiv);
    }

    clearInputError(input) {
        input.classList.remove('error');
        const errorDiv = input.parentElement.querySelector('.input-error');
        if (errorDiv) errorDiv.remove();
    }

    handleFormSubmit(e, form) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            this.showFormSuccess(form);
        }
    }

    showFormSuccess(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) this.showButtonLoading(submitBtn);
        
        setTimeout(() => {
            form.reset();
            this.showNotification('Mensagem enviada com sucesso!', 'success');
        }, 2000);
    }

    // === EFEITOS PARALLAX ===
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-background');
        
        parallaxElements.forEach(element => {
            this.parallaxElements = this.parallaxElements || [];
            this.parallaxElements.push(element);
        });
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Parallax
        if (this.parallaxElements) {
            this.parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
        
        // Header no scroll
        const header = document.querySelector('.header-modern');
        if (header) {
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    handleResize() {
        // Recalcular animações se necessário
        if (window.innerWidth > 768) {
            const mobileMenu = document.querySelector('.nav-modern.mobile-active');
            if (mobileMenu) {
                mobileMenu.classList.remove('mobile-active');
                document.body.style.overflow = '';
            }
        }
    }

    // === ACESSIBILIDADE ===
    initAccessibility() {
        // Navegação por teclado
        this.initKeyboardNavigation();
        
        // Configurações de acessibilidade
        this.initAccessibilityControls();
        
        // Anúncios para screen readers
        this.initScreenReaderSupport();
    }

    // === TEMA ESCURO/CLARO ===
    initThemeToggle() {
        const root = document.documentElement;
        const saved = localStorage.getItem('theme');
        if (saved === 'dark') root.setAttribute('data-theme', 'dark');

        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        const setIcon = () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        };
        setIcon();

        btn.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            if (isDark) {
                root.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                root.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            setIcon();
        });
    }

    initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    initAccessibilityControls() {
        const fontIncBtn = document.getElementById('font-increase');
        const fontDecBtn = document.getElementById('font-decrease');
        
        if (fontIncBtn && fontDecBtn) {
            let currentSize = 16;
            
            fontIncBtn.addEventListener('click', () => {
                currentSize = Math.min(currentSize + 1, 24);
                document.documentElement.style.fontSize = currentSize + 'px';
                localStorage.setItem('fontSize', currentSize);
            });
            
            fontDecBtn.addEventListener('click', () => {
                currentSize = Math.max(currentSize - 1, 14);
                document.documentElement.style.fontSize = currentSize + 'px';
                localStorage.setItem('fontSize', currentSize);
            });
            
            // Restaurar tamanho salvo
            const savedSize = localStorage.getItem('fontSize');
            if (savedSize) {
                currentSize = parseInt(savedSize);
                document.documentElement.style.fontSize = currentSize + 'px';
            }
        }
    }

    initScreenReaderSupport() {
        // Anunciar mudanças de página
        const pageTitle = document.title;
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Página carregada: ${pageTitle}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => announcement.remove(), 1000);
    }

    // === PERFORMANCE ===
    initPerformance() {
        // Lazy loading de imagens
        this.initLazyLoading();
        
        // Preload de páginas importantes
        this.preloadImportantPages();
    }

    // === CARROSSEL HISTÓRIA (SOBRE) ===
    initCarousel() {
        // Estrutura esperada (sobre.html):
        // .historia-carousel .carousel-container > .carousel-track > .carousel-slide*
        // Botões com onclick="anteriorSlide()/proximoSlide()" e dots com onclick="irParaSlide(n)"
        const container = document.querySelector('.historia-carousel .carousel-container');
        if (!container) return;

        const track = container.querySelector('.carousel-track');
        const slides = container.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dots .dot');
        const progressBar = document.querySelector('.historia-carousel .timeline-progress .bar');

        if (!track || !slides.length) return;

        let indiceSlide = 0;

        const ajustarCarrossel = () => {
            const slideWidthPct = 100 / slides.length;
            track.style.width = `${slides.length * 100}%`;
            slides.forEach(slide => {
                slide.style.flex = `0 0 ${slideWidthPct}%`;
            });
        };

        const atualizarA11y = () => {
            dots.forEach((dot, i) => {
                const selected = i === indiceSlide;
                dot.classList.toggle('active', selected);
                dot.setAttribute('aria-selected', selected ? 'true' : 'false');
            });
            // Atualiza barra de progresso
            if (progressBar) {
                const pct = ((indiceSlide) / (slides.length - 1)) * 100;
                progressBar.style.width = `${pct}%`;
            }
        };

        const mostrarSlide = (n) => {
            if (!slides.length) return;
            indiceSlide = (n + slides.length) % slides.length;
            const translateX = -(100 / slides.length) * indiceSlide;
            track.style.transform = `translateX(${translateX}%)`;
            atualizarA11y();
        };

        // Expor funções globais para compatibilidade com atributos onclick existentes
        window.proximoSlide = () => mostrarSlide(indiceSlide + 1);
        window.anteriorSlide = () => mostrarSlide(indiceSlide - 1);
        window.irParaSlide = (n) => mostrarSlide(n - 1);

        ajustarCarrossel();
        mostrarSlide(0);
        window.addEventListener('resize', ajustarCarrossel);

        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            const areaVisivel = document.querySelector('.historia-carousel');
            if (!areaVisivel) return;
            if (e.key === 'ArrowRight') window.proximoSlide();
            if (e.key === 'ArrowLeft') window.anteriorSlide();
        });

        // Suporte a swipe em touch
        let startX = 0;
        let isTouching = false;
        const onTouchStart = (e) => { isTouching = true; startX = e.touches[0].clientX; };
        const onTouchMove = (e) => { if (!isTouching) return; };
        const onTouchEnd = (e) => {
            if (!isTouching) return;
            const endX = e.changedTouches[0].clientX;
            const delta = endX - startX;
            if (Math.abs(delta) > 40) {
                if (delta < 0) window.proximoSlide(); else window.anteriorSlide();
            }
            isTouching = false;
        };
        track.addEventListener('touchstart', onTouchStart, { passive: true });
        track.addEventListener('touchmove', onTouchMove, { passive: true });
        track.addEventListener('touchend', onTouchEnd, { passive: true });
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }

    preloadImportantPages() {
        const importantLinks = document.querySelectorAll('a[href*="sobre"], a[href*="atividades"]');
        
        importantLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const url = link.href;
                if (!document.querySelector(`link[href="${url}"]`)) {
                    const prefetch = document.createElement('link');
                    prefetch.rel = 'prefetch';
                    prefetch.href = url;
                    document.head.appendChild(prefetch);
                }
            });
        });
    }

    // === UTILITÁRIOS ===
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// CSS anteriormente injetado foi centralizado em css/llatorre-main.css

// === INICIALIZAÇÃO ===
const modernWebsite = new ModernWebsite();