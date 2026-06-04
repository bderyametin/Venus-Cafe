const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const girdiKlasoru = path.join(__dirname, 'fotograflar');
const ciktiKlasoru = path.join(__dirname, 'images');

if (!fs.existsSync(ciktiKlasoru)) {
    fs.mkdirSync(ciktiKlasoru);
}

fs.readdirSync(girdiKlasoru).forEach(dosya => {
    if (dosya.match(/\.(png|jpg|jpeg)$/i)) {
        const girdiYolu = path.join(girdiKlasoru, dosya);
        const ciktiYolu = path.join(ciktiKlasoru, dosya.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        
        sharp(girdiYolu)
            .webp({ quality: 80 })
            .toFile(ciktiYolu)
            .then(() => console.log(`Optimize edildi: ${dosya} -> ${path.basename(ciktiYolu)}`))
            .catch(hata => console.error(`İşlem hatası ${dosya}:`, hata));
    }
});
