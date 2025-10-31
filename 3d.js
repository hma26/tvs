const tiltImage = document.querySelector('.tilt-3d');
const tiltWrapper = document.querySelector('.hero-image-wrapper');

tiltWrapper.addEventListener('mousemove', (e) => {
    const rect = tiltWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // flip Y
    const rotateY = ((x - centerX) / centerX) * 10;

    tiltImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

tiltWrapper.addEventListener('mouseleave', () => {
    tiltImage.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

tiltImage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;



  function toggleDescription(id) {
      const desc = document.getElementById(id);
      if (!desc) return;
      // Hide all descriptions first
      document.querySelectorAll('.program-description').forEach(el => {
        if (el.id !== id) el.style.display = 'none';
      });
      // Toggle clicked one
      if (desc.style.display === 'block') {
        desc.style.display = 'none';
      }
    }