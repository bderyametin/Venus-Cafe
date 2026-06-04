const Tesseract = require('tesseract.js');

Tesseract.recognize(
  './fotograflar/menu.jpeg',
  'tur',
  { logger: m => {} }
).then(({ data: { text } }) => {
  console.log("--- OCR RESULT ---");
  console.log(text);
}).catch(err => {
  console.error("OCR ERROR:", err);
});
