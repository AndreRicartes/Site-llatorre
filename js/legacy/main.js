// Arquivo legado (não utilizado pelas páginas atuais). Mantido apenas como marcador histórico.
// A lógica ativa está em js/modern-interactions.js.

function mostrarSlide(n) {
	if (!slides.length) return;
	dots.forEach(dot => dot.classList.remove('active'));
	indiceSlide = (n + slides.length) % slides.length;
	const translateX = -(100 / slides.length) * indiceSlide;
	if (carouselTrack) {
		carouselTrack.style.transform = `translateX(${translateX}%)`;
	}
	if (dots[indiceSlide]) {
		dots[indiceSlide].classList.add('active');
	}
}

function proximoSlide() {
	mostrarSlide(indiceSlide + 1);
}

function anteriorSlide() {
	mostrarSlide(indiceSlide - 1);
}

function irParaSlide(n) { mostrarSlide(n - 1); }

// Inicialização do carrossel após DOM pronto
ajustarCarrossel();
mostrarSlide(0);

// Expor funções do carrossel no escopo global para uso nos atributos onclick do HTML
window.proximoSlide = proximoSlide;
window.anteriorSlide = anteriorSlide;
window.irParaSlide = irParaSlide;

// Galeria Histórica - Modal e navegação
let galeriaAtual = 0;
const fotosGaleria = [
	{
		src: '../images/historia/01.webp',
		alt: 'Primeiras reuniões na casa de Izabel Leme - 1968',
		caption: '1968 - Primeiras Reuniões na casa de Izabel Leme da Silva'
	},
	{
		src: '../images/historia/02.webp',
		alt: 'Crescimento do grupo espírita - Anos 1970',
		caption: 'Anos 1970 - Crescimento do grupo e aumento da frequência'
	},
	{
		src: '../images/historia/03.webp',
		alt: 'Fundação oficial do Centro - 1978',
		caption: '15 de Agosto de 1978 - Fundação oficial do Centro Raphael Latorre'
	},
	{
		src: '../images/historia/04.webp',
		alt: 'Construção da sede própria - 1981',
		caption: '1981 - Inauguração da sede própria'
	},
	{
		src: '../images/historia/05.webp',
		alt: 'Atividades e eventos dos anos 1990',
		caption: 'Anos 1990 - Consolidação das atividades e eventos'
	},
	{
		src: '../images/historia/06.webp',
		alt: 'Expansão dos trabalhos sociais - Anos 2000',
		caption: 'Anos 2000 - Expansão dos trabalhos sociais'
	},
	{
		src: '../images/historia/07.webp',
		alt: 'Modernização e reformas - Anos 2010',
		caption: 'Anos 2010 - Modernização e reformas da sede'
	},
	{
		src: '../images/historia/08.webp',
		alt: 'Transição de liderança - 2017-2018',
		caption: '2017-2018 - Transição de liderança após 39 anos'
	},
	{
		src: '../images/historia/09.webp',
		alt: 'Centro nos dias atuais - 2020-2025',
		caption: '2020-2025 - O Centro nos dias atuais'
	}
];

// Funções globais para galeria
window.abrirModal = function(src, caption) {
	const modal = document.getElementById('modal-galeria');
	const modalImg = document.getElementById('modal-img');
	const modalCaption = document.getElementById('modal-caption');
    
	// Encontrar o índice da foto atual
	galeriaAtual = fotosGaleria.findIndex(foto => foto.src === src);
    
	modal.style.display = 'block';
	modalImg.src = src;
	modalImg.alt = caption;
	modalCaption.textContent = caption;
    
	// Prevenir scroll do body
	document.body.style.overflow = 'hidden';
    
	// Adicionar listener para ESC
	document.addEventListener('keydown', handleModalKeydown);
};

window.fecharModal = function() {
	const modal = document.getElementById('modal-galeria');
	modal.style.display = 'none';
    
	// Restaurar scroll do body
	document.body.style.overflow = '';
    
	// Remover listener do ESC
	document.removeEventListener('keydown', handleModalKeydown);
};

