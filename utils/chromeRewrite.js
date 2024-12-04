export async function chromeRewrite() {
    const rewriteButton = document.querySelector("button[aria-label*='Rewrite']");
  
    if (rewriteButton) {
      rewriteButton.click();
    } else {
      throw new Error("Rewrite button not found. Ensure the Write feature is available in Gmail or Docs.");
    }
  }
  