# Setting Up RBGJ Events Logo as App Icon

## Step 1: Prepare Your Logo

1. Make sure you have your RBGJ Events logo file (PNG, JPG, or SVG format)
2. Place it in the project root or `public` folder

## Step 2: Convert Logo to Required Icon Sizes

You need to create two PNG files:
- `public/icon-192.png` (192x192 pixels)
- `public/icon-512.png` (512x512 pixels)

### Option A: Online Tools (Easiest)

1. **Using RealFaviconGenerator:**
   - Go to: https://realfavicongenerator.net/
   - Upload your logo
   - Download the generated icons
   - Copy `android-chrome-192x192.png` → rename to `icon-192.png`
   - Copy `android-chrome-512x512.png` → rename to `icon-512.png`
   - Place both in the `public` folder

2. **Using PWA Builder:**
   - Go to: https://www.pwabuilder.com/imageGenerator
   - Upload your logo
   - Download the generated icons
   - Place in `public` folder

### Option B: Using Image Editor

1. Open your logo in any image editor (Photoshop, GIMP, Paint.NET, etc.)
2. Resize to 192x192 pixels → Save as `public/icon-192.png`
3. Resize to 512x512 pixels → Save as `public/icon-512.png`
4. Make sure both are PNG format with transparent background (if needed)

### Option C: Using Command Line (if you have ImageMagick)

```bash
# Install ImageMagick first, then:
magick your-logo.png -resize 192x192 public/icon-192.png
magick your-logo.png -resize 512x512 public/icon-512.png
```

## Step 3: Verify

After placing the icon files, restart your server and check:
- The app should show your logo when installed on mobile
- The manifest.json already references these files

## Important Notes

- Icons should be square (same width and height)
- PNG format is required
- Transparent background is recommended
- Icons should look good at small sizes (192px) and large sizes (512px)
- The logo should be centered and clearly visible


