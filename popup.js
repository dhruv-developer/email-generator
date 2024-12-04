import { fetchBackTranslateAPI } from './utils/fetchBackTranslateAPI.js';
import { fetchTranslateAPI } from './utils/fetchTranslateAPI.js';
import { fetchGPTAPI } from './utils/fetchGPTApi.js';
import { chromeWrite } from './utils/chromeWrite.js';
import { chromeRewrite } from './utils/chromeRewrite.js';

// Helper function to fetch OpenAI API key from storage
async function getOpenAIKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("openaiKey", (data) => {
      if (data.openaiKey) resolve(data.openaiKey);
      else reject(new Error("OpenAI API key not found. Please set it in the settings."));
    });
  });
}

// Helper function to fetch Google API key from storage
async function getGoogleKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("googleKey", (data) => {
      if (data.googleKey) resolve(data.googleKey);
      else reject(new Error("Google API key not found. Please set it in the settings."));
    });
  });
}

// Event listener for the Write button
document.getElementById("write-btn").addEventListener("click", async () => {
  const text = document.getElementById("email-draft").value;
  try {
    // Use Chrome Write API
    await chromeWrite(text);
    document.getElementById("output").textContent = "Text sent to Chrome Write API successfully!";
  } catch (err) {
    console.error("Error using Chrome Write API. Falling back to OpenAI:", err);
    try {
      const openaiKey = await getOpenAIKey();
      const result = await fetchGPTAPI(text, "write", openaiKey);
      console.log("OpenAI GPT API Response:", result); // Debugging API response
      document.getElementById("output").textContent = `Response: ${result}`;
    } catch (apiErr) {
      console.error("Error using OpenAI GPT API:", apiErr);
      document.getElementById("output").textContent = "Failed to process your request.";
    }
  }
});

// Event listener for the Rewrite button
document.getElementById("rewrite-btn").addEventListener("click", async () => {
  const text = document.getElementById("email-draft").value;
  try {
    // Use Chrome Rewrite API
    await chromeRewrite(text);
    document.getElementById("output").textContent = "Text sent to Chrome Rewrite API successfully!";
  } catch (err) {
    console.error("Error using Chrome Rewrite API. Falling back to OpenAI:", err);
    try {
      const openaiKey = await getOpenAIKey();
      const result = await fetchGPTAPI(text, "rewrite", openaiKey);
      console.log("OpenAI GPT API Response:", result); // Debugging API response
      document.getElementById("output").textContent = `Response: ${result}`;
    } catch (apiErr) {
      console.error("Error using OpenAI GPT API:", apiErr);
      document.getElementById("output").textContent = "Failed to process your request.";
    }
  }
});

// Event listener for the Translate button
document.getElementById("translate-btn").addEventListener("click", async () => {
    const emailContent = document.getElementById("email-draft").value;
    const language = document.getElementById("language-selector").value;
  
    try {
      const openaiKey = await getOpenAIKey(); // Fetch OpenAI API key
      console.log("Email Content:", emailContent); // Debug input content
      console.log("Target Language:", language);  // Debug target language
  
      const translatedContent = await fetchTranslateAPI(emailContent, language, openaiKey);
      console.log("Translated Content:", translatedContent); // Debug API response
      document.getElementById("output").textContent = `Translated Email:\n\n${translatedContent}`;
    } catch (err) {
      console.error("Error translating email content:", err);
      document.getElementById("output").textContent = "Translation failed. Please try again.";
    }
  });
  
  

// Event listener for the Back Translate button
document.getElementById("back-translate-btn").addEventListener("click", async () => {
  const text = document.getElementById("email-draft").value;
  const language = document.getElementById("language-selector").value;
  try {
    const googleKey = await getGoogleKey();
    const result = await fetchBackTranslateAPI(text, language, googleKey);
    console.log("Back Translate API Response:", result); // Debugging API response
    document.getElementById("output").textContent = `Translated: ${result.translatedText}\nBack Translated: ${result.backTranslatedText}`;
  } catch (err) {
    console.error("Error using Back Translate API:", err);
    document.getElementById("output").textContent = "Back translation failed. Please try again.";
  }
});

// Event listener for the Settings button
document.getElementById("settings-btn").addEventListener("click", () => {
  // Open settings.html in a new tab
  chrome.tabs.create({ url: chrome.runtime.getURL("settings.html") });
});
