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

        if (!response.ok) {
            // السطر ده حيخلينا نشوف الغلط بالظبط في Vercel Logs
            console.error("خطأ من شبكة باي:", JSON.stringify(data));
            return res.status(response.status).json(data);
        }

        console.log("تمت الموافقة بنجاح!");
        return res.status(200).json(data);
    } catch (error) {
        console.error("عطل فني في السيرفر:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
