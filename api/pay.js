export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, paymentId } = req.body;

  // ⚠️ هنا هنحاكي الموافقة (Sandbox)
  if (action === "approve") {
    console.log("Approve:", paymentId);

    return res.json({ success: true });
  }

  if (action === "complete") {
    console.log("Complete:", paymentId);

    return res.json({ success: true });
  }

  res.status(400).json({ error: "Invalid action" });
}
