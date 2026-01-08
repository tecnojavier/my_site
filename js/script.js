// Array de imágenes para el modal
const images = [
  "img/fullstack.jpg",
  "img/support.jpg", 
  "img/web-developer.jpg",
  "img/database.jpg",
  "img/teacher.jpg"
];

// Función para abrir modal
function openModal(index) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  
  if (modal && modalImg && images[index]) {
    modal.style.display = "block";
    modalImg.src = images[index];
  }
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Cerrar modal al hacer click fuera de la imagen
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById("imageModal");
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target !== document.getElementById("modalImage") && !e.target.classList.contains('close-modal')) {
        closeModal();
      }
    });
  }
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Animación al hacer scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll(".timeline-item, .skill-category, .contact-item, .magazine-item, .document-card, .portfolio-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });
});

// Efecto de partículas
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
    position: fixed;
    width: 2px;
    height: 2px;
    background: var(--accent);
    border-radius: 50%;
    left: ${Math.random() * 100}vw;
    top: 0;
    pointer-events: none;
    z-index: -1;
  `;
  
  document.body.appendChild(particle);

  const animation = particle.animate(
    [
      { transform: "translateY(0) scale(1)", opacity: 1 },
      { transform: `translateY(${window.innerHeight}px) scale(0)`, opacity: 0 },
    ],
    {
      duration: 2000 + Math.random() * 3000,
      easing: "linear",
    }
  );

  animation.onfinish = () => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  };
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Hero Stack Carousel Functionality - CORREGIDO
class HeroStackCarousel {
  constructor() {
    this.container = document.querySelector('.hero-stack-container');
    this.items = document.querySelectorAll('.hero-stack-item');
    this.indicators = document.querySelectorAll('.hero-indicator');
    this.currentIndex = 0;
    
    // Verificar que los elementos existen antes de inicializar
    if (this.items.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.updateCarousel();
    
    // Click en items para navegar
    this.items.forEach(item => {
      item.addEventListener('click', (e) => {
        // Solo navegar si no es la imagen activa
        if (!item.classList.contains('active')) {
          const index = parseInt(item.getAttribute('data-index'));
          this.goTo(index);
        }
      });
    });
    
    // Click en indicadores
    this.indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        this.goTo(index);
      });
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    
  }
  
  updateCarousel() {
    this.items.forEach((item, index) => {
      item.classList.remove('active', 'prev-1', 'prev-2', 'next-1', 'next-2');
      
      if (index === this.currentIndex) {
        item.classList.add('active');
      } else if (index === this.currentIndex - 1 || 
                 (this.currentIndex === 0 && index === this.items.length - 1)) {
        item.classList.add('prev-1');
      } else if (index === this.currentIndex - 2 || 
                 (this.currentIndex === 0 && index === this.items.length - 2) ||
                 (this.currentIndex === 1 && index === this.items.length - 1)) {
        item.classList.add('prev-2');
      } else if (index === this.currentIndex + 1 || 
                 (this.currentIndex === this.items.length - 1 && index === 0)) {
        item.classList.add('next-1');
      } else if (index === this.currentIndex + 2 || 
                 (this.currentIndex === this.items.length - 2 && index === 0) ||
                 (this.currentIndex === this.items.length - 1 && index === 1)) {
        item.classList.add('next-2');
      }
    });
    
    // Update indicators
    this.indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  prev() {
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.items.length - 1;
    this.updateCarousel();
  }
  
  next() {
    this.currentIndex = this.currentIndex < this.items.length - 1 ? this.currentIndex + 1 : 0;
    this.updateCarousel();
  }
  
  goTo(index) {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      this.updateCarousel();
    }
  }
  
  startAutoRotation() {
    setInterval(() => {
      this.next();
    }, 5000); // cada 5 segundos
  }
}

// Función para cargar proyectos dinámicamente 
function loadPortfolioProjects() {

  console.log('Portafolio cargado correctamente');
}

// Inicializar el hero carousel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar carousel
  new HeroStackCarousel();
  
  // Inicializar portafolio 
  loadPortfolioProjects();
  
  // Crear algunas partículas de fondo
  for (let i = 0; i < 20; i++) {
    setTimeout(() => createParticle(), i * 200);
  }
  
  // Continuar creando partículas cada cierto tiempo
  setInterval(() => {
    if (Math.random() > 0.7) {
      createParticle();
    }
  }, 1000);
  
  // Asegurar que el modal se cierre correctamente
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  });
});

// Función para filtrar proyectos por categoría
function filterProjects(category) {
  const cards = document.querySelectorAll('.portfolio-card');
  
  cards.forEach(card => {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// Función para validar formularios (en el futuro)
function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ff4757';
      isValid = false;
    } else {
      input.style.borderColor = '#00a8ff';
    }
  });
  
  return isValid;
}
