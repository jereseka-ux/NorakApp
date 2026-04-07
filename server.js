import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PI_API_KEY = "حطي_API_KEY_هنا";

app.post("/approve", async (req, res) => {
    const { paymentId } = req.body;

    await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
        method: "POST",
        headers: {
            "Authorization": `Key ${PI_API_KEY}`
        }
    });

    res.send({ success: true });
});

app.post("/complete", async (req, res) => {
    const { paymentId, txid } = req.body;

    await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
        method: "POST",
        headers: {
            "Authorization": `Key ${PI_API_KEY}`
        }
    });

    res.send({ success: true });
});

app.listen(3000, () => console.log("Server running 🚀"));