window.navegarFoto = function(direcao) {
	galeriaAtual += direcao;
    
	// Loop circular
	if (galeriaAtual >= fotosGaleria.length) {
		galeriaAtual = 0;
	} else if (galeriaAtual < 0) {
		galeriaAtual = fotosGaleria.length - 1;
	}
    
	const modalImg = document.getElementById('modal-img');
	const modalCaption = document.getElementById('modal-caption');
	const fotoAtual = fotosGaleria[galeriaAtual];
    
	// Animação suave de troca
	modalImg.style.opacity = '0.5';
	setTimeout(() => {
		modalImg.src = fotoAtual.src;
		modalImg.alt = fotoAtual.alt;
		modalCaption.textContent = fotoAtual.caption;
		modalImg.style.opacity = '1';
	}, 150);
};

function handleModalKeydown(e) {
	switch(e.key) {
		case 'Escape':
			window.fecharModal();
			break;
		case 'ArrowLeft':
			window.navegarFoto(-1);
			break;
		case 'ArrowRight':
			window.navegarFoto(1);
			break;
	}
}

// Fechar modal clicando fora da imagem
document.addEventListener('click', function(e) {
	const modal = document.getElementById('modal-galeria');
	if (e.target === modal) {
		window.fecharModal();
	}
});

// Animação de loading para botões
const addButtonLoading = () => {
	const buttons = document.querySelectorAll('.btn, .btn-outline, .btn-radio');

	buttons.forEach(button => {
		button.addEventListener('click', function() {
			if (!this.classList.contains('loading')) {
				this.classList.add('loading');
				const originalText = this.innerHTML;

				// Adiciona spinner
				this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando...';

				// Remove loading após 2 segundos (simulação)
				setTimeout(() => {
					this.classList.remove('loading');
					this.innerHTML = originalText;
				}, 2000);
			}
		});
	});
};

// Efeito de hover magnético para cards
const addMagneticEffect = () => {
	const cards = document.querySelectorAll('.card, .atividade-item, .evento-card');

	cards.forEach(card => {
		card.addEventListener('mousemove', (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const rotateX = (y - centerY) / 10;
			const rotateY = (centerX - x) / 10;

			card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
		});

		card.addEventListener('mouseleave', () => {
			card.style.transform = '';
		});
	});
};

// Animação de contador para números
const animateCounters = () => {
	const counters = document.querySelectorAll('.counter');

	counters.forEach(counter => {
		const target = parseInt(counter.getAttribute('data-target'));
		const duration = 2000; // 2 segundos
		const step = target / (duration / 16); // 60fps
		let current = 0;

		const updateCounter = () => {
			current += step;
			if (current < target) {
				counter.textContent = Math.floor(current);
				requestAnimationFrame(updateCounter);
			} else {
				counter.textContent = target;
			}
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					updateCounter();
					observer.unobserve(entry.target);
				}
			});
		});

		observer.observe(counter);
	});
};

// Smooth scroll aprimorado
const smoothScroll = () => {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				const headerOffset = 80;
				const elementPosition = target.offsetTop;
				const offsetPosition = elementPosition - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
};

// Inicialização das melhorias modernas
document.addEventListener('DOMContentLoaded', function() {
	// Animações existentes
	if ('IntersectionObserver' in window) {
		animateOnScroll();
		animateOnScrollModern();
	}

	// Novas funcionalidades modernas
	addButtonLoading();
	addMagneticEffect();
	animateCounters();
	smoothScroll();

	// Animação de entrada para o header
	const header = document.querySelector('header');
	if (header) {
		header.style.opacity = '0';
		header.style.transform = 'translateY(-20px)';
		setTimeout(() => {
			header.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
			header.style.opacity = '1';
			header.style.transform = 'translateY(0)';
		}, 100);
	}
});
