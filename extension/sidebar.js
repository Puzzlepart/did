/**
 * Sidebar script for did Microsoft Edge extension
 * Handles iframe loading, environment switching, and error handling
 */

// Default environment - production
const DEFAULT_ENVIRONMENT = 'https://did.puzzlepart.com'
const STORAGE_KEY = 'did-environment'

// Get DOM elements
const frame = document.getElementById('did-frame')
const loading = document.getElementById('loading')
const errorMessage = document.getElementById('error-message')
const settingsBtn = document.getElementById('settings-btn')
const configPanel = document.getElementById('config-panel')
const environmentSelect = document.getElementById('environment-select')

/**
 * Load the did app in the iframe with the selected environment
 */
function loadDidApp(environment) {
  const url = environment || DEFAULT_ENVIRONMENT
  
  // Show loading state
  loading.style.display = 'flex'
  frame.classList.remove('loaded')
  errorMessage.classList.remove('show')

  // Set iframe source
  frame.src = url

  // Handle iframe load
  frame.onload = () => {
    loading.style.display = 'none'
    frame.classList.add('loaded')
  }

  // Handle iframe error
  frame.onerror = () => {
    loading.style.display = 'none'
    errorMessage.classList.add('show')
  }

  // Timeout fallback (in case onload doesn't fire)
  setTimeout(() => {
    if (loading.style.display !== 'none') {
      loading.style.display = 'none'
      frame.classList.add('loaded')
    }
  }, 5000)
}

/**
 * Save the selected environment to storage
 */
function saveEnvironment(environment) {
  chrome.storage.local.set({ [STORAGE_KEY]: environment })
}

/**
 * Load the saved environment from storage
 */
function loadSavedEnvironment() {
  chrome.storage.local.get([STORAGE_KEY], (result) => {
    const savedEnvironment = result[STORAGE_KEY] || DEFAULT_ENVIRONMENT
    environmentSelect.value = savedEnvironment
    loadDidApp(savedEnvironment)
  })
}

/**
 * Toggle settings panel visibility
 */
function toggleSettings() {
  configPanel.classList.toggle('show')
}

// Event listeners
settingsBtn.addEventListener('click', toggleSettings)

environmentSelect.addEventListener('change', (event) => {
  const selectedEnvironment = event.target.value
  saveEnvironment(selectedEnvironment)
  loadDidApp(selectedEnvironment)
  
  // Close settings panel after selection
  setTimeout(() => {
    configPanel.classList.remove('show')
  }, 300)
})

// Initialize - load saved environment or default
loadSavedEnvironment()

// Listen for messages from the extension background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'reload') {
    loadSavedEnvironment()
  }
  sendResponse({ success: true })
})
