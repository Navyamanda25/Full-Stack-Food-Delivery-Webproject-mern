import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const VoiceAssistant = () => {
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

// Set recognition language dynamically
if (i18n.language === "te") {
  recognition.lang = "te-IN";
} else if (i18n.language === "hi") {
  recognition.lang = "hi-IN";
} else {
  recognition.lang = "en-IN";
}

recognition.continuous = false;

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    setListening(false);

    console.log("Voice command:", command);

    // 🔹 Navigation
    if (command.includes("home")) {
      navigate("/");
    } 
    else if (
      command.includes("menu") ||
      command.includes("restaurant")
    ) {
      navigate("/explore");
    } 
    else if (command.includes("order")) {
      navigate("/myorders");
    }

    // 🔹 Language switch
    else if (command.includes("hindi")) {
      i18n.changeLanguage("hi");
    } 
    else if (command.includes("telugu")) {
      i18n.changeLanguage("te");
    } 
    else if (command.includes("english")) {
      i18n.changeLanguage("en");
    } 
    else {
      alert("Sorry, command not recognized 😅");
    }
  };

  recognition.onerror = () => {
    setListening(false);
    alert("Microphone permission denied or error");
  };

  return (
    <button
      onClick={startListening}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        backgroundColor: listening ? "red" : "#ff4d4d",
        color: "#fff",
        fontSize: "24px",
        border: "none",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      🎤
    </button>
  );
};

export default VoiceAssistant;
