const fs = require('fs');
const path = require('path');

// Simple SVG icon generator - creates colored icons
function createIcon(size, filename) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#60a5fa" rx="${size * 0.2}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.3}" font-weight="bold" fill="#0f172a" text-anchor="middle" dominant-baseline="middle">CE</text>
</svg>`;
  
  const filePath = path.join(__dirname, 'public', filename);
  fs.writeFileSync(filePath, svg);
  console.log(`Created ${filename}`);
}

// Create SVG icons (browsers can use SVG in manifest)
createIcon(192, 'icon-192.svg');
createIcon(512, 'icon-512.svg');

console.log('\n✅ Icons created!');
console.log('Note: For better compatibility, convert these SVG files to PNG using:');
console.log('   - Online: https://cloudconvert.com/svg-to-png');
console.log('   - Or use: npm install -g sharp-cli && sharp -i public/icon-192.svg -o public/icon-192.png');


