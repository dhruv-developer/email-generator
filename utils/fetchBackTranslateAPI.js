export async function fetchBackTranslateAPI(text, targetLang) {
    const translatedText = await fetchTranslateAPI(text, targetLang);
    const backTranslatedText = await fetchTranslateAPI(translatedText, "en");
    return { translatedText, backTranslatedText };
  }
  