
import React, { useState, useEffect } from "react";

export default function App(){

  const [name,setName] = useState("");
  const [age,setAge] = useState(10);
  const [step,setStep] = useState("name");

  const [streak,setStreak] = useState(1);
  const [freeze,setFreeze] = useState(1);
  const [completed,setCompleted] = useState([]);

  const [prayers,setPrayers] = useState([]);
  const [input,setInput] = useState("");

  const [mood,setMood] = useState("");
  const [showMood,setShowMood] = useState(false);

  const kids = age <= 10;

  const palette = kids
    ? {bg:"#B5D5C8",header:"#EBBEC6",verse:"#54B7AF",card:"#FFF7EF",btn:"#1E5A8A"}
    : {bg:"#EEDECD",header:"#A6B2B8",verse:"#80917B",card:"#FFFFFF",btn:"#3C5667"};

  const card = (bg,color="inherit")=>({
    background:bg,color,borderRadius:24,padding:24,boxShadow:"0 8px 24px rgba(0,0,0,0.08)"
  });

  useEffect(()=>{
    const d = JSON.parse(localStorage.getItem("final")||"{}");
    if(d.name){setName(d.name);setStep("app");}
    if(d.age)setAge(d.age);
    if(d.streak)setStreak(d.streak);
    if(d.freeze)setFreeze(d.freeze);
    if(d.completed)setCompleted(d.completed);
    if(d.prayers)setPrayers(d.prayers);
  },[]);

  useEffect(()=>{
    localStorage.setItem("final",JSON.stringify({name,age,streak,freeze,completed,prayers}));
  },[name,age,streak,freeze,completed,prayers]);

  const completeDay=()=>{
    if(!completed.includes(completed.length+1)){
      setCompleted([...completed,completed.length+1]);
      setStreak(streak+1);
    }
  };

  const addPrayer=()=>{
    if(!input)return;
    setPrayers([...prayers,{id:Date.now(),text:input,done:false,x:Math.random()*70,y:Math.random()*70}]);
    setInput("");
  };

  const togglePrayer=id=>{
    setPrayers(prayers.map(p=>p.id===id?{...p,done:!p.done}:p));
  };

  if(step==="name"){
    return (
      <div style={{padding:24}}>
        <h2>Welcome 🤍</h2>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
        <button onClick={()=>name && setStep("age")}>Next</button>
      </div>
    );
  }

  if(step==="age"){
    return (
      <div style={{padding:24}}>
        <h2>Age</h2>
        <input type="range" min="2" max="100" value={age} onChange={e=>setAge(e.target.value)}/>
        <button onClick={()=>setStep("app")}>Start</button>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:palette.bg,padding:24}}>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        <div style={card(palette.header)}>
          <h1>Hi {name} 🤍</h1>
          <p>🔥 {streak} day streak</p>
          <p>❄️ {freeze} freeze</p>
        </div>

        <div style={card(palette.verse,"white")}>
          <h2>Psalm 46:10</h2>
          <p>Be still, and know that I am God.</p>
        </div>
      </div>

      {/* WORSHIP */}
      <div onClick={()=>window.open("https://open.spotify.com/playlist/4DWhRQyU3vH4QVc7YEb79B","_blank")}
        style={{...card(palette.verse,"white"),marginTop:24,cursor:"pointer"}}>
        <h2>{kids?"🎶 Worship Time ✨":"🎧 Worship Time"}</h2>
        <p>Start your quiet time</p>
      </div>

      {/* PROGRESS */}
      <div style={{...card(palette.card),marginTop:24}}>
        <h3>Progress</h3>
        <button onClick={completeDay}>Mark Complete</button>
      </div>

      {/* MOOD */}
      <div style={{...card(palette.card),marginTop:24}}>
        <h3>Check-in</h3>
        <button onClick={()=>{setMood("good");setShowMood(true)}}>🙂</button>
        <button onClick={()=>{setMood("bad");setShowMood(true)}}>😞</button>
        {showMood && <p>{mood==="good"?"Keep going 🤍":"God is still with you 🤍"}</p>}
      </div>

      {/* PRAYERS */}
      <div style={{...card(palette.card),marginTop:24,position:"relative",height:400}}>
        <h3>Prayer Board</h3>
        <input value={input} onChange={e=>setInput(e.target.value)}/>
        <button onClick={addPrayer}>Add</button>

        {prayers.map(p=>(
          <div key={p.id}
            onClick={()=>togglePrayer(p.id)}
            style={{
              position:"absolute",
              left:p.x+"%",
              top:p.y+"%",
              background:"#fff",
              padding:10,
              textDecoration:p.done?"line-through":"none",
              cursor:"pointer"
            }}>
            {p.text}
          </div>
        ))}
      </div>

    </div>
  )
}
