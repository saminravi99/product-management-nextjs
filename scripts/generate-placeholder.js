const sharp = require('sharp');
const path = require('path');

// Create product placeholder image
const createPlaceholder = () => {
  const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="#f7f7f2"/>
      <g transform="translate(200, 200)">
        <path d="M-40 -50 L-40 30 L-20 40 L20 40 L40 30 L40 -50 Z" fill="#e4e6c3" stroke="#261c15" stroke-width="3"/>
        <path d="M-40 -50 L0 -60 L40 -50" fill="#c5d86d" stroke="#261c15" stroke-width="3"/>
        <path d="M0 -60 L0 20" stroke="#261c15" stroke-width="2"/>
        <circle cx="0" cy="-5" r="15" fill="#f05d23" opacity="0.3"/>
      </g>
      <text x="200" y="350" text-anchor="middle" font-family="Arial" font-size="16" fill="#261c15" opacity="0.5">No Image Available</text>
    </svg>
  `;

  sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'images', 'product-placeholder.png'))
    .then(() => console.log('✓ Generated product-placeholder.png'))
    .catch(err => console.error('Error:', err));
};

createPlaceholder();
