import { useState, useRef, useEffect } from "react";

const LANGUAGE_CONFIG = {
  hindi: {
    name: "हिंदी",
    flag: "🇮🇳",
    desc: "पूरी तरह हिंदी में बात करें",
    color: "#f97316",
    system: `आप एक बुद्धिमान और मददगार AI सहायक हैं। आप हमेशा शुद्ध हिंदी में जवाब देते हैं। आपके जवाब स्पष्ट, उपयोगी और मित्रवत होते हैं। कभी-कभी इमोजी का उपयोग करें।`,
    placeholder: "कुछ भी पूछें...",
    welcome: "नमस्ते! 🙏 मैं आपका AI सहायक हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?",
    quick: ["आज का दिन अच्छा कैसे बनाएं? 😊", "कोई मज़ेदार बात बताओ 😄", "प्रेरणा दो 💪", "कोई रेसिपी बताओ 🍛"],
    hint: "Enter दबाएं भेजने के लिए • Shift+Enter नई लाइन",
  },
  english: {
    name: "English",
    flag: "🇬🇧",
    desc: "Chat in pure English",
    color: "#3b82f6",
    system: `You are a smart, helpful, and friendly AI assistant. You always respond in clear, natural English. Your answers are concise, accurate, and engaging. Use emojis occasionally to keep things lively.`,
    placeholder: "Ask me anything...",
    welcome: "Hello! 👋 I'm your Smart AI Assistant. How can I help you today?",
    quick: ["Tell me something interesting 🌟", "Tell me a joke 😂", "Motivate me 💪", "Give me a recipe 🍕"],
    hint: "Press Enter to send • Shift+Enter for new line",
  },
  hinglish: {
    name: "Hinglish",
    flag: "🔀",
    desc: "Hindi + English mix mein baat karo",
    color: "#8b5cf6",
    system: `Aap ek helpful, friendly aur smart AI assistant hain. Aap Hinglish (Hindi + English mix) mein baat karte hain — jaise dost karte hain. Short, clear aur useful jawab dete hain. Emojis use karte hain kabhi kabhi.`,
    placeholder: "Kuch bhi puchho...",
    welcome: "Namaste! 🙏 Main aapka Smart AI Assistant hoon. Kuch bhi puchho — main yahan hoon!",
    quick: ["Mera din accha kaise karein? 😊", "Ek joke sunao 😂", "Motivation chahiye 💪", "Koi recipe batao 🍛"],
    hint: "Enter dabao bhejna ke liye • Shift+Enter new line",
  },
};

