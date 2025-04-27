const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'src/lib/assets');
const targetDir = path.join(__dirname, 'static/assets/video-generator-assets');

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Copy files from source to target
fs.readdirSync(sourceDir).forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`Copied ${file} to ${targetDir}`);
}); 