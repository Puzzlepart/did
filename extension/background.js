/**
 * Background service worker for did Microsoft Edge extension
 * Handles extension initialization and icon click behavior
 */

/**
 * Handle extension icon click - open the sidebar
 */
chrome.action.onClicked.addListener((tab) => {
  // Open the sidebar when the extension icon is clicked
  chrome.sidePanel.open({ windowId: tab.windowId })
})

/**
 * Handle extension installation
 */
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('did sidebar extension installed')
    
    // Set default environment on first install
    chrome.storage.local.set({ 
      'did-environment': 'https://did.puzzlepart.com' 
    })
  } else if (details.reason === 'update') {
    console.log('did sidebar extension updated to version', chrome.runtime.getManifest().version)
  }
})

/**
 * Handle messages from sidebar or other extension parts
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getEnvironment') {
    chrome.storage.local.get(['did-environment'], (result) => {
      sendResponse({ environment: result['did-environment'] || 'https://did.puzzlepart.com' })
    })
    return true // Keep the message channel open for async response
  }
})

console.log('did sidebar extension background worker initialized')
