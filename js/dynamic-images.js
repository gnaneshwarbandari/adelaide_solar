(function () {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzB0xI_wyKPXr7rm1iKc9CW8dOyCm9FBo6TI6x4VE5vyJ3o1b6fs5BGKPmhWdAs-Is4/exec";
  const CATEGORY = "solar-panel";

  let driveData = null;

  async function fetchDriveImages() {
    try {
      const response = await fetch(`${SCRIPT_URL}?category=${CATEGORY}`, {
        method: "GET",
        redirect: "follow"
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      driveData = await response.json();
      console.log(response);
      console.log(driveData);
      updatePageImages();
    } catch (err) {
      console.error("Failed to load dynamic images from Drive:", err);
    }
  }

  function updatePageImages() {
    console.log("Updating Images....");
    if (!driveData) return;

    const isMobile = window.innerWidth <= 768;

    const getUrl = (section) => {
      if (!driveData[section]) return null;
      if (isMobile) {
        return (driveData[section].mobile && driveData[section].mobile.url) ||
               (driveData[section].desktop && driveData[section].desktop.url);
      }
      return (driveData[section].desktop && driveData[section].desktop.url) ||
             (driveData[section].mobile && driveData[section].mobile.url);
    };

    // 1. Hero Image
    const heroImg = document.querySelector('[data-img-key="hero"]');
    if (heroImg) {
      const heroUrl = getUrl('hero');
      if (heroUrl) heroImg.src = heroUrl;
    }

    // 2. Introduction Image
    const introImg = document.querySelector('[data-img-key="intro"]');
    if (introImg) {
      const introUrl = getUrl('installation');
      if (introUrl) introImg.src = introUrl;
    }

    // 3. Installation Image
    const installImg = document.querySelector('[data-img-key="installation"]');
    if (installImg) {
      const installUrl = getUrl('howItWorks');
      if (installUrl) installImg.src = installUrl;
    }

    // 4. Future Integration Image
    const futureImg = document.querySelector('[data-img-key="future"]');
    if (futureImg && driveData.gallery && driveData.gallery[0]) {
      futureImg.src = driveData.gallery[0].url;
    }

    // 5. Dynamic Gallery Update
    console.log("Dynamic galley update");
    console.log(driveData);
    const galleryContainer = document.getElementById('dynamic-gallery');
    if (galleryContainer && driveData.gallery && driveData.gallery.length > 0) {
      console.log("gallerycontainer updating..");
      galleryContainer.innerHTML = driveData.gallery.map((img, index) => `
        <div class="col-lg-4 col-md-6">
          <a href="${img.url}" data-lightbox="solar-panels" data-title="Solar Panel Project ${index + 1}">
            <img src="${img.url}" class="img-fluid rounded w-100 shadow-sm" alt="Solar panel project ${index + 1}" style="aspect-ratio: ${isMobile ? '1/1' : '4/3'}; object-fit: cover;" loading="lazy">
          </a>
        </div>
      `).join('');

      // Reinitialize Lightbox if available
      if (window.lightbox && typeof window.lightbox.init === 'function') {
        window.lightbox.init();
      }
    }
    console.log("Gallery container: ", galleryContainer);
  }

  window.addEventListener('resize', updatePageImages);
  document.addEventListener('DOMContentLoaded', fetchDriveImages);
})();