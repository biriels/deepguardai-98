@echo off
echo Building DeepGuard AI Extension...

REM Build the extension
npm run build:extension

echo Extension built successfully!
echo Extension files are in the 'dist-extension' folder
echo.
echo To install the extension:
echo 1. Open Chrome and go to chrome://extensions/
echo 2. Enable "Developer mode" in the top right
echo 3. Click "Load unpacked" and select the 'dist-extension' folder
echo.
pause