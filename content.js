async function chromeWrite(text) {
    const activeElement = document.activeElement;
    if (activeElement && activeElement.contentEditable === "true") {
      activeElement.innerHTML = text;
    } else {
      throw new Error("No suitable editor found.");
    }
  }
  
  async function chromeRewrite(text) {
    const rewriteButton = document.querySelector("button[aria-label*='Rewrite']");
    if (rewriteButton) {
      rewriteButton.click();
    } else {
      throw new Error("Rewrite button not found.");
    }
  }
  