export async function sendMessage(message) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    return data.reply || 'No response.';
  } catch (error) {
    return 'Sorry, there was an error connecting to the assistant.';
  }
}
