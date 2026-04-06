export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  const { paymentId, txid } = req.body;
  const apiKey = "Dzp2ztww1ulrhk3h0ml182jkeonkpgellgj8ccjypsncntbasjrkmubk8ex2a1zd"; 

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
    console.log("Pi Complete Response:", data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Complete Failed" });
  }
}
