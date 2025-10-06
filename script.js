// Fixed Carousel Functionality
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const items = carousel.querySelectorAll('.product-item');
  const btnLeft = carousel.querySelector('.carousel-btn.left');
  const btnRight = carousel.querySelector('.carousel-btn.right');
  const dots = carousel.querySelectorAll('.dot');

  const totalItems = items.length;
  let index = 0;
  let itemWidth;

  // Function to calculate item width
  const calculateItemWidth = () => {
    if (items.length > 0) {
      const item = items[0];
      const style = window.getComputedStyle(item);
      const margin = parseFloat(style.marginRight) || 0;
      itemWidth = item.offsetWidth + margin;
    }
  };

  // Function to update dots
  const updateDots = () => {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
      dots[index].classList.add('active');
    }
  };

  // Function to move to a specific index
  const moveToIndex = (i) => {
    calculateItemWidth(); // Recalculate on each move for responsiveness
    const maxIndex = Math.max(0, totalItems - getVisibleItems());
    const clampedIndex = Math.min(i, maxIndex);
    
    track.style.transform = `translateX(-${clampedIndex * itemWidth}px)`;
    index = clampedIndex;
    updateDots();
  };

  // Function to get number of visible items based on screen size
  const getVisibleItems = () => {
    const containerWidth = carousel.offsetWidth;
    if (containerWidth < 480) return 1;
    if (containerWidth < 768) return 2;
    if (containerWidth < 1024) return 3;
    return 4;
  };

  // Arrow buttons
  btnLeft.addEventListener('click', () => {
    moveToIndex(Math.max(0, index - 1));
    resetAutoSlide();
  });

  btnRight.addEventListener('click', () => {
    const maxIndex = Math.max(0, totalItems - getVisibleItems());
    moveToIndex(Math.min(maxIndex, index + 1));
    resetAutoSlide();
  });

  // Dots clickable
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      moveToIndex(i);
      resetAutoSlide();
    });
  });

  // Auto-slide
  let autoSlide = setInterval(() => {
    const maxIndex = Math.max(0, totalItems - getVisibleItems());
    const nextIndex = index >= maxIndex ? 0 : index + 1;
    moveToIndex(nextIndex);
  }, 3000);

  const resetAutoSlide = () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      const maxIndex = Math.max(0, totalItems - getVisibleItems());
      const nextIndex = index >= maxIndex ? 0 : index + 1;
      moveToIndex(nextIndex);
    }, 3000);
  };

  // Initialize
  calculateItemWidth();
  updateDots();

  // Recalculate on window resize
  window.addEventListener('resize', () => {
    calculateItemWidth();
    moveToIndex(index); // Reset position on resize
  });
});

// Back to Top Functionality
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '↑';
backToTopBtn.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});

// Scroll to top when clicked
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});