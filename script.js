// ==========================================
// SCROLL REVEAL OBSERVER
// ==========================================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.08
  }
);

reveals.forEach(el => {
  observer.observe(el);
});

// ==========================================
// STICKY NAVBAR & MOBILE MENU LOGIC
// ==========================================
const siteHeader = document.getElementById('siteHeader');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (siteHeader) {
  const handleHeaderScroll = () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();
}

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// ==========================================
// COLLABORATIONS DATA & FILTER LOGIC
// ==========================================
const collaborationsData = [
  {
    id: "raul-brady",
    title: "lifeofshrachi × Raul Brady",
    category: "creators",
    categoryLabel: "CREATOR COLLAB",
    views: "387K+ Views",
    image: "images/reel1.jpg",
    link: "https://www.instagram.com/reel/DY9oxuLJYmg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    alt: "lifeofshrachi × Raul Brady creator collaboration"
  },
  {
    id: "trees-treats",
    title: "lifeofshrachi × Trees and Treats",
    category: "cafes",
    categoryLabel: "CAFÉ FEATURE",
    views: "501K+ Views",
    image: "images/reel2.jpg",
    link: "https://www.instagram.com/reel/DYhq8gpTZqc/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    alt: "lifeofshrachi × Trees and Treats collaboration"
  },
  {
    id: "humeecafe",
    title: "lifeofshrachi × humeecafe",
    category: "cafes",
    categoryLabel: "CAFÉ FEATURE",
    views: "1K+ Views",
    image: "images/reel3.jpg",
    link: "https://www.instagram.com/reel/DaqIBjuzVlV/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    alt: "lifeofshrachi × humeecafe collaboration"
  },
  {
    id: "cafe-roastique",
    title: "lifeofshrachi × Café Roastique",
    category: "cafes",
    categoryLabel: "CAFÉ FEATURE",
    views: "1K+ Views",
    image: "images/reel4.jpg",
    link: "https://www.instagram.com/reel/DcJWKwgzpjs/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==&igsi=MzRlODBiNWFlZA==",
    alt: "lifeofshrachi × Café Roastique collaboration"
  },
  {
    id: "gimi-michi",
    title: "lifeofshrachi × Gimi Michi",
    category: "brands",
    categoryLabel: "BRAND COLLAB",
    views: "1K+ Views",
    image: "images/reel5.jpg",
    link: "https://www.instagram.com/reel/DcQwjjOzTO1/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    alt: "lifeofshrachi × Gimi Michi brand collaboration"
  },
  {
    id: "gianis",
    title: "lifeofshrachi × Gianis",
    category: "cafes",
    categoryLabel: "CAFÉ FEATURE",
    views: "2.4K+ Views",
    image: "images/reel6.jpg",
    link: "https://www.instagram.com/reel/DcgijVbzdhU/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    alt: "lifeofshrachi × Gianis collaboration"
  }
];

const carousel = document.querySelector('.reels-carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const swipeIndicator = document.querySelector('.swipe-indicator');
const filterBtns = document.querySelectorAll('.collab-filter-btn');

function renderCardTemplate(item) {
  return `
    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="reel-card" data-category="${item.category}">
      <img src="${item.image}" alt="${item.alt}" loading="lazy">
      <div class="reel-play-btn" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div class="reel-content">
        <span class="reel-category-badge">${item.categoryLabel}</span>
        <h3>${item.title}</h3>
        <p class="reel-views">
          <svg class="view-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span>${item.views}</span>
        </p>
      </div>
    </a>
  `;
}

function renderEmptyState(category) {
  const titles = {
    travel: "Travel & Stays Collaborations",
    brands: "Brand Campaigns",
    creators: "Creator Collaborations",
    cafes: "Café & Food Features"
  };
  const categoryTitle = titles[category] || "Upcoming Collaborations";
  return `
    <div class="collab-empty-state">
      <div class="collab-empty-sparkle">✦</div>
      <h3 class="collab-empty-title">${categoryTitle}</h3>
      <p class="collab-empty-desc">New luxury destination stories and hospitality features are currently in production. Inquire below to feature your property, destination, or brand next!</p>
      <a href="#contact" class="collab-empty-btn">Inquire for Collaborations →</a>
    </div>
  `;
}

if (carousel && prevBtn && nextBtn) {
  const getScrollAmount = () => {
    const card = carousel.querySelector('.reel-card');
    if (!card) return 320;
    const cardWidth = card.clientWidth;
    const gap = parseFloat(window.getComputedStyle(carousel).gap) || 24;
    return cardWidth + gap;
  };

  const updateArrows = () => {
    const hasCards = carousel.querySelector('.reel-card');
    if (!hasCards) {
      prevBtn.style.opacity = '0';
      prevBtn.style.pointerEvents = 'none';
      nextBtn.style.opacity = '0';
      nextBtn.style.pointerEvents = 'none';
      return;
    }

    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // Hide both buttons if all visible content fits on screen
    if (maxScroll <= 4) {
      prevBtn.style.opacity = '0';
      prevBtn.style.pointerEvents = 'none';
      nextBtn.style.opacity = '0';
      nextBtn.style.pointerEvents = 'none';
      return;
    }

    // Left arrow visibility
    if (scrollLeft <= 6) {
      prevBtn.style.opacity = '0';
      prevBtn.style.pointerEvents = 'none';
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.style.pointerEvents = 'auto';
    }

    // Right arrow visibility
    if (scrollLeft >= maxScroll - 6) {
      nextBtn.style.opacity = '0';
      nextBtn.style.pointerEvents = 'none';
    } else {
      nextBtn.style.opacity = '1';
      nextBtn.style.pointerEvents = 'auto';
    }
  };

  // Scroll click handlers
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  // Filter functionality with smooth transitions
  if (filterBtns && filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const selectedCategory = btn.getAttribute('data-filter');

        carousel.classList.add('is-animating-out');

        setTimeout(() => {
          const filtered = selectedCategory === 'all'
            ? collaborationsData
            : collaborationsData.filter(item => {
                if (Array.isArray(item.category)) {
                  return item.category.includes(selectedCategory);
                }
                return item.category === selectedCategory;
              });

          if (filtered.length > 0) {
            carousel.innerHTML = filtered.map(renderCardTemplate).join('');
          } else {
            carousel.innerHTML = renderEmptyState(selectedCategory);
          }

          carousel.scrollLeft = 0;
          carousel.classList.remove('is-animating-out');
          carousel.classList.add('is-animating-in');

          updateArrows();

          setTimeout(() => {
            carousel.classList.remove('is-animating-in');
          }, 350);
        }, 220);
      });
    });

    // Keyboard navigation for filter tabs
    const filterContainer = document.querySelector('.collab-filters');
    if (filterContainer) {
      filterContainer.addEventListener('keydown', (e) => {
        const btnList = Array.from(filterBtns);
        const currentIndex = btnList.indexOf(document.activeElement);
        if (currentIndex === -1) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % btnList.length;
          btnList[nextIndex].focus();
          btnList[nextIndex].click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + btnList.length) % btnList.length;
          btnList[prevIndex].focus();
          btnList[prevIndex].click();
        }
      });
    }
  }

  carousel.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  updateArrows();
}

// Fade out swipe indicator after 3 seconds
if (swipeIndicator) {
  setTimeout(() => {
    swipeIndicator.classList.add('fade-out');
    setTimeout(() => {
      swipeIndicator.style.display = 'none';
    }, 800);
  }, 3000);
}