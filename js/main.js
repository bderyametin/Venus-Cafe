document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobilTetikleyici = document.getElementById('mobile-toggle');
    const navigasyonLinkleri = document.getElementById('nav-links');

    if (mobilTetikleyici && navigasyonLinkleri) {
        mobilTetikleyici.addEventListener('click', () => {
            navigasyonLinkleri.classList.toggle('active');
        });

        // Close menu when clicking a link
        navigasyonLinkleri.querySelectorAll('a').forEach(baglanti => {
            baglanti.addEventListener('click', () => {
                navigasyonLinkleri.classList.remove('active');
            });
        });
    }

    // 2. Header Scroll Effect (Sticky & Shadow)
    const baslik = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            baslik.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            baslik.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    });

    // 3. Dark Mode Toggle
    const temaTetikleyici = document.getElementById('theme-toggle');
    const htmlElemani = document.documentElement;

    // Check local storage or system preference
    const kaydedilmisTema = localStorage.getItem('theme');
    const sistemKaranlik = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (kaydedilmisTema === 'dark' || (!kaydedilmisTema && sistemKaranlik)) {
        htmlElemani.setAttribute('data-theme', 'dark');
        temaTetikleyici.textContent = '☀️';
    }

    temaTetikleyici.addEventListener('click', () => {
        const guncelTema = htmlElemani.getAttribute('data-theme');
        if (guncelTema === 'dark') {
            htmlElemani.setAttribute('data-theme', 'light');
            temaTetikleyici.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            htmlElemani.setAttribute('data-theme', 'dark');
            temaTetikleyici.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    // 4. Multi-language Support (TR/EN)
    const dilTetikleyici = document.getElementById('lang-toggle');
    const cevrilebilirElemanlar = document.querySelectorAll('[data-tr][data-en]');

    let guncelDil = localStorage.getItem('lang') || 'tr';
    
    const dilUygula = (secilenDil) => {
        cevrilebilirElemanlar.forEach(eleman => {
            eleman.textContent = eleman.getAttribute(`data-${secilenDil}`);
        });
        
        // Form placeholder translations could go here if any

        if (secilenDil === 'tr') {
            dilTetikleyici.textContent = 'EN';
            document.documentElement.lang = 'tr';
        } else {
            dilTetikleyici.textContent = 'TR';
            document.documentElement.lang = 'en';
        }
    };

    // Apply saved language on load
    dilUygula(guncelDil);

    dilTetikleyici.addEventListener('click', () => {
        guncelDil = guncelDil === 'tr' ? 'en' : 'tr';
        dilUygula(guncelDil);
        localStorage.setItem('lang', guncelDil);
    });

    // 5. Scroll Animations (Simple Intersection Observer)
    const gozlemciAyarlari = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const gozlemci = new IntersectionObserver((girisler) => {
        girisler.forEach(giris => {
            if (giris.isIntersecting) {
                giris.target.style.opacity = '1';
                giris.target.style.transform = 'translateY(0)';
                gozlemci.unobserve(giris.target);
            }
        });
    }, gozlemciAyarlari);

    const hareketliElemanlar = document.querySelectorAll('.feature-card, .menu-item, .gallery-item');
    hareketliElemanlar.forEach(eleman => {
        eleman.style.opacity = '0';
        eleman.style.transform = 'translateY(20px)';
        eleman.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        gozlemci.observe(eleman);
    });
});
