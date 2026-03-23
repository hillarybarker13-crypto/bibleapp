
import React, { useState } from "react";

export default function App() {
  const [userAge, setUserAge] = useState(10);

  const kidPalette = { bg:"#B5D5C8", button:"#1E5A8A", verse:"#54B7AF" };
  const adultPalette = { bg:"#EEDECD", button:"#3C5667", verse:"#80917B" };

  const autoKids = userAge <= 10;
  const palette = autoKids ? kidPalette : adultPalette;

  return (
    <div style={{ minHeight:"100vh", background:palette.bg, padding:20 }}>
      <h1>Bible App 🤍</h1>

      <p>Age: {userAge}</p>
      <input
        type="range"
        min="2"
        max="100"
        value={userAge}
        onChange={(e)=>setUserAge(Number(e.target.value))}
      />

      <div style={{ display:"flex", gap:12, marginTop:20 }}>
        <button style={{
          background:palette.button,
          color:"white",
          padding:"12px 16px",
          borderRadius:16,
          border:"none"
        }}>
          Bible Plan
        </button>

        <button style={{
          background:"white",
          padding:"12px 16px",
          borderRadius:16,
          border:"1px solid #ccc"
        }}>
          Prayer Board
        </button>

        {/* WORSHIP BUTTON */}
        <button
          style={{
            backgroundColor: palette.verse,
            color: "white",
            border: "none",
            borderRadius: 16,
            padding: "12px 16px",
            cursor: "pointer",
            fontWeight: 600
          }}
          onClick={() =>
            window.open(
              "https://open.spotify.com/playlist/4DWhRQyU3vH4QVc7YEb79B",
              "_blank"
            )
          }
        >
          {autoKids ? "Worship Time 🎶✨" : "Worship Time 🎧"}
        </button>
      </div>

      <p style={{ marginTop:30 }}>
        {autoKids
          ? "God is with you today ✨💛"
          : "God is still writing your story."}
      </p>
    </div>
  );
}
