import React, { useState, useEffect } from "react";

const footerMessages = [
  "Ayakkabını Unutma!",
  "Fatih hocama yazar",
  "Pas Ver, Footer’a Geldik",
  "Ofsayt yok! Doğru yerdesin.",
  "90+5 uzatmalara geldik, ama site hep açık!",
  "Topu 90’a takamadık ama seni siteye bağladık!",
  "Ağlama Fener!",
  "Hakem görmüyor mu ya!",
  "Top yuvarlaktır, maç 90 dakika!",
  "Taktik maktik yok, bam bam bam!",
  "Bu da mi gol değil be!",
  "What can i do sometimes...",
];

export default function Footer() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * footerMessages.length);
    setMessage(footerMessages[randomIndex]);
  }, []);

  return (
    <footer className="p-6 space-y-5 text-sm text-primary">
      <div className="space-y-5 text-center">
        <p>{message}</p>
        <p className="text-xs">© 2024 Copyright:404-Squad.</p>
      </div>
    </footer>
  );
}
