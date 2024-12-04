export async function chromeWrite(text) {
    const activeElement = document.activeElement;
  
    if (activeElement && activeElement.contentEditable === "true") {
      // Insert text into the active editable element
      activeElement.innerHTML = text;
    } else {
      // Try to find a textarea (for Gmail's compose box, for example)
      const textarea = document.querySelector("textarea");
      if (textarea) {
        textarea.value = text;
        textarea.dispatchEvent(new Event("input", { bubbles: true })); // Trigger Gmail's internal events
      } else {
        throw new Error("No suitable editor found for Chrome Write API.");
      }
    }
  }
  