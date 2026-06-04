document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobil Menü Aç/Kapat
    const mobilTetikleyici = document.getElementById('mobile-toggle');
    const navigasyonLinkleri = document.getElementById('nav-links');

    if (mobilTetikleyici && navigasyonLinkleri) {
        mobilTetikleyici.addEventListener('click', () => {
            navigasyonLinkleri.classList.toggle('active');
        });

        // Bir bağlantıya tıklandığında menüyü kapat
        navigasyonLinkleri.querySelectorAll('a').forEach(baglanti => {
            baglanti.addEventListener('click', () => {
                navigasyonLinkleri.classList.remove('active');
            });
        });
    }

    // 2. Header Kaydırma Efekti (Sabit ve Gölgeli)
    const baslik = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            baslik.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            baslik.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    });

    // 3. Karanlık Mod Değiştirici
    const temaTetikleyici = document.getElementById('theme-toggle');
    const htmlElemani = document.documentElement;

    // Yerel depolamayı veya sistem tercihini kontrol et
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

    // 4. Çoklu Dil Desteği (TR/EN)
    const dilTetikleyici = document.getElementById('lang-toggle');
    const cevrilebilirElemanlar = document.querySelectorAll('[data-tr][data-en]');

    let guncelDil = localStorage.getItem('lang') || 'tr';
    
    const dilUygula = (secilenDil) => {
        cevrilebilirElemanlar.forEach(eleman => {
            eleman.textContent = eleman.getAttribute(`data-${secilenDil}`);
        });
        
        // Varsa form yer tutucu çevirileri buraya eklenebilir

        if (secilenDil === 'tr') {
            dilTetikleyici.textContent = 'EN';
            document.documentElement.lang = 'tr';
        } else {
            dilTetikleyici.textContent = 'TR';
            document.documentElement.lang = 'en';
        }
    };

    // Kaydedilmiş dili sayfa yüklenirken uygula
    dilUygula(guncelDil);

    dilTetikleyici.addEventListener('click', () => {
        guncelDil = guncelDil === 'tr' ? 'en' : 'tr';
        dilUygula(guncelDil);
        localStorage.setItem('lang', guncelDil);
    });

    // 5. Kaydırma Animasyonları (Basit Intersection Observer)
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

    // 6. Galeri Lightbox (Tam Ekran Görsel)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox && galleryItems) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-caption');
                if (img) {
                    lightboxImg.src = img.src;
                    lightboxCaption.textContent = caption ? caption.textContent : '';
                    lightbox.style.display = 'flex';
                    // Animasyon için küçük bir gecikme
                    setTimeout(() => {
                        lightbox.classList.add('active');
                    }, 10);
                }
            });
        });

        // Lightbox dışına tıklandığında kapat
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300); // Transition süresi ile uyumlu
            }
        });
    }
});
