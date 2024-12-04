export async function fetchTranslateAPI(emailContent, targetLang, apiKey) {
  const prompt = `Translate the following email content into ${targetLang} language keeping the context same as professionall:\n\n${emailContent}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional translator." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    }),
  });

  const data = await response.json();
  console.log("OpenAI Response:", data); // Log the full response

  if (data.error) {
    console.error("API Error:", data.error.message);
    throw new Error(data.error.message);
  }

  return data.choices[0].message.content.trim(); // Extract and return translated content
}
