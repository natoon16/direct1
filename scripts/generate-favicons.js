const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateFavicons() {
  const sizes = {
    'icon-16x16.png': 16,
    'icon-32x32.png': 32,
    'icon-192x192.png': 192,
    'icon-512x512.png': 512,
    'apple-touch-icon.png': 180
  };

  try {
    // Read the SVG file
    const inputSvg = path.join(__dirname, '../public/favicon.svg');
    const svgBuffer = await fs.readFile(inputSvg);

    // Generate PNG files
    for (const [filename, size] of Object.entries(sizes)) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, '../public', filename));
    }

    // Generate favicon.ico (32x32)
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFile(path.join(__dirname, '../public/favicon.ico'));

    console.log('Favicon generation completed successfully!');
  } catch (error) {
    console.error('Error generating favicons:', error);
  }
}

generateFavicons(); 