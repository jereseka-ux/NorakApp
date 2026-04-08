import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { paymentId, txid } = req.body;
    // هنا الكود بيسحب المفتاح من إعدادات ڤيرسل بأمان
    const apiKey = process.env.PI_API_KEY;

    try {
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
            method: 'POST',
            headers: { 
                'Authorization': `Key ${apiKey}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ txid })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
