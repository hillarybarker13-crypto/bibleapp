
import React from "react";

export default function App(){

  const palette = {
    bg:"#EEDECD",
    header:"#A6B2B8",
    verse:"#80917B",
    button:"#3C5667"
  };

  const s = {
    card:(bg,color="inherit")=>({
      backgroundColor:bg,
      color,
      borderRadius:24,
      padding:24,
      boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
    }),
    grid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}
  };

  return (
    <div style={{minHeight:"100vh",background:palette.bg,padding:24}}>

      <div style={s.grid}>

        <div style={s.card(palette.header)}>
          <h1>Hi 🤍</h1>
          <p>A calm place to grow closer to God</p>
        </div>

        <div style={s.card(palette.verse,"white")}>
          <h2>Psalm 46:10</h2>
          <p style={{fontSize:20}}>Be still, and know that I am God.</p>
        </div>

      </div>

      {/* WORSHIP CARD (MATCHES DESIGN) */}
      <div
        onClick={()=>window.open("https://open.spotify.com/playlist/4DWhRQyU3vH4QVc7YEb79B","_blank")}
        style={{
          ...s.card(palette.verse,"white"),
          marginTop:24,
          cursor:"pointer"
        }}
      >
        <div style={{fontWeight:700,opacity:0.9}}>Worship time</div>
        <h2 style={{marginTop:8}}>🎧 Worship Time</h2>
        <p>Tap here to open your worship playlist and start your quiet time.</p>
      </div>

    </div>
  );
}
