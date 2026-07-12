const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
(entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},
{
threshold:0.1
}
);

reveals.forEach(el => {
observer.observe(el);
});

// ==========================================
// PAST COLLABORATIONS CAROUSEL LOGIC
// ==========================================
const carousel = document.querySelector('.reels-carousel');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const swipeIndicator = document.querySelector('.swipe-indicator');

if (carousel && prevBtn && nextBtn) {
  const getScrollAmount = () => {
    const card = carousel.querySelector('.reel-card');
    if (!card) return 300;
    const cardWidth = card.clientWidth;
    const gap = parseFloat(window.getComputedStyle(carousel).gap) || 0;
    return cardWidth + gap;
  };

  const updateArrows = () => {
    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    
    // Hide both buttons if content fits on screen
    if (maxScroll <= 1) {
      prevBtn.style.opacity = '0';
      prevBtn.style.pointerEvents = 'none';
      nextBtn.style.opacity = '0';
      nextBtn.style.pointerEvents = 'none';
      return;
    }
    
    // Hides left arrow at beginning
    if (scrollLeft <= 5) {
      prevBtn.style.opacity = '0';
      prevBtn.style.pointerEvents = 'none';
    } else {
      prevBtn.style.opacity = '1';
      prevBtn.style.pointerEvents = 'auto';
    }
    
    // Hides right arrow at end
    if (scrollLeft >= maxScroll - 5) {
      nextBtn.style.opacity = '0';
      nextBtn.style.pointerEvents = 'none';
    } else {
      nextBtn.style.opacity = '1';
      nextBtn.style.pointerEvents = 'auto';
    }
  };

  // Click scroll handlers
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  });

  // Listen to scroll & window resize events to update arrow visibility
  carousel.addEventListener('scroll', updateArrows);
  window.addEventListener('resize', updateArrows);
  
  // Call initially to configure states
  updateArrows();
}

// Fade out swipe indicator after 3 seconds
if (swipeIndicator) {
  setTimeout(() => {
    swipeIndicator.classList.add('fade-out');
    setTimeout(() => {
      swipeIndicator.style.display = 'none';
    }, 800); // matches transition time in CSS
  }, 3000);
}