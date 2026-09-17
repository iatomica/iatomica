import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const ffmpegPath = 'C:\\Users\\manua\\AppData\\Local\\Cypress\\Cache\\16.0.0\\Cypress\\resources\\app\\node_modules\\@ffmpeg-installer\\win32-x64\\ffmpeg.exe';
const sourceVideo = 'scroll data/scroll iatomica.mp4';
const tempDir = '.temp_frames';
const desktopOutDir = 'public/media/frames/desktop';
const mobileOutDir = 'public/media/frames/mobile';

fs.mkdirSync(tempDir, { recursive: true });
fs.mkdirSync(desktopOutDir, { recursive: true });
fs.mkdirSync(mobileOutDir, { recursive: true });

console.log('1. Extracting high-res PNG frames at 10 fps (151 frames total)...');
execSync(`"${ffmpegPath}" -i "${sourceVideo}" -vf "fps=10" "${tempDir}/frame_%03d.png" -y`, { stdio: 'inherit' });

const files = fs.readdirSync(tempDir).filter(f => f.endsWith('.png')).sort();
console.log(`2. Extracted ${files.length} frames. Compressing to WebP with Sharp in parallel...`);

const startTime = Date.now();
let completed = 0;

// Process with a concurrency limit of 6 workers
const limit = 6;
let index = 0;

async function worker() {
  while (index < files.length) {
    const currentIndex = index++;
    const file = files[currentIndex];
    const inputPath = path.join(tempDir, file);
    const frameNumber = String(currentIndex).padStart(3, '0');
    const desktopOut = path.join(desktopOutDir, `frame_${frameNumber}.webp`);
    const mobileOut = path.join(mobileOutDir, `frame_${frameNumber}.webp`);

    const imageBuffer = fs.readFileSync(inputPath);

    // Desktop 1080p
    await sharp(imageBuffer)
      .resize(1920, 1080, { fit: 'cover' })
      .webp({ quality: 76, effort: 5, smartSubsample: true })
      .toFile(desktopOut);

    // Mobile 540p
    await sharp(imageBuffer)
      .resize(960, 540, { fit: 'cover' })
      .webp({ quality: 72, effort: 5, smartSubsample: true })
      .toFile(mobileOut);

    completed++;
    if (completed % 25 === 0 || completed === files.length) {
      console.log(`Progress: ${completed}/${files.length} frames processed (${Math.round((completed / files.length) * 100)}%)`);
    }
  }
}

await Promise.all(Array.from({ length: limit }, () => worker()));

console.log(`3. Finished in ${((Date.now() - startTime) / 1000).toFixed(1)}s! Cleaning up temp files...`);
fs.rmSync(tempDir, { recursive: true, force: true });

// Measure total sizes
function getDirSize(dir) {
  return fs.readdirSync(dir).reduce((sum, f) => sum + fs.statSync(path.join(dir, f)).size, 0);
}

const desktopMB = (getDirSize(desktopOutDir) / (1024 * 1024)).toFixed(2);
const mobileMB = (getDirSize(mobileOutDir) / (1024 * 1024)).toFixed(2);

console.log(`Total Desktop Frames Size: ${desktopMB} MB (${files.length} frames)`);
console.log(`Total Mobile Frames Size: ${mobileMB} MB (${files.length} frames)`);
