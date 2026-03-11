import React, { useState, useContext } from 'react'
import { LangContext } from '../App'
export default function RSVPForm() {
  const { t } = useContext(LangContext)
  const [form, setForm] = useState({name:'',attendance:'',guests:1,message:''})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const upd=(f,v)=>setForm(p=>({...p,[f]:v}))
  const submit=async()=>{
    if(!form.name||!form.attendance)return
    setLoading(true)
    await new Promise(r=>setTimeout(r,1000))
    try{const a=JSON.parse(localStorage.getItem('rsvp')||'[]');a.push({...form,ts:new Date().toISOString()});localStorage.setItem('rsvp',JSON.stringify(a))}catch(e){}
    setLoading(false);setSubmitted(true)
  }
  const inp={width:'100%',padding:'12px 0',border:'none',borderBottom:'1px solid var(--border)',background:'transparent',fontFamily:'inherit',fontSize:'13px',color:'var(--text-dark)',outline:'none',transition:'border-color 0.3s',letterSpacing:'0.5px'}
  if(submitted) return (
    <section id="rsvp" style={{padding:'80px 20px',background:'var(--ivory)',textAlign:'center'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={{width:'1px',height:'48px',background:'linear-gradient(to bottom,transparent,var(--line))',margin:'0 auto 32px'}}/>
        <p className="display-font" style={{fontSize:'36px',fontWeight:300,color:'var(--text-dark)',letterSpacing:'3px',marginBottom:'16px'}}>
          {form.attendance==='yes'?t.rsvp.thankYes:t.rsvp.thankNo}
        </p>
        <p style={{fontSize:'13px',color:'var(--text-light)',lineHeight:1.9}}>
          {form.attendance==='yes'?t.rsvp.msgYes(form.name):t.rsvp.msgNo(form.name)}
        </p>
        <div style={{width:'1px',height:'48px',background:'linear-gradient(to bottom,var(--line),transparent)',margin:'32px auto 0'}}/>
      </div>
    </section>
  )
  return (
    <section id="rsvp" style={{padding:'80px 20px',background:'var(--ivory)'}}>
      <div style={{maxWidth:'480px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{fontSize:'9px',letterSpacing:'5px',textTransform:'lowercase',color:'var(--text-light)',marginBottom:'14px',display:'flex',alignItems:'center',justifyContent:'center',gap:'12px'}}>
            <span style={{display:'inline-block',width:'24px',height:'1px',background:'var(--line)'}}/>
            {t.rsvp.label}
            <span style={{display:'inline-block',width:'24px',height:'1px',background:'var(--line)'}}/>
          </p>
          <h2 className="display-font" style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:300,color:'var(--text-dark)',letterSpacing:'4px',textTransform:'lowercase'}}>{t.rsvp.title}</h2>
          <p style={{fontSize:'11px',letterSpacing:'2px',color:'var(--text-light)',marginTop:'8px'}}>{t.rsvp.sub}</p>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'28px'}}>
          <div>
            <label style={{fontSize:'8px',letterSpacing:'3px',textTransform:'lowercase',color:'var(--text-light)',display:'block',marginBottom:'4px'}}>{t.rsvp.nameLabel}</label>
            <input type="text" placeholder={t.rsvp.namePlaceholder} value={form.name} onChange={e=>upd('name',e.target.value)} style={inp}
              onFocus={e=>e.target.style.borderColor='var(--text-dark)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
          </div>
          <div>
            <label style={{fontSize:'8px',letterSpacing:'3px',textTransform:'lowercase',color:'var(--text-light)',display:'block',marginBottom:'12px'}}>{t.rsvp.attendLabel}</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              {[{v:'yes',tx:t.rsvp.yes,s:t.rsvp.yesSub},{v:'no',tx:t.rsvp.no,s:t.rsvp.noSub}].map(o=>(
                <button key={o.v} onClick={()=>upd('attendance',o.v)} style={{
                  padding:'16px 12px',cursor:'pointer',textAlign:'center',transition:'all 0.3s',
                  background: form.attendance===o.v ? 'var(--text-dark)' : 'transparent',
                  border:`1px solid ${form.attendance===o.v?'var(--text-dark)':'var(--border)'}`,
                  color: form.attendance===o.v ? 'var(--white)' : 'var(--text-mid)'
                }}>
                  <p style={{fontSize:'12px',letterSpacing:'1px',marginBottom:'3px'}}>{o.tx}</p>
                  <p style={{fontSize:'9px',letterSpacing:'1px',opacity:0.7}}>{o.s}</p>
                </button>
              ))}
            </div>
          </div>
          {form.attendance==='yes'&&(
            <div>
              <label style={{fontSize:'8px',letterSpacing:'3px',textTransform:'lowercase',color:'var(--text-light)',display:'block',marginBottom:'12px'}}>{t.rsvp.guestsLabel}</label>
              <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
                <button onClick={()=>upd('guests',Math.max(1,form.guests-1))} style={{width:'36px',height:'36px',border:'1px solid var(--border)',background:'transparent',cursor:'pointer',fontSize:'18px',color:'var(--text-mid)'}}>−</button>
                <span className="display-font" style={{fontSize:'28px',fontWeight:300,color:'var(--text-dark)',minWidth:'40px',textAlign:'center'}}>{form.guests}</span>
                <button onClick={()=>upd('guests',Math.min(10,form.guests+1))} style={{width:'36px',height:'36px',border:'1px solid var(--border)',background:'transparent',cursor:'pointer',fontSize:'18px',color:'var(--text-mid)'}}>+</button>
                <span style={{fontSize:'10px',color:'var(--text-light)',letterSpacing:'2px'}}>{t.rsvp.guestsUnit}</span>
              </div>
            </div>
          )}
          <div>
            <label style={{fontSize:'8px',letterSpacing:'3px',textTransform:'lowercase',color:'var(--text-light)',display:'block',marginBottom:'4px'}}>{t.rsvp.msgLabel}</label>
            <textarea placeholder={t.rsvp.msgPlaceholder} value={form.message} onChange={e=>upd('message',e.target.value)} rows={3}
              style={{...inp,resize:'vertical',minHeight:'70px'}}
              onFocus={e=>e.target.style.borderColor='var(--text-dark)'} onBlur={e=>e.target.style.borderColor='var(--border)'}/>
          </div>
          <button onClick={submit} disabled={!form.name||!form.attendance||loading} style={{
            width:'100%',padding:'16px',
            background:(!form.name||!form.attendance)?'var(--border)':'var(--text-dark)',
            border:'none',cursor:(!form.name||!form.attendance)?'not-allowed':'pointer',
            color:'var(--white)',fontSize:'10px',letterSpacing:'4px',textTransform:'lowercase',
            transition:'all 0.3s',opacity:(!form.name||!form.attendance)?0.5:1
          }}>
            {loading?t.rsvp.sending:t.rsvp.submit}
          </button>
        </div>
      </div>
    </section>
  )
}