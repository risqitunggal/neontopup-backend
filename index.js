const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');
const app = express();
const PORT = process.env.PORT || 3000;

// Izinkan akses dari mana saja agar testing lancar
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Tambahkan rute GET untuk pengetesan manual di browser
app.get('/', (req, res) => {
    res.send('Server NeonTopUp Aktif dan Siap Menerima Pesanan!');
});

// Inisialisasi Midtrans Snap
let snap = new midtransClient.Snap({
    isProduction: false, // Karena masih Sandbox
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

app.post('/api/bayar', async (req, res) => {
    try {
        const { userId, serverId, paket, harga } = req.body;

        // Bersihkan harga dari huruf (misal "Rp 50.000" jadi 50000)
        const numericPrice = parseInt(harga.replace(/\D/g, ""));

        let parameter = {
            "transaction_details": {
                "order_id": "NEON-" + Date.now(),
                "gross_amount": numericPrice
            },
            "credit_card": { "secure": true },
            "customer_details": {
                "first_name": "ID: " + userId,
                "last_name": "(" + serverId + ")",
                "email": "customer@neontopup.com" // Email formal
            },
            "item_details": [{
                "id": "ITEM1",
                "price": numericPrice,
                "quantity": 1,
                "name": paket
            }]
        };

        const transaction = await snap.createTransaction(parameter);
        
        res.json({
            status: "success",
            token: transaction.token
        });
    } catch (error) {
        console.error("Midtrans Error:", error);
        res.status(500).json({ status: "error", message: error.message });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server NeonTopUp aktif di port ${PORT}`);
});