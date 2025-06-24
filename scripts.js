document.addEventListener('DOMContentLoaded', () => {
  // Active nav link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Scroll animations
  const animateOnScroll = () => {
    document.querySelectorAll('.fade-in, .slide-up, .slide-left').forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < window.innerHeight * 0.85) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();

  // Lightbox
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('project-tag')) return;
      
      const imgSrc = card.querySelector('img').src;
      const title = card.querySelector('h3').textContent;
      const description = card.querySelector('p')?.textContent || '';
      
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox active';
      lightbox.innerHTML = `
        <div class="lightbox-container">
          <span class="close-btn">&times;</span>
          <div class="lightbox-content">
            <img src="${imgSrc}" alt="${title}">
            <div class="lightbox-info">
              <h3>${title}</h3>
              <p>${description}</p>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Close lightbox
      lightbox.querySelector('.close-btn').addEventListener('click', () => {
        lightbox.remove();
        document.body.style.overflow = '';
      });
      
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          lightbox.remove();
          document.body.style.overflow = '';
        }
      });
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});