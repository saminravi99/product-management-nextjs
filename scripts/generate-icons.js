const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create a simple icon SVG
const iconSvg = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#f05d23" rx="100"/>
  <text x="50%" y="50%" font-size="300" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif">P</text>
</svg>
`;

const publicDir = path.join(__dirname, '..', 'public');

// Generate 192x192 icon
sharp(Buffer.from(iconSvg))
  .resize(192, 192)
  .png()
  .toFile(path.join(publicDir, 'icon-192.png'))
  .then(() => console.log('✓ Generated icon-192.png'))
  .catch(err => console.error('Error generating icon-192.png:', err));

// Generate 512x512 icon
sharp(Buffer.from(iconSvg))
  .resize(512, 512)
  .png()
  .toFile(path.join(publicDir, 'icon-512.png'))
  .then(() => console.log('✓ Generated icon-512.png'))
  .catch(err => console.error('Error generating icon-512.png:', err));
