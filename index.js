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

app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});