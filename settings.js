document.getElementById("save-keys").addEventListener("click", () => {
    const openaiKey = document.getElementById("openai-key").value;
    const googleKey = document.getElementById("google-key").value;
  
    // Store API keys in Chrome local storage
    chrome.storage.local.set({ openaiKey, googleKey }, () => {
      document.getElementById("status").textContent = "API keys saved successfully!";
    });
  });
  
  // Pre-fill keys if already saved (optional)
  chrome.storage.local.get(["openaiKey", "googleKey"], (keys) => {
    if (keys.openaiKey) {
      document.getElementById("openai-key").value = keys.openaiKey;
    }
    if (keys.googleKey) {
      document.getElementById("google-key").value = keys.googleKey;
    }
  });
  