// ─── Language Select Screen ────────────────────────────────────
function LanguageSelect({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const handleChoose = (key) => {
    if (selected) return;
    setSelected(key);
    setTimeout(() => onSelect(key), 600);
  };

  return (
    <div style={ls.root}>
      <div style={ls.bgGrid} />
      <div style={ls.orb1} />
      <div style={ls.orb2} />
      <div style={ls.orb3} />

      <div style={{ ...ls.card, ...(selected ? ls.cardExit : {}) }}>
        <div style={ls.logoWrap}>
          <div style={ls.logoRing}>
            <span style={ls.logoStar}>✦</span>
          </div>
          <div style={ls.logoGlow} />
        </div>

        <div style={ls.titleBlock}>
          <h1 style={ls.title}>Smart AI</h1>
          <p style={ls.subtitle}>Apni bhasha chunein / Choose your language</p>
        </div>

        <div style={ls.langGrid}>
          {Object.entries(LANGUAGE_CONFIG).map(([key, cfg]) => {
            const isHov = hovered === key;
            const isSel = selected === key;
            return (
              <button
                key={key}
                style={{
                  ...ls.langCard,
                  borderColor: isHov || isSel ? cfg.color : "rgba(255,255,255,0.07)",
                  background: isHov || isSel ? `${cfg.color}18` : "rgba(255,255,255,0.025)",
                  transform: isSel ? "scale(1.03)" : isHov ? "scale(1.015) translateY(-2px)" : "scale(1)",
                  boxShadow: isSel ? `0 0 35px ${cfg.color}45` : isHov ? `0 8px 28px ${cfg.color}22` : "none",
                }}
                onMouseEnter={() => setHovered(key)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => handleChoose(key)}
              >
                <div style={{ ...ls.flagBox, background: isHov || isSel ? `${cfg.color}25` : "rgba(255,255,255,0.05)" }}>
                  <span style={ls.flagEmoji}>{cfg.flag}</span>
                </div>
                <div style={ls.langText}>
                  <span style={{ ...ls.langName, color: isHov || isSel ? cfg.color : "white" }}>{cfg.name}</span>
                  <span style={ls.langDesc}>{cfg.desc}</span>
                </div>
                {isSel && <span style={{ ...ls.checkIcon, color: cfg.color }}>✓</span>}
                <div style={{ ...ls.cardBar, background: cfg.color, opacity: isHov || isSel ? 1 : 0 }} />
              </button>
            );
          })}
        </div>

        <p style={ls.footer}>Powered by Claude AI · Anthropic</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes orbFloat { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(25px,-20px) scale(1.08);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px);} to{opacity:1;transform:translateY(0);} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 30px rgba(139,92,246,0.4);} 50%{box-shadow:0 0 55px rgba(139,92,246,0.75);} }
      `}</style>
    </div>
  );
}

const ls = {
  root: { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#080810", position:"relative", overflow:"hidden", fontFamily:"'DM Sans',sans-serif", padding:20 },
  bgGrid: { position:"fixed", inset:0, backgroundImage:"linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)", backgroundSize:"48px 48px" },
  orb1: { position:"fixed", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 70%)", top:"-120px", left:"-120px", animation:"orbFloat 13s ease-in-out infinite" },
  orb2: { position:"fixed", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(236,72,153,0.12) 0%,transparent 70%)", bottom:"-100px", right:"-100px", animation:"orbFloat 17s ease-in-out infinite reverse" },
  orb3: { position:"fixed", width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle,rgba(59,130,246,0.09) 0%,transparent 70%)", top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:"orbFloat 11s ease-in-out infinite" },
  card: { width:"100%", maxWidth:500, background:"rgba(10,10,20,0.92)", backdropFilter:"blur(28px)", borderRadius:30, border:"1px solid rgba(139,92,246,0.18)", boxShadow:"0 40px 80px rgba(0,0,0,0.7),inset 0 1px 0 rgba(255,255,255,0.04)", padding:"46px 34px 34px", display:"flex", flexDirection:"column", alignItems:"center", gap:30, position:"relative", zIndex:1, animation:"fadeUp 0.65s ease" },
  cardExit: { opacity:0, transform:"scale(0.94) translateY(-8px)", transition:"all 0.5s ease" },
  logoWrap: { position:"relative", display:"flex", alignItems:"center", justifyContent:"center" },
  logoRing: { width:70, height:70, borderRadius:"50%", background:"linear-gradient(135deg,#8b5cf6,#ec4899,#3b82f6)", display:"flex", alignItems:"center", justifyContent:"center", animation:"glowPulse 3s ease-in-out infinite" },
  logoStar: { fontSize:26, color:"white", fontWeight:"bold" },
  logoGlow: { position:"absolute", width:100, height:100, borderRadius:"50%", background:"radial-gradient(circle,rgba(139,92,246,0.28) 0%,transparent 70%)", pointerEvents:"none" },
  titleBlock: { textAlign:"center" },
  title: { fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, background:"linear-gradient(135deg,#fff 40%,#c4b5fd)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:"-1px" },
  subtitle: { color:"rgba(196,181,253,0.55)", fontSize:13, marginTop:7, fontWeight:400 },
  langGrid: { display:"flex", flexDirection:"column", gap:11, width:"100%" },
  langCard: { width:"100%", padding:"18px 22px", borderRadius:17, border:"1px solid", cursor:"pointer", display:"flex", alignItems:"center", gap:15, transition:"all 0.22s ease", position:"relative", overflow:"hidden", textAlign:"left" },
  flagBox: { width:44, height:44, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background 0.22s" },
  flagEmoji: { fontSize:22 },
  langText: { display:"flex", flexDirection:"column", gap:3 },
  langName: { fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, transition:"color 0.22s" },
  langDesc: { fontSize:12, color:"rgba(196,181,253,0.5)" },
  checkIcon: { marginLeft:"auto", fontSize:21, fontWeight:700 },
  cardBar: { position:"absolute", bottom:0, left:0, right:0, height:"2px", transition:"opacity 0.22s" },
  footer: { fontSize:11, color:"rgba(139,92,246,0.32)", letterSpacing:"0.5px" },
};

// ─── Chat Screen ───────────────────────────────────────────────
function ChatApp({ langKey, onBack }) {
  const cfg = LANGUAGE_CONFIG[langKey];
  const [messages, setMessages] = useState([{ role:"assistant", content:cfg.welcome }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setParticles(Array.from({length:14},(_,i)=>({ id:i, x:Math.random()*100, y:Math.random()*100, size:Math.random()*2.5+1, dur:Math.random()*8+6, del:Math.random()*5 })));
  },[]);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMsgs = [...messages, {role:"user",content:userMsg}];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:cfg.system, messages:newMsgs.map(m=>({role:m.role,content:m.content})) })
      });
      const data = await res.json();
      const reply = data.content?.map(b=>b.text||"").join("") || "Error occurred.";
      setMessages(p=>[...p,{role:"assistant",content:reply}]);
    } catch { setMessages(p=>[...p,{role:"assistant",content:"⚠️ Network error. Please try again."}]); }
    setLoading(false);
  };

  const handleKey = (e) => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendMessage();} };
  const c = cfg.color;

  return (
    <div style={ch.root}>
      <div style={{...ch.bgGrad, background:`radial-gradient(ellipse 80% 60% at 20% 10%,${c}22 0%,transparent 60%),radial-gradient(ellipse 60% 50% at 80% 80%,${c}14 0%,transparent 60%)`}} />
      <div style={ch.bgGrid} />
      {particles.map(p=>(
        <div key={p.id} style={{position:"fixed",borderRadius:"50%",background:c,opacity:0.45,animation:`particleFloat ${p.dur}s ${p.del}s linear infinite`,left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,zIndex:0}}/>
      ))}

      <div style={{...ch.container, border:`1px solid ${c}32`, boxShadow:`0 0 60px ${c}15,0 40px 80px rgba(0,0,0,0.65)`}}>
        {/* Header */}
        <div style={{...ch.header, borderBottom:`1px solid ${c}1a`, background:`${c}06`}}>
          <div style={ch.headerLeft}>
            <button style={ch.backBtn} onClick={onBack} title="Change language">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="rgba(196,181,253,0.7)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div style={{...ch.logoBox, background:`linear-gradient(135deg,${c},${c}99)`, boxShadow:`0 0 20px ${c}50`}}>✦</div>
            <div>
              <div style={ch.appTitle}>Smart AI</div>
              <div style={{...ch.langTag, color:c}}>{cfg.flag} {cfg.name}</div>
            </div>
          </div>
          <div style={ch.onlineBadge}><div style={ch.onlineDot}/>Online</div>
        </div>

        {/* Messages */}
        <div style={ch.msgArea}>
          {messages.map((msg,i)=>(
            <div key={i} style={{...ch.msgRow, justifyContent:msg.role==="user"?"flex-end":"flex-start"}}>
              {msg.role==="assistant"&&<div style={{...ch.avatarAI, background:`linear-gradient(135deg,${c},${c}80)`}}>✦</div>}
              <div style={msg.role==="user" ? {...ch.bubbleUser, background:`linear-gradient(135deg,${c},${c}cc)`, boxShadow:`0 4px 20px ${c}40`} : {...ch.bubbleAI, background:`${c}14`, border:`1px solid ${c}28`}}>
                {msg.content}
              </div>
              {msg.role==="user"&&<div style={ch.avatarUser}>U</div>}
            </div>
          ))}
          {loading&&(
            <div style={{...ch.msgRow,justifyContent:"flex-start"}}>
              <div style={{...ch.avatarAI,background:`linear-gradient(135deg,${c},${c}80)`}}>✦</div>
              <div style={{...ch.bubbleAI,background:`${c}14`,border:`1px solid ${c}28`}}>
                <div style={ch.dots}>
                  {[0,0.2,0.4].map((d,i)=><span key={i} style={{...ch.dot,background:c,animationDelay:`${d}s`}}/>)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Quick prompts */}
        {messages.length<=1&&(
          <div style={ch.quickWrap}>
            {cfg.quick.map((q,i)=>(
              <button key={i} style={{...ch.quickBtn, background:`${c}10`, border:`1px solid ${c}28`, color:`${c}cc`}}
                onClick={()=>{setInput(q);inputRef.current?.focus();}}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{...ch.inputBar, borderTop:`1px solid ${c}18`, background:`${c}04`}}>
          <textarea ref={inputRef} style={{...ch.textarea, border:`1px solid ${c}28`}}
            value={input} onChange={e=>setInput(e.target.value)} onKeyDown={handleKey}
            placeholder={cfg.placeholder} rows={1}/>
          <button style={{...ch.sendBtn, background:`linear-gradient(135deg,${c},${c}bb)`, boxShadow:`0 4px 16px ${c}45`, opacity:loading||!input.trim()?0.45:1}}
            onClick={sendMessage} disabled={loading||!input.trim()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div style={{...ch.hintText, color:`${c}45`}}>{cfg.hint}</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes particleFloat { 0%,100%{transform:translateY(0) scale(1);opacity:0.4;} 50%{transform:translateY(-28px) scale(1.3);opacity:0.8;} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.35;transform:scale(0.6);} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
        @keyframes glow { 0%,100%{opacity:0.7;} 50%{opacity:1;} }
      `}</style>
    </div>
  );
}

