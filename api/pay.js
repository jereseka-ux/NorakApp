export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentId } = req.body;
    
    try {
      // هنا بنبعت لـ Pi Network إننا موافقين على العملية
      // ملحوظة: لازم تضيفي الـ API Key في إعدادات فيرسل زي ما هقولك تحت
      const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${process.env.PI_API_KEY}`
        }
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Approval failed" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
