# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
## Cinematic Scroll-Driven Hero

The website features a cinematic scroll-driven hero built with GSAP ScrollTrigger and re-encoded MP4 video scrubbing.

### 1. Asset Locations
- **Original Source MP4:** `scroll data/scroll iatomica.mp4` (2560x1440, 24fps, uncompressed keyframes preserved untouched).
- **Optimized Desktop MP4:** `public/media/hero-desktop.mp4` (1080p, GOP 8, faststart, 16.2 MB).
- **Optimized Mobile MP4:** `public/media/hero-mobile.mp4` (720p, GOP 6, faststart, 6.5 MB).
- **Posters:** `public/media/hero-poster.webp` (1080p, 254 KB) & `public/media/hero-poster-mobile.webp` (720p, 70 KB).

### 2. Video Optimization Strategy
Scroll-driven scrubbing requires frequent I-frames (keyframe interval) so random-seeking responds instantaneously without lag or stutter.
Optimized with FFmpeg:
```bash
# Desktop (1080p, GOP 8 = ~3 keyframes/sec):
ffmpeg -i "scroll data/scroll iatomica.mp4" -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -an -movflags +faststart public/media/hero-desktop.mp4 -y

# Mobile (720p, GOP 6 = 4 keyframes/sec):
ffmpeg -i "scroll data/scroll iatomica.mp4" -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -g 6 -keyint_min 6 -sc_threshold 0 -an -movflags +faststart public/media/hero-mobile.mp4 -y

# Posters (WebP):
ffmpeg -ss 00:00:00.000 -i "scroll data/scroll iatomica.mp4" -vframes 1 -vf "scale=1920:-2" -c:v libwebp -lossless 0 -q:v 85 public/media/hero-poster.webp -y
ffmpeg -ss 00:00:00.000 -i "scroll data/scroll iatomica.mp4" -vframes 1 -vf "scale=720:-2" -c:v libwebp -lossless 0 -q:v 80 public/media/hero-poster-mobile.webp -y
```

### 3. Hero Configuration & Customization
All configuration lives in `src/components/hero/heroConfig.ts`:
- **Replace Video:** Change `desktopVideoSrc` or `mobileVideoSrc` paths.
- **Change Scroll Length:** Adjust `scrollLengthDesktop` (default `320vh`), `scrollLengthTablet` (`260vh`), or `scrollLengthMobile` (`200vh`).
- **Modify Object Position:** Adjust `objectPositionDesktop`, `objectPositionTablet`, or `objectPositionMobile` (e.g. `'center 45%'`).
- **Edit Overlay Copy:** Modify the `scenes` array with custom `badge`, `title`, `subtitle`, `startProgress`, and `endProgress`.

### 4. Responsiveness & Reduced Motion
- **Desktop:** Fullscreen pinned sequence with 320vh virtual scrub depth.
- **Mobile/Tablet:** Streamlined scrub distance (200vh-260vh) and lightweight 720p stream with GOP 6.
- **Prefers Reduced Motion:** Automatically detects `prefers-reduced-motion: reduce`, disables pinning and video scrubbing, and displays the static high-fidelity poster and hero copy immediately.
