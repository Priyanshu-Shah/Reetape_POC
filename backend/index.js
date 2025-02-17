require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 5000;

// WebSocket Server for handling WebRTC streams
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");

    ws.on("message", (data) => {
        console.log("Received WebRTC audio data:", data.length);
        // Process WebRTC audio → STT → Gemini AI → TTS → Send back
    });

    ws.on("close", () => console.log("Client disconnected"));
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
