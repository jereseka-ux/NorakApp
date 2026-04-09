import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { paymentId } = req.body;
    const apiKey = process.env.PI_API_KEY;

    try {
        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: { 
                'Authorization': `Key ${apiKey}`, 
                'Content-Type': 'application/json' 
            }
        });

        const data = await response.json();

        // لو شبكة باي ردت بغلط، نبعت الغلط ده للتطبيق عشان نفهمه
        if (!response.ok) {
            console.error("Pi API Error:", data);
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: error.message });
    }
}
