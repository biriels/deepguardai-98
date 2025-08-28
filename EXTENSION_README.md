# DeepGuard AI Browser Extension

Your React app has been converted into a browser extension! 

## Building the Extension

Run the build script:
```bash
npm run build:extension
```

Or use the Windows batch file:
```bash
extension-build.bat
```

## Installing the Extension

1. Build the extension using the command above
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `dist-extension` folder
5. The DeepGuard AI extension will appear in your browser toolbar

## Extension Features

- **Popup Interface**: Click the extension icon to analyze URLs and current pages
- **Content Detection**: Automatically detects suspicious content on web pages
- **Real-time Analysis**: Uses your existing AI models for deepfake detection
- **Badge Notifications**: Shows alerts when suspicious content is detected

## File Structure

- `src/popup.tsx` - Extension popup interface
- `src/content.ts` - Content script that runs on web pages
- `src/background.ts` - Background service worker
- `public/manifest.json` - Extension configuration
- `public/popup.html` - Popup HTML container
- `vite.config.extension.ts` - Extension build configuration

## Development

To develop both the web app and extension:

- Web app: `npm run dev`
- Extension: Build with `npm run build:extension` and reload in Chrome

The extension uses your existing `ExtensionPopup` component and AI detection services.