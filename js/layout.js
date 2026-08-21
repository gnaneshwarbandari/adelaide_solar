class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="spinner"
        class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <!-- Spinner End -->
    <!-- Topbar Start -->
    <div class="container-fluid bg-primary text-white py-2 d-none d-lg-block">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-8 d-flex gap-4">
                    <small><i class="fas fa-map-marker-alt me-2"></i>U5 75-77 Grange Road, Welland, SA 5007</small>
                    <small><i class="far fa-clock me-2"></i>Mon - Sat: 7:30am - 5:30pm</small>
                    <small><i class="fas fa-phone-alt me-2"></i>(04) 0808 1430</small>
                </div>
                <div class="col-lg-4 text-end">
                    <a href="#contact" class="text-white text-decoration-none fw-semibold">Book a free consultation <i
                            class="fas fa-arrow-right ms-1"></i></a>
                </div>
            </div>
        </div>
    </div>
    <!-- Topbar End -->
    <!-- Navbar Start -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm">
        <div class="container d-flex align-items-center">
            <!-- a class="navbar-brand fw-bold text-success" href="#home">Adelaide Solar</a -->
            <a class="navbar-brand d-flex align-items-center" href="#home">
                <img src="img/logo.png" alt="Adelaide Solar & Electrical Services" height="50">
                <span class="ms-2 fw-bold text-success d-none d-lg-inline">
                    Adelaide Solar & Electrical Services
                </span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse d-lg-flex align-items-center" id="navbarCollapse">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link active" aria-current="page" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#services">Services</a></li>
                    <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="#testimonials">Testimonials</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
                <div class="d-flex align-items-center mt-3 mt-lg-0 ms-lg-4">
                    <a class="btn btn-success rounded-pill" href="https://salesagent.greensketch.ai/au?code=1baecd21-4063-4b92-9b70-7cae220183bb">Get a Free Quote</a>
                </div>
            </div>
        </div>
    </nav>
    <!-- Navbar End -->
        `;

        // Active tab highlighting
        const page = window.location.pathname.split("/").pop() || "index.html";
        this.querySelectorAll(".nav-link").forEach(link => {
            if (link.getAttribute("href") === page) {
                link.classList.add("active");
            }
        });
    }
}

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="container-fluid bg-dark text-body footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
        <div class="container py-5">
            <div class="row g-5">
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-white mb-4">Adelaide Solar & Electrical Services</h5>
                    <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>U5 75-77 Grange Road, Welland, SA 5007,
                        Australia</p>
                    <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>(04) 0808 1430</p>
                    <p class="mb-2"><i class="fa fa-envelope me-3"></i>admin@adelaidesolarservices.com.au</p>
                    <div class="d-flex pt-2">
                        <a class="btn btn-square btn-outline-light btn-social" href="#"><i
                                class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-square btn-outline-light btn-social" href="#"><i
                                class="fab fa-instagram"></i></a>
                        <a class="btn btn-square btn-outline-light btn-social" href="#"><i
                                class="fab fa-linkedin-in"></i></a>
                        <a class="btn btn-square btn-outline-light btn-social" href="#"><i
                                class="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-white mb-4">Quick Links</h5>
                    <a class="btn btn-link text-white" href="#about">About Us</a><br />
                    <a class="btn btn-link text-white" href="#services">Services</a><br />
                    <a class="btn btn-link text-white" href="#projects">Projects</a><br />
                    <a class="btn btn-link text-white" href="#testimonials">Testimonials</a><br />
                    <a class="btn btn-link text-white" href="#contact">Contact</a>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-white mb-4">Service Highlights</h5>
                    <ul class="list-unstyled text-muted">
                        <li><i class="fas fa-check-circle me-2 text-success"></i>Residential Solar</li>
                        <li><i class="fas fa-check-circle me-2 text-success"></i>Commercial Solar</li>
                        <li><i class="fas fa-check-circle me-2 text-success"></i>Battery Storage</li>
                        <li><i class="fas fa-check-circle me-2 text-success"></i>EV Charging</li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-white mb-4">Newsletter</h5>
                    <p class="text-muted">Stay informed with project updates, solar incentives and technology insights.
                    </p>
                    <div class="position-relative mx-auto" style="max-width: 400px;">
                        <input class="form-control border-0 w-100 py-3 ps-4 pe-5" type="email"
                            placeholder="Enter your email" aria-label="Newsletter email">
                        <button type="button"
                            class="btn btn-success py-2 position-absolute top-0 end-0 mt-2 me-2">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="copyright py-3 border-top border-secondary">
                <div class="row">
                    <div class="col-md-6 text-center text-md-start mb-3 mb-md-0 text-white">
                        &copy; 2026 Adelaide Solar & Electrical Services. All rights reserved.
                    </div>
                    <div class="col-md-6 text-center text-md-end text-muted">
                        <a class="text-muted text-decoration-none" href="#">Privacy Policy</a> | <a
                            class="text-muted text-decoration-none" href="#">Terms of Use</a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);