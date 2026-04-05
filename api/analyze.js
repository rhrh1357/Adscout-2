export default async function handler(req, res) {
  try {
    const { url } = req.body;

    const prompt = `
다음 업체 홈페이지를 분석해줘: ${url}

반드시 JSON 형식:

{
  "company_name": "",
  "category": "",
  "main_products": [],
  "seo_keywords": [{"keyword":"","reason":""}],
  "profit_keywords": [{"keyword":"","reason":""}],
  "all_keywords": [{"keyword":""}],
  "exclude_keywords": [{"keyword":"","reason":""}]
}
`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANALYZE_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}