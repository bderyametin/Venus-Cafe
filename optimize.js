const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'fotograflar');
const outputDir = path.join(__dirname, 'images');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(file => {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        
        sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath)
            .then(() => console.log(`Optimized: ${file} -> ${path.basename(outputPath)}`))
            .catch(err => console.error(`Error processing ${file}:`, err));
    }
});
