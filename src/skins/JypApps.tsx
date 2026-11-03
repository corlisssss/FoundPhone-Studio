import { useState, type CSSProperties } from "react";
import { Heart, MessageCircle, Send, Plus, CalendarDays, Radio } from "lucide-react";
import { useSkinState } from "../skinState";
import type { SkinProps } from "../AppSkins";

type Entry = { id: string; room: string; from: string; body: string; time: string; mine: boolean };
const fanNames = ["엔써_별빛", "지우바라기", "NSWER_0413", "오늘도엔믹스"];
const fanReplies = (text: string) => {
  if (/밥|먹|저녁|점심/.test(text)) return ["지우야 맛있는 거 꼭 먹어!! 🥺", "우리 지우 밥 챙겨 먹는 게 제일 중요해요 💗", "오늘 메뉴도 알려줘요 ㅎㅎ"];
  if (/사랑|좋아|고마워|응원/.test(text)) return ["우리가 더 사랑해 지우야 🫶", "항상 응원하고 있어요!", "이런 말 들으면 하루 피로가 사라져요 ㅠㅠ"];
  if (/연습|무대|컴백/.test(text)) return ["오늘도 연습 화이팅!! 무대 기다릴게요 🔥", "지우 노력하는 거 다 알아요 💙", "이번 활동도 함께 달려요!"];
  return ["지우야 오늘도 와줘서 고마워요 💙", "무슨 얘기든 좋아요! 더 들려줘요 ㅎㅎ", "읽고 답장해줘서 행복해요 🥹"];
};
const initialEntries: Entry[] = [
  { id:"welcome", room:"엔써_별빛", from:"엔써_별빛", body:"지우야 오늘도 너무 보고 싶었어 💙", time:"오후 1:42", mine:false },
  { id:"welcome2", room:"지우바라기", from:"지우바라기", body:"오늘 연습은 잘 끝났어요? 밥 꼭 챙겨 먹기!", time:"오후 1:50", mine:false },
  { id:"welcome3", room:"NSWER_0413", from:"NSWER_0413", body:"지우 셀카 기다리는 중… 🥹", time:"오후 2:03", mine:false },
];

const shell: CSSProperties = { height:"100%", minHeight:480, display:"flex", flexDirection:"column", background:"#f7f7fa", color:"#24242a", fontFamily:"inherit" };
const top: CSSProperties = { padding:"16px", background:"#fff", borderBottom:"1px solid #eee", display:"flex", alignItems:"center", justifyContent:"space-between" };
const pill: CSSProperties = { border:0, borderRadius:20, padding:"9px 13px", background:"#f0e6ec", color:"#9d5476", fontWeight:700, cursor:"pointer" };
const field: CSSProperties = { flex:1, minWidth:0, border:"1px solid #e5e5eb", borderRadius:22, padding:"11px 14px", background:"#fff", color:"#222", outline:"none" };
const button: CSSProperties = { border:0, borderRadius:20, padding:"10px 14px", background:"#d987aa", color:"#fff", fontWeight:700, cursor:"pointer" };

