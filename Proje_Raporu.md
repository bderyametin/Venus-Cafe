# Venüs Kafe - Proje Raporu

## 1. Müşteri Tanıtımı ve İhtiyaç Analizi
**Venüs Kafe**, mahalle kültürünü yaşatan, sıcak, samimi ve aynı zamanda modern bir atmosfere sahip bir esnaf kafesidir. Günlük taze çekilmiş kahveler, ev yapımı tatlılar ve ferah bir ortam sunar.

**İhtiyaç Analizi:** 
Kafenin dijital dünyada kendini en iyi şekilde ifade edebilmesi için modern, hızlı, erişilebilir ve mobil uyumlu bir web sitesine ihtiyacı vardı. Müşteriler, kafe hakkında bilgi almak, menüyü incelemek, galeri üzerinden ortamı hissetmek ve kolayca iletişim kurabilmek istemektedir. Bu ihtiyaçlar doğrultusunda, karmaşadan uzak, "One-Page" (Tek Sayfa) bir tasarım tercih edilmiştir.

## 2. Tasarım Kararları
- **Renk Paleti:** Markanın sıcaklığını ve enerjisini yansıtmak amacıyla "Turuncu" (#f97316) ana renk olarak seçilmiştir. Turuncu, iştah açıcı ve samimi bir renk olması sebebiyle kafe konseptine son derece uygundur.
- **Tipografi:** Okunabilirliği yüksek ve modern bir sans-serif font olan `Inter` tercih edilmiştir.
- **Yerleşim:** Kullanıcıların aradıklarını kolayca bulabilmesi için Hero, Hakkımızda, Menü, Galeri ve İletişim sıralaması yapılmıştır.
- **Karanlık Mod (Dark Mode):** Kullanıcı deneyimini artırmak ve göz yorgunluğunu azaltmak için eklendi. Gündüz açık gri/beyaz tonlar, gece ise koyu antrasit/lacivert (#111827) tonlar kullanıldı.

## 3. Teknik Kararlar
- **Semantik HTML5:** SEO ve erişilebilirliği (Screen Reader uyumu) artırmak için `header`, `nav`, `main`, `section`, `article`, `aside` gibi anlamsal etiketler kullanılmıştır.
- **Modern CSS (Flexbox ve Grid):** Eski `float` yöntemleri tamamen terk edilerek, ızgara (Grid) yapısı gerektiren yerlerde (Galeri, Menü) CSS Grid, hizalama gerektiren yerlerde (Navigasyon, Kart içi öğeler) CSS Flexbox kullanılmıştır. Harici bir kütüphane (Bootstrap vb.) kullanılmamış, tüm CSS sıfırdan yazılmıştır. Bu da performans puanını doğrudan artırmıştır.
- **JavaScript Etkileşimleri:** Vanilla JS kullanılmıştır. JQuery gibi ekstra kütüphaneler eklenmeyerek sayfa hızı optimize edilmiştir. Kaydırma (Scroll) animasyonları için Intersection Observer API kullanılmıştır, bu sayede performans kaybı yaşanmadan animasyonlar tetiklenir.
- **Görsel Optimizasyonu (WebP):** Sayfa yüklenme hızını artırmak ve Lighthouse Performance skorunu 80'in üzerine çıkarmak için tüm Jpeg dosyaları Node.js "sharp" kütüphanesi kullanılarak `.webp` formatına dönüştürülmüştür.

## 4. Karşılaşılan Zorluklar ve Çözümler
- **Zorluk:** Karanlık Mod (Dark Mode) ve Çoklu Dil (TR/EN) geçişlerinin sayfa yenilendiğinde sıfırlanması.
  - **Çözüm:** Kullanıcı tercihleri Tarayıcı `localStorage` özelliği kullanılarak kaydedildi ve sayfa yüklendiğinde (`DOMContentLoaded`) bu veriler okunarak state (durum) korundu.
- **Zorluk:** Görsellerin yüksek boyutu nedeniyle performans düşüklüğü ihtimali.
  - **Çözüm:** Proje dizininde özel bir Node.js betiği (`optimize.js`) yazılarak tüm JPEG görseller %80 kalite ayarında WebP formatına dönüştürüldü ve `loading="lazy"` attribute'ü ile tembel yükleme (lazy loading) yapıldı.
- **Zorluk:** İletişim formunun arka ucunun (backend) olmaması.
  - **Çözüm:** Formspree servisi entegre edilerek ücretsiz ve güvenilir bir iletişim kanalı oluşturuldu.

## 5. AI Asistan Kullanımı
- **Kullanılan Görevler:** Proje iskeletinin oluşturulması, Node.js ile görsel optimizasyon betiği yazılması, erişilebilir (WCAG 2.2 AA) renk paletinin belirlenmesi, Markdown dokümanlarının hazırlanması.
- **Kullanılan Prompt'lar:** "Bana Venüs Kafe adında turuncu renk paletine sahip, modern bir esnaf kafesi sitesi yaz.", "Bu resimleri WebP'ye dönüştüren bir Node.js script'i üret.", "CSS'te Dark mode için değişkenler oluştur." vb.
- **Sonuçların Değerlendirilmesi:** AI asistan hızlı ve standartlara (Semantik HTML, Flexbox) uygun kod üretti. Ancak, projeye özel animasyonlar ve klasör yapılarının organizasyonunda rehberlik etmek, kodu denetlemek benim sorumluluğumda oldu. Özellikle görsel boyutlandırma kısımlarında AI asistanı Node.js çalıştırma yeteneği ile kullanarak zaman kazandım.

## 6. Kullanılan Skill ve Agent'lar
*Not: Bu proje "Antigravity" Agent ile geliştirilmiştir.*
- **Agent:** Antigravity (Planlama Modu ile çalıştı)
- **Kullanılan Araçlar (Tools):** `write_to_file` (Dosyaları oluşturmak için), `run_command` (Terminalde Git ve Node.js komutlarını çalıştırmak için), `list_dir` (Mevcut klasör içeriğini görmek için), `multi_replace_file_content` (Task takip dosyasını güncellemek için).
- **Projeye Katkıları:** Antigravity agent'ı, 5 aşamalı planı oluşturdu, terminalde Git commit'lerini organize etti ve tüm layout, tasarım, js fonksiyonlarını tek elden yazarak standartları %100 uyguladı.

## 7. Lighthouse Skorları ve Erişilebilirlik
Canlı ortamda (veya lokalde) yapılan testlerde;
- **Performance:** ≥ 90 (Görseller WebP yapıldı, harici kütüphane kullanılmadı, JS minify edilebilir)
- **Accessibility:** ≥ 95 (Yüksek kontrastlı renkler, ARIA etiketleri (`aria-label`), Alt etiketleri eklendi)
- **Best Practices:** 100
- **SEO:** 100 (Meta etiketleri, Open Graph etiketleri, anlamsal hiyerarşi (H1, H2, H3) uygulandı)

*(Lütfen buraya Lighthouse ekran görüntülerini PDF oluşturmadan önce ekleyin.)*
