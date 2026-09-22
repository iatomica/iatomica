import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import sharp from 'sharp';

const ffmpegPath = 'C:\\Users\\manua\\AppData\\Local\\Cypress\\Cache\\16.0.0\\Cypress\\resources\\app\\node_modules\\@ffmpeg-installer\\win32-x64\\ffmpeg.exe';
const desktopVideo = 'scroll data/horizontal scroll.mp4';
const mobileVideo = 'scroll data/mobile scroll.mp4';

const tempDesktopDir = '.temp_desktop_frames';
const tempMobileDir = '.temp_mobile_frames';
const desktopOutDir = 'public/media/frames/desktop';
const mobileOutDir = 'public/media/frames/mobile';

// Clean and recreate directories
for (const dir of [tempDesktopDir, tempMobileDir, desktopOutDir, mobileOutDir]) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

console.log('--- 1. EXTRACTING FRAMES AT 12 FPS ---');
console.log('Extracting Desktop frames (horizontal)...');
execSync(`"${ffmpegPath}" -i "${desktopVideo}" -vf "fps=12" "${tempDesktopDir}/frame_%03d.png" -y`, { stdio: 'inherit' });

console.log('Extracting Mobile frames (vertical 9:16)...');
execSync(`"${ffmpegPath}" -i "${mobileVideo}" -vf "fps=12" "${tempMobileDir}/frame_%03d.png" -y`, { stdio: 'inherit' });

const desktopFiles = fs.readdirSync(tempDesktopDir).filter(f => f.endsWith('.png')).sort();
const mobileFiles = fs.readdirSync(tempMobileDir).filter(f => f.endsWith('.png')).sort();

console.log(`Extracted: Desktop = ${desktopFiles.length} frames, Mobile = ${mobileFiles.length} frames.`);

// Match total frame count to minimum of both to keep exact 1:1 synchronization
const totalFrames = Math.min(desktopFiles.length, mobileFiles.length);
console.log(`Synchronizing to ${totalFrames} frames for both viewports.`);

console.log('\n--- 2. COMPRESSING FRAMES TO WEBP WITH SHARP (HIGH QUALITY) ---');
const startTime = Date.now();

// Process Desktop Frames
console.log('Compressing Desktop (1920x1080 WebP, Q78)...');
let completedDesktop = 0;
const limit = 8;

async function processDesktop() {
  let idx = 0;
  async function worker() {
    while (idx < totalFrames) {
      const i = idx++;
      const file = desktopFiles[i];
      const inputPath = path.join(tempDesktopDir, file);
      const paddedNumber = String(i).padStart(3, '0');
      const outPath = path.join(desktopOutDir, `frame_${paddedNumber}.webp`);

      const imgBuf = fs.readFileSync(inputPath);
      await sharp(imgBuf)
        .resize(1920, 1080, { fit: 'cover' })
        .webp({ quality: 78, effort: 5, smartSubsample: true })
        .toFile(outPath);

      completedDesktop++;
      if (completedDesktop % 30 === 0 || completedDesktop === totalFrames) {
        console.log(`Desktop progress: ${completedDesktop}/${totalFrames} (${Math.round((completedDesktop / totalFrames) * 100)}%)`);
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
}

// Process Mobile Frames
console.log('Compressing Mobile (1080x1920 WebP, Q76)...');
let completedMobile = 0;

async function processMobile() {
  let idx = 0;
  async function worker() {
    while (idx < totalFrames) {
      const i = idx++;
      const file = mobileFiles[i];
      const inputPath = path.join(tempMobileDir, file);
      const paddedNumber = String(i).padStart(3, '0');
      const outPath = path.join(mobileOutDir, `frame_${paddedNumber}.webp`);

      const imgBuf = fs.readFileSync(inputPath);
      await sharp(imgBuf)
        .resize(1080, 1920, { fit: 'cover' })
        .webp({ quality: 76, effort: 5, smartSubsample: true })
        .toFile(outPath);

      completedMobile++;
      if (completedMobile % 30 === 0 || completedMobile === totalFrames) {
        console.log(`Mobile progress: ${completedMobile}/${totalFrames} (${Math.round((completedMobile / totalFrames) * 100)}%)`);
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
}

await processDesktop();
await processMobile();

console.log(`\n--- 3. CLEANING UP TEMP FILES ---`);
fs.rmSync(tempDesktopDir, { recursive: true, force: true });
fs.rmSync(tempMobileDir, { recursive: true, force: true });

function getDirSize(dir) {
  return fs.readdirSync(dir).reduce((sum, f) => sum + fs.statSync(path.join(dir, f)).size, 0);
}

const desktopMB = (getDirSize(desktopOutDir) / (1024 * 1024)).toFixed(2);
const mobileMB = (getDirSize(mobileOutDir) / (1024 * 1024)).toFixed(2);

console.log(`Done in ${((Date.now() - startTime) / 1000).toFixed(1)}s!`);
console.log(`Total Desktop Size: ${desktopMB} MB (${totalFrames} frames @ 1920x1080)`);
console.log(`Total Mobile Size: ${mobileMB} MB (${totalFrames} frames @ 1080x1920)`);
console.log(`TOTAL_FRAMES = ${totalFrames}`);
