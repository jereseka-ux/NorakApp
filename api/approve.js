export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { paymentId } = req.body;
  
  // أهم حاجة: حطي الـ Secret Key بتاعك هنا بين الـ ""
  const apiKey = "اكتبي_هنا_مفتاح_الـ_API_الخاص_بكي";

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json(data);
    } else {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
