
import React from "react";

export default function App(){
  const openWorship = () => {
    window.open("https://open.spotify.com/playlist/4DWhRQyU3vH4QVc7YEb79B","_blank");
  };

  return (
    <div style={{minHeight:"100vh", background:"#EEDECD", padding:24}}>

      <h1>Bible App 🤍</h1>

      {/* VERSE CARD */}
      <div style={{
        background:"#80917B",
        color:"white",
        padding:24,
        borderRadius:24,
        marginTop:20
      }}>
        <h2>Psalm 46:10</h2>
        <p style={{fontSize:20}}>Be still, and know that I am God.</p>
      </div>

      {/* BIG WORSHIP BUTTON */}
      <div
        onClick={openWorship}
        style={{
          marginTop:20,
          background:"linear-gradient(135deg,#3C5667,#80917B)",
          color:"white",
          padding:"20px 24px",
          borderRadius:24,
          cursor:"pointer",
          boxShadow:"0 10px 25px rgba(0,0,0,0.2)",
          textAlign:"center"
        }}
      >
        <h2 style={{margin:0}}>🎧 Worship Time</h2>
        <p style={{marginTop:6}}>Tap to start your quiet time with God</p>
      </div>

    </div>
  )
}
