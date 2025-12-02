Automated fixes applied:
- Replaced core files: src/services/SiteContext.tsx, src/App.tsx, src/components/Footer.tsx
- Removed <script type="importmap"> blocks from index.html (if present)
- Added Open Graph & Twitter meta tags + JSON-LD to <head> in index.html
- Added loading="lazy" and width/height attributes to img tags that lacked them
- Added rel="noopener noreferrer" to anchors with target="_blank"
- Added aria-labels to input elements that lacked id/name/aria-label (where safe)
- Added basic ESLint config (.eslintrc.json) and "lint" script to package.json (if found)

Notes:
- The aria-label additions are generic and may need manual refinement for better accessibility wording.
- Image width/height values defaulted to 800x600 if not present; consider setting accurate dimensions per image.
- Please run `npm install` and ensure eslint plugins/dependencies are installed before running `npm run lint`.