export function BubbleSkin(p: SkinProps) {
  const [mode,setMode] = useState<"subscription"|"artist">("subscription");
  const [room,setRoom] = useState("설유님•0•");
  const [draft,setDraft] = useState("");
  const [history,setHistory] = useSkinState<string>(p,"bubbleMessages",JSON.stringify(initialEntries));
  const entries: Entry[] = (()=>{try { const v=JSON.parse(history); return Array.isArray(v)?v:initialEntries; } catch { return initialEntries; }})();
  const [subReply,setSubReply] = useSkinState<string[]>(p,"bubbleSubscriptionReplies",[]);
  const [unread,setUnread] = useState(true);
  const send = () => {
    const value=draft.trim(); if(!value) return;
    const now = p.virtualTime?.slice(11,16) || "14:20";
    const time = now;
    if(mode==="subscription") {
      setSubReply([...subReply, value]);
    } else {
      const next:Entry[]=[...entries,{id:"m"+(entries.length+1),room,from:"🫶지우🫶",body:value,time,mine:true}];
      const answer=fanReplies(value);
      const who=fanNames[entries.length%fanNames.length];
      next.push({id:"r"+(entries.length+2),room,from:who,body:answer[entries.length%answer.length],time,mine:false});
      setHistory(JSON.stringify(next));
    }
    setDraft("");
  };
  const rooms=["엔써_별빛","지우바라기","NSWER_0413","오늘도엔믹스"];
  return <div style={shell}>
    <header style={top}><strong style={{fontSize:23}}>bubble</strong><span style={{fontSize:12,color:"#888"}}>JYPnation · DEMO</span></header>
    <div style={{display:"flex",gap:8,padding:12,background:"#fff"}}>
      <button style={{...pill,background:mode==="subscription"?"#f0dce6":"#f4f4f6"}} onClick={()=>{setMode("subscription");setRoom("설유님•0•")}}>구독 중</button>
      <button style={{...pill,background:mode==="artist"?"#f0dce6":"#f4f4f6"}} onClick={()=>{setMode("artist");setRoom(rooms[0])}}>아티스트 모드</button>
    </div>
    {mode==="subscription" ? <>
      <div style={{padding:14,background:"#fff",borderBottom:"1px solid #eee",display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:42,height:42,borderRadius:50,background:"#f4dce7",display:"grid",placeItems:"center",fontWeight:800,color:"#a75b7b"}}>설</div>
        <div style={{flex:1}}><b>설유님•0•</b><div style={{fontSize:12,color:"#999"}}>NMIXX · 구독 중인 아티스트</div></div><span style={{fontSize:11,color:"#999"}}>bubble</span>
      </div>
      <main style={{padding:16,display:"flex",flexDirection:"column",gap:12,flex:1,overflow:"auto"}}>
        <small style={{textAlign:"center",color:"#999"}}>2026년 11월 3일 화요일</small>
        <div style={{alignSelf:"flex-start",background:"#fff",padding:13,borderRadius:16,maxWidth:"86%"}}><b style={{color:"#b66b8b",fontSize:12}}>설유님•0•</b><p style={{margin:"7px 0"}}>엔써 뭐 하고 있어요? 오늘도 보고 싶었어요 🤍</p><small style={{color:"#aaa"}}>오후 2:12</small></div>
        <div style={{alignSelf:"flex-start",background:"#fff",padding:13,borderRadius:16,maxWidth:"86%"}}><b style={{color:"#b66b8b",fontSize:12}}>설유님•0•</b><p style={{margin:"7px 0"}}>오늘 연습 끝나고 맛있는 거 먹을 거예요 ㅎㅎ</p><small style={{color:"#aaa"}}>오후 2:15</small></div>
        {subReply.map((m,i)=><div key={i} style={{alignSelf:"flex-end",background:"#f4dce7",padding:12,borderRadius:16,maxWidth:"86%"}}>{m}<small style={{display:"block",textAlign:"right",color:"#a77b90"}}>나 · 전송됨</small></div>)}
        <small style={{color:"#999",textAlign:"center"}}>아티스트가 구독자에게 보내는 메시지예요.</small>
      </main>
    </> : <>
      <div style={{padding:14,background:"#fff",borderBottom:"1px solid #eee"}}><b>🫶지우🫶</b><div style={{fontSize:12,color:"#999"}}>NMIXX · 나의 bubble</div></div>
      <div style={{display:"flex",flex:1,minHeight:0}}>
        <aside style={{width:112,overflowY:"auto",background:"#fff",borderRight:"1px solid #eee"}}>
          {rooms.map((r,i)=><button key={r} onClick={()=>setRoom(r)} style={{display:"block",width:"100%",padding:"13px 8px",border:0,borderBottom:"1px solid #f1f1f3",background:room===r?"#f8edf2":"#fff",textAlign:"left",color:"#333",fontSize:12}}><b>{r}</b><small style={{display:"block",color:"#999",marginTop:4}}>팬 메시지</small></button>)}
        </aside>
        <main style={{flex:1,padding:10,overflowY:"auto",display:"flex",flexDirection:"column",gap:9}}>
          {entries.filter(e=>e.room===room).map(e=><div key={e.id} style={{alignSelf:e.mine?"flex-end":"flex-start",maxWidth:"95%",background:e.mine?"#f4dce7":"#fff",padding:10,borderRadius:14,fontSize:13}}><b style={{fontSize:11,color:"#a45d7c"}}>{e.from}</b><div style={{marginTop:4}}>{e.body}</div><small style={{display:"block",textAlign:"right",color:"#aaa",marginTop:4}}>{e.time}</small></div>)}
          {!entries.some(e=>e.room===room)&&<small style={{color:"#999"}}>아직 메시지가 없어요.</small>}
        </main>
      </div>
    </>}
    <form onSubmit={e=>{e.preventDefault();send();}} style={{padding:10,display:"flex",gap:8,background:"#fff",borderTop:"1px solid #eee"}}>
      <input style={field} value={draft} onChange={e=>setDraft(e.target.value)} placeholder={mode==="subscription"?"설유님•0•에게 답장하기":"엔써에게 메시지 보내기"} />
      <button style={button} type="submit"><Send size={17}/></button>
    </form>
  </div>;
}

