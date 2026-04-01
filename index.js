const express = require('express');
const cors = require('cors');
const app = express();

// Konfigurasi PORT untuk Railway
const PORT = process.env.PORT || 3000;

// 1. PENGATURAN CORS (HARUS DI ATAS)
app.use(cors({
    origin: '*', // Mengizinkan akses dari mana saja
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// 2. MIDDLEWARE JSON
app.use(express.json());

// Jalur tes (untuk cek di browser)
app.get('/', (req, res) => {
    res.send('Server NeonTopUp Aktif dan Siap Menerima Pesanan!');
});

// Jalur Pembayaran
app.post('/api/bayar', (req, res) => {
    const data = req.body;
    
    // Log ini akan muncul di dashboard LOGS Railway Anda
    console.log("Pesanan masuk:", data);

    if (!data.userId) {
        return res.status(400).json({ status: "error", message: "User ID kosong" });
    }

    res.json({
        status: "success",
        message: "Server Railway menerima pesanan untuk ID: " + data.userId
    });
});

// 3. LISTEN DENGAN HOST 0.0.0.0 (PENTING UNTUK RAILWAY)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server jalan di port ${PORT}`);
});