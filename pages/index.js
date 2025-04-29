import Head from 'next/head'
import { useState } from 'react'
import { sendMessage } from '../utils/api'
import config from '../utils/config'

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    const reply = await sendMessage(input);
    setMessages([...newMessages, { sender: 'bot', text: reply }]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Head>
        <title>{config.botName} - Powered by DAK Digital</title>
      </Head>
      <header className="p-4 bg-gray-900 text-center text-xl font-bold">
        {config.welcomeMessage}
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="my-2">
            <strong>{msg.sender === 'user' ? 'You' : config.botName}:</strong> {msg.text}
          </div>
        ))}
      </main>
      <footer className="p-4 flex space-x-2 bg-gray-800">
        <input
          className="flex-1 p-2 rounded bg-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-amber-400 text-black px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </footer>
    </div>
  );
}
