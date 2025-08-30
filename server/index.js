const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const supabase = require('./supabaseClient');
const cron = require('node-cron');
const PORT = 3000;
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const savedPostRoutes = require("./routes/savedPostRoutes");
const messageRoutes = require("./routes/messageRoutes");
const conversationRoutes = require("./routes/conversationRoutes");
const { cleanupConversationsandMessages } = require("./cleanupController");
const app = express();
const path = require('path');
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
const clientPath = path.join(__dirname, '/client/dist');
app.use(express.static(clientPath));
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', savedPostRoutes);
app.use('/api', messageRoutes);
app.use('/api', conversationRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});
const upload = multer({ storage: multer.memoryStorage() });

// Example POST route

cron.schedule('0 0 * * *', () => {
    console.log('Running cleanup task every day at midnight');
    cleanupConversationsandMessages();
});
// cleanupConversationsandMessages();
app.post("/api/data", (req, res) => {
    const body = req.body;
    res.json({ message: "Data received", data: body });
});
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { file } = req;
        const fileName = `${Date.now()}-${file.originalname}`;

        const { data, error } = await supabase.storage
            .from('images')
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Upload failed' });
        }
        const publicUrl = `${supabase.storageUrl}/object/public/images/${fileName}`;

        res.status(200).json({ message: 'File uploaded successfully', url: publicUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

mongoose
    .connect("mongodb+srv://ezdin:test123@karya.efcifes.mongodb.net/dyari?retryWrites=true&w=majority&appName=karya")
    .then(() => {
        console.log('App connected to database');

    })
    .catch((error) => {
        console.log(error);
    });
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
