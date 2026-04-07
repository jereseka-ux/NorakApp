export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { paymentId } = req.body;
  const apiKey = "Dzp2ztwwiulrhk3h0ml182jkeonkpge1lgj8ccjypsncntbasjrkwubk8ex2u1zd"; 

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${apiKey}`, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Approve Failed' });
  }
}
