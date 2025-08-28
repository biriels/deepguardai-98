// Background script for DeepGuard AI Extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('DeepGuard AI Extension installed');
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'suspiciousContentDetected') {
    // Show notification badge
    chrome.action.setBadgeText({
      text: '!',
      tabId: sender.tab?.id
    });
    chrome.action.setBadgeBackgroundColor({
      color: '#ff6b6b'
    });
  }
});

// Clear badge when tab changes
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.action.setBadgeText({
    text: '',
    tabId: activeInfo.tabId
  });
});