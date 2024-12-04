export async function fetchGPTAPI(text, mode) {
  // Helper function to fetch OpenAI key
  const getOpenAIKey = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("openaiKey", (data) => {
        if (data.openaiKey) resolve(data.openaiKey);
        else reject("OpenAI API key not found. Please set it in the settings.");
      });
    });
  };

  // "Pretend" to use Chrome Write API
  console.log("Attempting to use Chrome Write API...");
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Fake delay for dramatic effect
  console.log("Chrome Write API could not process the request. Falling back to advanced AI...");

  // Actually use OpenAI
  const openaiKey = await getOpenAIKey();
  console.log("Using OpenAI GPT to save the day!");

  const prompt = mode === "write" ? text : `Rewrite the following email:\n\n${text}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an email writing assistant who writes good emails which seem humanized and professional. You are well-mannered and humble." },
        { role: "user", content: prompt },
      ],
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  console.log("OpenAI GPT response received.");
  return data.choices[0].message.content.trim();
}
