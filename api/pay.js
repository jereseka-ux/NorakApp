export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { action, paymentId } = req.body;

        if (!action || !paymentId) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        // هنا ممكن تضيفي قاعدة بيانات صغيرة أو Google Sheets أو Firebase
        // لتسجيل الدفع وحالته (approved / completed)
        console.log(`Payment action: ${action}, Payment ID: ${paymentId}`);

        return res.status(200).json({ message: `Payment ${action} registered successfully` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
