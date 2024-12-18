const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// المتغيرات الحساسة
const CLIENT_ID = 'eyJ1aWQiOiJtRTU2d2hJVDM2VjhUcnZRVzNuSE95NjdpdWZ5Ukd5bSIsImNsaWVudF9pZCI6IjMifQ==';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJtRTU2d2hJVDM2VjhUcnZRVzNuSE95NjdpdWZ5Ukd5bSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzMyODAxNDQyfQ.KE_GsLap0Xk4OGEV8YFUEUSaEGm7IBASwsfkrCW83j8';

// Middleware لقراءة بيانات الـ Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route لإرسال الرسائل
app.post('/send-message', async (req, res) => {
    const { mobile, text } = req.body; // استقبال المتغيرات من Body

    if (!mobile || !text) {
        return res.status(400).json({ error: 'Mobile and text are required' });
    }

    const url = 'https://toggaar.whats360.live/api/user/v2/send_message_url';
    const params = {
        client_id: CLIENT_ID,
        mobile,
        text,
        token: API_TOKEN,
    };

    try {
        const response = await axios.get(url, { params });
        return res.json(response.data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to send message', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