type FanComment = { author:string; body:string };
type FanPost = {id:string;author:string;handle:string;body:string;comments:Array<FanComment|string>;likes:number};
const members = [
  {name:"지우",handle:"지우",role:"NMIXX · Artist"},
  {name:"해언",handle:"haewon",role:"NMIXX · Leader"},
  {name:"릴리",handle:"lily",role:"NMIXX · Vocal"},
  {name:"뵤",handle:"bae",role:"NMIXX · Member"},
  {name:"규진",handle:"kyujin",role:"NMIXX · Maknae"},
  {name:"설유니_",handle:"sullyoon",role:"NMIXX · Member"},
];
const memberPosts:FanPost[] = [
  {id:"member-haewon",author:"해언",handle:"haewon",body:"엔써 안녕~ 리더 출석 체크합니다 🙋‍♀️ 오늘도 멤버들이랑 열심히 연습했어요! 다들 저녁 먹었죠?",comments:[{author:"릴리",body:"언니가 먼저 밥 먹었는지 확인해야죠 ㅋㅋ"},{author:"지우",body:"해언언니 오늘도 고생했어요 💙"}],likes:934},
  {id:"member-lily",author:"릴리",handle:"lily",body:"오늘 연습실에서 재미있는 일이 있었어요 ㅎㅎ 엔써에게도 빨리 들려주고 싶다! 🐣",comments:[{author:"규진",body:"언니 그 얘기 아직 비밀이에요 🤫"},{author:"해언",body:"릴리야 일단 스포 금지!"}],likes:1102},
  {id:"member-bae",author:"뵤",handle:"bae",body:"뵤 왔어요오 🐥 오늘의 TMI: 연습 끝나고 간식 먹었는데 또 먹고 싶어요…",comments:[{author:"지우",body:"뵤야 우리 다음엔 같이 먹자 ㅎㅎ"},{author:"설유니_",body:"저도 같이요 🤍"}],likes:876},
  {id:"member-kyujin",author:"규진",handle:"kyujin",body:"엔써!! 오늘 하루도 잘 보내고 있나요? 저는 언니들이랑 웃다가 하루가 다 갔어요 ㅋㅋ",comments:[{author:"해언",body:"누가 제일 웃겼는데요? 😏"},{author:"규진",body:"비밀이에요 언니 ㅎㅎ"}],likes:1204},
  {id:"member-sullyoon",author:"설유니_",handle:"sullyoon",body:"엔써 안녕 🤍 오늘은 하늘이 예뻐서 사진을 많이 찍었어요. 다 같이 좋은 꿈 꿔요!",comments:[{author:"지우",body:"언니 사진 저도 보여주세요…!"},{author:"릴리",body:"하늘도 예쁘고 설유니도 예쁘고 🥹"}],likes:1460},
];
const teammateReplies=(body:string):FanComment[]=>{
  if(/밥|먹|간식|저녁/.test(body)) return [{author:"해언",body:"지우야 밥 잘 챙겨 먹어야 해요! 리더의 당부입니다 🙋‍♀️"},{author:"뵤",body:"뭐 먹었어요?? 저도 알려줘요 ㅎㅎ"}];
  if(/사랑|고마워|보고 싶|엔써|응원/.test(body)) return [{author:"릴리",body:"지우의 마음이 엔써에게 잘 전해졌을 거예요 💗"},{author:"규진",body:"우리 지우 최고!! 저도 응원해요 🫶"}];
  return [{author:"해언",body:"지우야 오늘도 수고했어! 언니가 보고 있어요 😊"},{author:"설유니_",body:"지우 글 보니까 저도 힘이 나요 🤍"}];
};
export function FansSkin(p: SkinProps) {
  const [tab,setTab]=useState("홈");
  const [draft,setDraft]=useState("");
  const [comment,setComment]=useState("");
  const [filter,setFilter]=useState("전체");
  const [postsRaw,setPostsRaw]=useSkinState<string>(p,"fansPosts",JSON.stringify([
    {id:"official-1",author:"지우",handle:"지우",body:"엔써 안녕!! 오늘도 함께해 줘서 고마워요 💙 연습 끝나고 잠깐 쉬는 중이에요!",comments:[{author:"엔써_별빛",body:"오늘도 지우 덕분에 행복해요 🥹"},{author:"지우바라기",body:"밥 꼭 챙겨 먹기!!"},{author:"지우",body:"엔써도 맛있는 거 먹기 약속 💙"}],likes:1280},
    ...memberPosts
  ]));
  const [likesRaw,setLikesRaw]=useSkinState<string>(p,"fansLikes","[]");
  const posts:FanPost[] = (()=>{try{const v=JSON.parse(postsRaw);return Array.isArray(v)?[...v.map((x:any)=>({...x,author:x.author||"지우",handle:x.handle||x.author||"지우",comments:(x.comments||[]).map((c:any,i:number)=>typeof c==="string"?{author:fanNames[i%fanNames.length],body:c}:c)})),...memberPosts.filter(seed=>!v.some((x:any)=>x.id===seed.id))]:memberPosts;}catch{return memberPosts;}})();
  const likes:string[] = (()=>{try{return JSON.parse(likesRaw)}catch{return []}})();
  const addPost=()=>{const body=draft.trim();if(!body)return;const created:FanPost={id:"post-"+Date.now(),author:"지우",handle:"지우",body,comments:teammateReplies(body),likes:0};setPostsRaw(JSON.stringify([created,...posts]));setDraft("");setTab("커뮤니티");setFilter("전체");};
  const addComment=(id:string)=>{if(!comment.trim())return;setPostsRaw(JSON.stringify(posts.map(post=>post.id===id?{...post,comments:[...post.comments,{author:"지우",body:comment.trim()}]}:post)));setComment("");};
  const toggleLike=(id:string)=>setLikesRaw(JSON.stringify(likes.includes(id)?likes.filter(x=>x!==id):[...likes,id]));
  const visiblePosts=filter==="전체"?posts:posts.filter(post=>post.author===filter);
  return <div style={shell}>
    <header style={top}><strong style={{fontSize:23}}>FANS</strong><span style={{fontSize:12,color:"#777"}}>NMIXX · OFFICIAL</span></header>
    <nav style={{display:"flex",justifyContent:"space-around",padding:12,background:"#fff",borderBottom:"1px solid #eee"}}>
      {["홈","커뮤니티","스케줄","LIVE"].map(t=><button key={t} onClick={()=>setTab(t)} style={{border:0,background:"none",fontWeight:tab===t?800:500,color:tab===t?"#58618d":"#888"}}>{t}</button>)}
    </nav>
    <main style={{padding:14,overflowY:"auto",flex:1}}>
      {tab==="홈"||tab==="커뮤니티"?<>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><div style={{width:42,height:42,borderRadius:50,background:"#e8e9f4",display:"grid",placeItems:"center",color:"#59618d",fontWeight:800}}>N</div><div><b>NMIXX</b><div style={{fontSize:11,color:"#999"}}>Official Artist Community · 지우</div><div style={{fontSize:11,color:"#8a7397",marginTop:3}}>멤버 프로필과 새 소식을 확인해 보세요</div></div></div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:12}}>{members.map(member=><button key={member.name} onClick={()=>{setFilter(member.name);setTab("커뮤니티");}} style={{...pill,whiteSpace:"nowrap",background:filter===member.name?"#e8e9f4":"#fff",color:"#59618d",border:"1px solid #e7e7ee"}}>{member.name}</button>)}</div>
        <div style={{background:"#fff",padding:12,borderRadius:14,marginBottom:14}}><b>지우</b><textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder="엔써에게 전할 이야기를 남겨주세요" style={{width:"100%",minHeight:68,border:"1px solid #eee",borderRadius:10,padding:9,marginTop:8,resize:"vertical",background:"#fff",color:"#222"}}/><button onClick={addPost} style={{...button,marginTop:8}}><Plus size={14}/> 게시하기</button></div>
        <div style={{display:"flex",gap:7,marginBottom:12,flexWrap:"wrap"}}><button onClick={()=>setFilter("전체")} style={{...pill,background:filter==="전체"?"#e8e9f4":"#fff",color:"#59618d"}}>전체 게시글</button><button onClick={()=>setFilter("지우")} style={{...pill,background:filter==="지우"?"#e8e9f4":"#fff",color:"#59618d"}}>내 게시글</button></div>
        {visiblePosts.map(post=><article key={post.id} style={{background:"#fff",padding:13,borderRadius:14,marginBottom:12}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div><b>{post.author}</b><div style={{fontSize:10,color:"#999"}}>{members.find(m=>m.name===post.author)?.role||"NSWER · Fan"}</div></div><small style={{color:"#999"}}>NMIXX · FANS</small></div>
          <p style={{lineHeight:1.55,whiteSpace:"pre-wrap"}}>{post.body}</p>
          <div style={{display:"flex",gap:16,alignItems:"center",fontSize:13,color:"#777"}}><button onClick={()=>toggleLike(post.id)} style={{border:0,background:"none",color:likes.includes(post.id)?"#df6e8c":"#777"}}><Heart size={17} fill={likes.includes(post.id)?"currentColor":"none"}/> {post.likes+(likes.includes(post.id)?1:0)}</button><span><MessageCircle size={16}/> {post.comments.length}</span></div>
          <div style={{marginTop:10,borderTop:"1px solid #eee",paddingTop:8}}>{post.comments.map((c,i)=><p key={i} style={{fontSize:12,margin:"7px 0",color:"#555"}}><b>{c.author}</b> {c.body}</p>)}</div>
          <form onSubmit={e=>{e.preventDefault();addComment(post.id)}} style={{display:"flex",gap:6,marginTop:8}}><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="댓글 남기기..." style={field}/><button style={button} type="submit">답글</button></form>
        </article>)}
        {!visiblePosts.length&&<div style={{padding:20,textAlign:"center",color:"#999"}}>아직 게시글이 없어요.</div>}
      </>:tab==="스케줄"?<div style={{background:"#fff",padding:15,borderRadius:14}}><h3><CalendarDays size={18}/> NMIXX 스케줄</h3><p>11월 4일 · 음악방송 사전 녹화</p><p>11월 6일 · 공식 콘텐츠 촬영</p></div>:<div style={{background:"#fff",padding:24,borderRadius:14,textAlign:"center"}}><Radio size={32}/><h3>NMIXX LIVE</h3><p style={{color:"#888"}}>예정된 LIVE가 없어요.</p></div>}
    </main>
    <footer style={{padding:10,background:"#fff",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-around",fontSize:11,color:"#777"}}><span>⌂ 홈</span><span>♡ 커뮤니티</span><span>▦ 스케줄</span><span>◉ LIVE</span></footer>
  </div>;
}