const ch = {
  root:{minHeight:"100vh",background:"#080810",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif",position:"relative",overflow:"hidden",padding:16},
  bgGrad:{position:"fixed",inset:0,zIndex:0},
  bgGrid:{position:"fixed",inset:0,zIndex:0,backgroundImage:"linear-gradient(rgba(139,92,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,0.04) 1px,transparent 1px)",backgroundSize:"50px 50px"},
  container:{width:"100%",maxWidth:720,height:"calc(100vh - 32px)",maxHeight:860,display:"flex",flexDirection:"column",background:"rgba(10,10,18,0.9)",backdropFilter:"blur(24px)",borderRadius:28,position:"relative",zIndex:1,overflow:"hidden",animation:"fadeUp 0.5s ease"},
  header:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 22px"},
  headerLeft:{display:"flex",alignItems:"center",gap:12},
  backBtn:{width:34,height:34,borderRadius:10,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"},
  logoBox:{width:42,height:42,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,color:"white",fontWeight:"bold",animation:"glow 3s ease infinite"},
  appTitle:{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:"white",letterSpacing:"-0.5px"},
  langTag:{fontSize:11,fontWeight:600,marginTop:2,letterSpacing:"0.3px"},
  onlineBadge:{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:20,background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)",color:"#4ade80",fontSize:12,fontWeight:500},
  onlineDot:{width:7,height:7,borderRadius:"50%",background:"#4ade80",animation:"pulse 2s ease infinite"},
  msgArea:{flex:1,overflowY:"auto",padding:"20px 20px 10px",display:"flex",flexDirection:"column",gap:13,scrollbarWidth:"thin",scrollbarColor:"rgba(139,92,246,0.25) transparent"},
  msgRow:{display:"flex",alignItems:"flex-end",gap:9,animation:"fadeUp 0.3s ease"},
  avatarAI:{width:30,height:30,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"white",flexShrink:0},
  avatarUser:{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#3b82f6,#06b6d4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"white",flexShrink:0},
  bubbleAI:{maxWidth:"72%",padding:"13px 17px",borderRadius:"20px 20px 20px 4px",color:"#e2e8f0",fontSize:14.5,lineHeight:1.65,whiteSpace:"pre-wrap"},
  bubbleUser:{maxWidth:"72%",padding:"13px 17px",borderRadius:"20px 20px 4px 20px",color:"white",fontSize:14.5,lineHeight:1.65,whiteSpace:"pre-wrap"},
  dots:{display:"flex",gap:5,alignItems:"center",padding:"2px 0"},
  dot:{width:7,height:7,borderRadius:"50%",display:"inline-block",animation:"pulse 1.2s ease-in-out infinite"},
  quickWrap:{display:"flex",flexWrap:"wrap",gap:8,padding:"0 20px 10px"},
  quickBtn:{padding:"8px 13px",borderRadius:20,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:12.5,transition:"all 0.2s"},
  inputBar:{display:"flex",alignItems:"flex-end",gap:10,padding:"10px 16px 13px"},
  textarea:{flex:1,resize:"none",outline:"none",background:"rgba(255,255,255,0.05)",borderRadius:16,padding:"11px 15px",color:"white",fontSize:14.5,fontFamily:"'DM Sans',sans-serif",lineHeight:1.5,transition:"border-color 0.2s",maxHeight:120},
  sendBtn:{width:44,height:44,borderRadius:"50%",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"},
  hintText:{textAlign:"center",fontSize:11,paddingBottom:8,letterSpacing:"0.3px"},
};

// ─── Root ──────────────────────────────────────────────────────
export default function App() {
  const [language, setLanguage] = useState(null);
  return language
    ? <ChatApp langKey={language} onBack={() => setLanguage(null)} />
    : <LanguageSelect onSelect={setLanguage} />;
    }
      
