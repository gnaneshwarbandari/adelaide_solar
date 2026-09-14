(function () {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzB0xI_wyKPXr7rm1iKc9CW8dOyCm9FBo6TI6x4VE5vyJ3o1b6fs5BGKPmhWdAs-Is4/exec";
  // Automatically extracts page name (e.g., /pages/solar-panel.html -> "solar-panel")
  const path = window.location.pathname;
  const pageName = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');

  // Fallback to "solar-panel" if at root or index
  const CATEGORY = (pageName && pageName !== 'index') ? pageName : "solar-panel";
  console.log(CATEGORY);

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

    // 1. Section1 Image
    const section1 = document.querySelector('[data-img-key="section1"]');
    if (section1) {
      const sec1 = findImage('section1');
      if (sec1) section1.src = sec1.url;
    }

    // 2. Section2 Image
    const section2 = document.querySelector('[data-img-key="section2"]');
    if (section2) {
      const sec2 = findImage('section1') || findImage('section2');
      if (sec2) section2.src = sec2.url;
    }

    // 3. Section3 Image
    const section3 = document.querySelector('[data-img-key="section3"]');
    if (section3) {
      const sec3 = findImage('section2') || findImage('section3');
      if (sec3) section3.src = sec3.url;
    }

    // 4. Section4 Image
    const section4 = document.querySelector('[data-img-key="section4"]');
    if (section4) {
      const sec4 = findImage('section3') || findImage('section4');
      if (sec4) section4.src = sec4.url;
    }

    // 5. Section5 Image
    const section5 = document.querySelector('[data-img-key="section5"]');
    if (section5) {
      const sec5 = findImage('section4') || findImage('section5');
      if (sec5) section5.src = sec5.url;
    }

    // 6. Dynamic Gallery Update (Pulls all images or non-keyed images)
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