(function () {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzB0xI_wyKPXr7rm1iKc9CW8dOyCm9FBo6TI6x4VE5vyJ3o1b6fs5BGKPmhWdAs-Is4/exec";
  // Automatically extracts page name (e.g., /pages/solar-panel.html -> "solar-panel")
  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');

  // Fallback to "solar-panel" if at root or index
  const CATEGORY = (pageName && pageName !== 'index') ? pageName : "solar-panel";

  let driveData = [];

  async function fetchDriveImages() {
    try {
      const response = await fetch(`${SCRIPT_URL}?category=${CATEGORY}`, {
        method: "GET",
        redirect: "follow"
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      driveData = await response.json();
      console.log("Drive Data Array Loaded:", driveData);
      updatePageImages();
    } catch (err) {
      console.error("Failed to load dynamic images from Drive:", err);
    }
  }

  function updatePageImages() {
    if (!Array.isArray(driveData) || driveData.length === 0) return;

    const isMobile = window.innerWidth <= 768;

    // Helper to find image by key substring in name
    const findImage = (key) => driveData.find(img => img.name.toLowerCase().includes(key));

    // 1. Hero Image
    const heroImg = document.querySelector('[data-img-key="hero"]');
    if (heroImg) {
      const hero = findImage('hero');
      if (hero) heroImg.src = hero.url;
    }

    // 2. Introduction Image
    const introImg = document.querySelector('[data-img-key="intro"]');
    if (introImg) {
      const intro = findImage('intro') || findImage('installation');
      if (intro) introImg.src = intro.url;
    }

    // 3. Installation Image
    const installImg = document.querySelector('[data-img-key="installation"]');
    if (installImg) {
      const install = findImage('how_it_works') || findImage('howitworks');
      if (install) installImg.src = install.url;
    }

    // 4. Dynamic Gallery Update (Pulls all images or non-keyed images)
    const galleryContainer = document.getElementById('dynamic-gallery');
    if (galleryContainer) {
      // Filter out dedicated section images if needed, or use full array
      const galleryImages = driveData.filter(img => 
        !img.name.includes('hero') && 
        !img.name.includes('intro') && 
        !img.name.includes('how_it_works')
      );

      // Fallback to all images if no specific gallery prefix is used
      const itemsToRender = galleryImages.length > 0 ? galleryImages : driveData;

      galleryContainer.innerHTML = itemsToRender.map((img, index) => `
        <div class="col-lg-4 col-md-6">
          <a href="${img.url}" data-lightbox="solar-panels" data-title="Solar Panel Project ${index + 1}">
            <img src="${img.url}" class="img-fluid rounded w-100 shadow-sm" alt="${img.name}" style="aspect-ratio: ${isMobile ? '1/1' : '4/3'}; object-fit: cover;" loading="lazy">
          </a>
        </div>
      `).join('');

      // Reinitialize Lightbox for dynamically created elements
      if (window.lightbox && typeof window.lightbox.init === 'function') {
        window.lightbox.init();
      }
    }
  }

  window.addEventListener('resize', updatePageImages);
  document.addEventListener('DOMContentLoaded', fetchDriveImages);
})();