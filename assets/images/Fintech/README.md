# Fintech Case Study Assets

This directory contains the visual assets for the Business Case Analyzer Fintech case study pages.

## Required Images

The following `.webp` images are referenced in the case study pages:

### 1. fintech-hero-ui.webp
- **Description**: Complete dashboard screenshot of Business Case Analyzer
- **Purpose**: Hero section main visual showcasing the full application interface
- **Recommended Size**: 2000x1200px or larger
- **Style**: Professional dashboard with charts, metrics, and financial data
- **Fallback**: Falls back to `professional-design-final.png` (EN) or `professional-spanish.png` (ES)

### 2. fintech-code-snippet.webp
- **Description**: Aesthetic code screenshot showing `generateMockLLMAnalysis` or `calculateIRR` function
- **Purpose**: Code Aesthetics section - demonstrates clean, readable code
- **Recommended Size**: 1200x800px
- **Style**: Dark theme code editor (VS Code or similar) with syntax highlighting
- **Fallback**: Shows inline code snippet of `calculateIRR` function
- **Suggested Code to Screenshot**:
  - `generateMockLLMAnalysis()` function from app.js (lines 1162+)
  - `calculateIRR()` function from app.js (lines 361+)

### 3. fintech-mobile-grid.webp
- **Description**: Mobile responsive design showcase (multiple device sizes)
- **Purpose**: Mobile & Responsive section
- **Recommended Size**: 1600x1000px
- **Style**: Grid showing phone, tablet, and desktop views of the application
- **Fallback**: Shows placeholder with simple device mockups

## Image Creation Guidelines

All images should follow these specifications:

- **Format**: WebP (for optimal compression and quality)
- **Theme**: Dark fintech aesthetic (slate-900 background)
- **Color Palette**:
  - Primary: Blue-500, Cyan-400
  - Accent: Emerald-400, Emerald-500
  - Backgrounds: Slate-900, Slate-800, Black
  - Text: Gray-100, Gray-300, Gray-400

## How to Generate Screenshots

1. **Hero UI Screenshot**:
   - Open `index.html` in browser
   - Fill in sample data and run calculations
   - Capture full viewport screenshot at 1920x1080 minimum
   - Ensure all dashboard metrics are visible and populated

2. **Code Snippet Screenshot**:
   - Open `app.js` in VS Code with dark theme
   - Navigate to `calculateIRR` or `generateMockLLMAnalysis` function
   - Use a dark theme like "One Dark Pro" or "Night Owl"
   - Capture clean code window (no sidebars)
   - Recommended extension: "Polacode" for aesthetic code screenshots

3. **Mobile Grid Screenshot**:
   - Use browser DevTools responsive design mode
   - Capture screenshots at: 375px, 768px, 1440px widths
   - Arrange screenshots in a grid layout
   - Add subtle shadows and spacing between devices

## Converting to WebP

Use ImageMagick or online tools:

```bash
# Using ImageMagick
convert input.png -quality 85 output.webp

# Using cwebp (Google's WebP encoder)
cwebp -q 85 input.png -o output.webp
```

## Current Status

⚠️ **Images are currently placeholders/missing**

The HTML pages include fallback logic:
- `onerror` handlers switch to existing PNG screenshots from root directory
- CSS fallbacks show placeholder diagrams with icons
- All functionality works without images, but visual impact is reduced

To complete the case study, add the three `.webp` files to this directory.
