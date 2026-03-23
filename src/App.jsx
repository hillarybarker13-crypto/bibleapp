
import React, { useState } from "react";

const verseMap = {
  "Psalm 46:10": "Be still, and know that I am God.",
  "Jeremiah 29:11": "For I know the plans I have for you..."
};

export default function App() {
  const [openVerse, setOpenVerse] = useState(null);

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Bible App</h1>

      <p
        style={{ cursor: "pointer", textDecoration: "underline" }}
        onClick={() => setOpenVerse("Psalm 46:10")}
      >
        Psalm 46:10
      </p>

      {openVerse && (
        <div
          onClick={() => setOpenVerse(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              background: "white",
              padding: 30,
              borderRadius: 20,
              maxWidth: 400
            }}
          >
            <h2>{openVerse}</h2>
            <p>{verseMap[openVerse]}</p>
          </div>
        </div>
      )}
    </div>
  );
}
