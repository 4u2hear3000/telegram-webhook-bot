const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8647251420:AAE6TgHFcQ_hbb4TZPNPQyBzYhJYM3f5XnU';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const update = req.body;
    console.log('Received update:', JSON.stringify(update, null, 2));

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || update.message.caption || '';

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `🤖 Bot received: "${text}"\n\nUpdate ID: ${update.update_id}`
        })
      });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing update:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
