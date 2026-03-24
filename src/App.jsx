
import React, { useState, useEffect } from "react";

export default function App(){

  const [userName,setUserName] = useState("");
  const [askName,setAskName] = useState(true);
  const [userAge,setUserAge] = useState(10);
  const [askAge,setAskAge] = useState(false);

  const [completed,setCompleted] = useState([]);
  const [streak,setStreak] = useState(1);
  const [prayers,setPrayers] = useState([]);
  const [newPrayer,setNewPrayer] = useState("");

  const autoKids = userAge <= 10;

  const palette = autoKids
    ? { bg:"#B5D5C8", header:"#EBBEC6", verse:"#54B7AF", card:"#FFF7EF", button:"#1E5A8A" }
    : { bg:"#EEDECD", header:"#A6B2B8", verse:"#80917B", card:"#FFFFFF", button:"#3C5667" };

  const s = {
    card:(bg,color="inherit")=>({
      backgroundColor:bg,
      color,
      borderRadius:24,
      padding:24,
      boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
    }),
    grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24}
  };

  useEffect(()=>{
    const saved = localStorage.getItem("bp");
    if(saved){
      const data = JSON.parse(saved);
      setCompleted(data.completed||[]);
      setStreak(data.streak||1);
      setPrayers(data.prayers||[]);
      setUserName(data.name||"");
      if(data.name){setAskName(false);setAskAge(false);}
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem("bp",JSON.stringify({
      completed,streak,prayers,name:userName
    }));
  },[completed,streak,prayers,userName]);

  const addPrayer = ()=>{
    if(!newPrayer.trim()) return;
    setPrayers([...prayers,{id:Date.now(),text:newPrayer,answered:false}]);
    setNewPrayer("");
  };

  const togglePrayer = id=>{
    setPrayers(prayers.map(p=>p.id===id?{...p,answered:!p.answered}:p));
  };

  const markComplete = day=>{
    if(!completed.includes(day)){
      setCompleted([...completed,day]);
      setStreak(streak+1);
    }
  };

  return (
    <div style={{minHeight:"100vh",background:palette.bg,padding:24}}>

      {askName && (
        <div style={s.card("white")}>
          <h2>Welcome 🤍</h2>
          <input placeholder="Your name" value={userName} onChange={e=>setUserName(e.target.value)} />
          <button onClick={()=>{if(userName){setAskName(false);setAskAge(true);}}}>Continue</button>
        </div>
      )}

      {askAge && (
        <div style={s.card("white")}>
          <h2>How old are you?</h2>
          <input type="range" min="2" max="100" value={userAge} onChange={e=>setUserAge(e.target.value)} />
          <button onClick={()=>setAskAge(false)}>Start</button>
        </div>
      )}

      {!askName && !askAge && (
      <>
        <div style={s.grid}>
          <div style={s.card(palette.header)}>
            <h1>Hi {userName} 🤍</h1>
            <p>🔥 {streak} day streak</p>
          </div>

          <div style={s.card(palette.verse,"white")}>
            <h2>Psalm 46:10</h2>
            <p>Be still, and know that I am God.</p>
          </div>
        </div>

        {/* WORSHIP CARD */}
        <div
          onClick={()=>window.open("https://open.spotify.com/playlist/4DWhRQyU3vH4QVc7YEb79B","_blank")}
          style={{...s.card(palette.verse,"white"),marginTop:24,cursor:"pointer"}}
        >
          <h2>{autoKids ? "🎶 Worship Time ✨" : "🎧 Worship Time"}</h2>
          <p>{autoKids ? "Play music and spend time with God 💛" : "Start your quiet time with worship."}</p>
        </div>

        {/* PROGRESS */}
        <div style={{...s.card(palette.card),marginTop:24}}>
          <h3>Progress</h3>
          <p>{completed.length} days completed</p>
          <button onClick={()=>markComplete(completed.length+1)}>Mark Today Complete</button>
        </div>

        {/* PRAYER BOARD */}
        <div style={{...s.card(palette.card),marginTop:24}}>
          <h3>Prayer Board</h3>
          <input value={newPrayer} onChange={e=>setNewPrayer(e.target.value)} placeholder="Write prayer..." />
          <button onClick={addPrayer}>Add</button>

          {prayers.map(p=>(
            <div key={p.id} onClick={()=>togglePrayer(p.id)} style={{
              marginTop:10,
              padding:10,
              background:p.answered?"#cde7be":"#fff",
              textDecoration:p.answered?"line-through":"none",
              cursor:"pointer"
            }}>
              {p.text}
            </div>
          ))}
        </div>

      </>
      )}

    </div>
  )
}
