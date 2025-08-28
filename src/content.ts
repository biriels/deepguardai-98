// Content script for DeepGuard AI Extension
console.log('DeepGuard AI content script loaded');

// Listen for messages from popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeCurrentPage') {
    const pageData = {
      url: window.location.href,
      title: document.title,
      images: Array.from(document.images).map(img => img.src),
      videos: Array.from(document.querySelectorAll('video')).map(video => video.src)
    };
    sendResponse(pageData);
  }
});

// Auto-detect suspicious content patterns
const detectSuspiciousContent = () => {
  const suspiciousKeywords = ['deepfake', 'ai generated', 'synthetic', 'fake news'];
  const pageText = document.body.innerText.toLowerCase();
  
  return suspiciousKeywords.some(keyword => pageText.includes(keyword));
};

// Notify if suspicious content detected
if (detectSuspiciousContent()) {
  chrome.runtime.sendMessage({
    action: 'suspiciousContentDetected',
    url: window.location.href
  });
}