export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
  
  const { paymentId, txid } = req.body;
  const apiKey = process.env.PI_API_KEY; // بنستخدم نفس المفتاح اللي في فيرسل

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: { 
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid }) // بنبعت رقم المعاملة للشبكة
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "فشل في إتمام العملية" });
  }
}
