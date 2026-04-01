const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000; // Railway akan mengisi PORT ini secara otomatis

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server NeonTopUp Aktif!');
});

app.post('/api/bayar', (req, res) => {
    const data = req.body;
    console.log("Pesanan masuk:", data);

    // Nanti di sini kita hubungkan ke TriPay
    res.json({
        status: "success",
        message: "Server Railway menerima pesanan untuk ID: " + data.userId
    });
});

// Tambahkan '0.0.0.0' agar bisa diakses secara publik di Railway
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server NeonTopUp jalan di port ${PORT}`);
});