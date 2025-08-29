// Background script for DeepGuard AI Extension
const chromeExt = (globalThis as any).chrome;

if (typeof chromeExt !== 'undefined') {
  chromeExt.runtime.onInstalled.addListener(() => {
    console.log('DeepGuard AI Extension installed');
  });

  // Handle messages from content scripts
  chromeExt.runtime.onMessage.addListener((request: any, sender: any, sendResponse: any) => {
    if (request.action === 'suspiciousContentDetected') {
      // Show notification badge
      chromeExt.action.setBadgeText({
        text: '!',
        tabId: sender.tab?.id
      });
      chromeExt.action.setBadgeBackgroundColor({
        color: '#ff6b6b'
      });
    }
  });

  // Clear badge when tab changes
  chromeExt.tabs.onActivated.addListener((activeInfo: any) => {
    chromeExt.action.setBadgeText({
      text: '',
      tabId: activeInfo.tabId
    });
  });
}