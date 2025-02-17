import { useEffect, useRef } from "react";

export default function Home() {
    const localStream = useRef(null);
    const ws = useRef(null);

    useEffect(() => {
        async function startWebRTC() {
            try {
                localStream.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                ws.current = new WebSocket("ws://localhost:8080");

                ws.current.onopen = () => console.log("Connected to WebRTC Server");
                ws.current.onmessage = (message) => console.log("Received AI Response:", message.data);

                // Send microphone audio data to backend
                const audioProcessor = new MediaRecorder(localStream.current);
                audioProcessor.ondataavailable = (event) => ws.current.send(event.data);
                audioProcessor.start(1000);
            } catch (err) {
                console.error("Error initializing WebRTC:", err);
            }
        }

        startWebRTC();
    }, []);

    return <div><h1>AI Customer Support</h1></div>;
}
