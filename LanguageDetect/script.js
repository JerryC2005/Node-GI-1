const languageDetect = require('languagedetect');
const lngDetector = new languageDetect();

const langDetect = require('langdetect');

console.log(lngDetector.detect('es macht gut', 1));
console.log(lngDetector.detect('Dobra prace', 1));
console.log(lngDetector.detect('gwaith da', 1));