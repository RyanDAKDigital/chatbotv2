import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: "You are a helpful and friendly assistant for a professional digital services company." },
        { role: "user", content: message }
      ],
    });

    res.status(200).json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ reply: 'Error: ' + error.message });
  }
}
