import React, { useState, useContext } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { LangContext } from '../App'

function Reveal({ children, delay = 0 }) {
  const [ref, setRef] = React.useState(null)
  const [vis, setVis] = React.useState(false)
  React.useEffect(() => {
    if (!ref) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(ref)
    return () => obs.disconnect()
  }, [ref])
  return (
    <div ref={setRef} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.85s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.85s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>{children}</div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px',
      fontSize: '8.5px', letterSpacing: '5px', textTransform: 'lowercase',
      color: 'var(--ink)', opacity: 0.45, marginBottom: '18px', fontWeight: 300,
    }}>
      <span style={{ display:'inline-block', width:'32px', height:'1px', background:'linear-gradient(to right,transparent,var(--gold2),transparent)' }} />
      {children}
      <span style={{ display:'inline-block', width:'32px', height:'1px', background:'linear-gradient(to right,transparent,var(--gold2),transparent)' }} />
    </p>
  )
}

export default function RSVPForm() {
  const { t } = useContext(LangContext)
  const [form, setForm]         = useState({ name:'', attendance:'', guests:1, message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)
  const upd = (f, v) => setForm(p => ({ ...p, [f]: v }))

  const submit = async () => {
    if (!form.name || !form.attendance) return
    setLoading(true); setError(null)
    try {
      await addDoc(collection(db, 'rsvp'), {
        name:       form.name,
        attendance: form.attendance,
        guests:     form.attendance === 'yes' ? form.guests : 0,
        message:    form.message,
        createdAt:  serverTimestamp(),
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError('Қате кетті. Қайта көріңіз.')
    }
    setLoading(false)
  }

  const inp = {
    width:'100%', padding:'13px 0',
    border:'none', borderBottom:'1px solid rgba(0,0,0,0.15)',
    background:'transparent',
    fontFamily:"'Jost',sans-serif", fontSize:'13px',
    color:'var(--ink)', outline:'none',
    transition:'border-color 0.3s', letterSpacing:'0.3px', fontWeight:300,
  }
  const lbl = {
    display:'block', fontSize:'8px', letterSpacing:'3.5px',
    textTransform:'lowercase', color:'var(--ink)',
    marginBottom:'4px', fontWeight:400, opacity:0.5,
  }

  if (submitted) return (
    <section id="rsvp" style={{ padding:'clamp(56px,10vh,88px) 20px', background:'var(--white)', textAlign:'center' }}>
      <div style={{ maxWidth:'480px', margin:'0 auto' }}>
        <div style={{ width:'1px', height:'56px', background:'linear-gradient(to bottom,transparent,var(--gold2))', margin:'0 auto 28px' }}/>
        <svg viewBox="0 0 220 60" style={{ width:'180px', height:'48px', display:'block', margin:'0 auto 24px' }}>
          <line x1="0" y1="30" x2="75" y2="30" stroke="var(--gold2)" strokeWidth="0.8" opacity="0.5"/>
          <line x1="145" y1="30" x2="220" y2="30" stroke="var(--gold2)" strokeWidth="0.8" opacity="0.5"/>
          <path d="M110,16 C110,16 96,5 89,12 C82,19 89,30 110,44 C131,30 138,19 131,12 C124,5 110,16 110,16Z"
            fill="none" stroke="var(--gold)" strokeWidth="1.2"/>
          <circle cx="78" cy="30" r="2" fill="var(--gold2)" opacity="0.6"/>
          <circle cx="142" cy="30" r="2" fill="var(--gold2)" opacity="0.6"/>
          <polygon points="78,24 81,30 78,36 75,30" fill="var(--gold2)" opacity="0.3"/>
          <polygon points="142,24 145,30 142,36 139,30" fill="var(--gold2)" opacity="0.3"/>
        </svg>
        <p style={{
          fontFamily:"'Jost',sans-serif",
          fontSize:'clamp(26px,6vw,42px)', fontWeight:300, fontStyle:'italic',
          color:'var(--ink)', letterSpacing:'2px', marginBottom:'14px',
        }}>{form.attendance==='yes' ? t.rsvp.thankYes : t.rsvp.thankNo}</p>
        <p style={{ fontSize:'13px', color:'var(--ink)', lineHeight:2, fontWeight:300, fontFamily:"'Jost',sans-serif" }}>
          {form.attendance==='yes' ? t.rsvp.msgYes(form.name) : t.rsvp.msgNo(form.name)}
        </p>
        <div style={{ width:'1px', height:'56px', background:'linear-gradient(to bottom,var(--gold2),transparent)', margin:'28px auto 0' }}/>
      </div>
    </section>
  )

  return (
    <section id="rsvp" style={{ padding:'clamp(56px,10vh,88px) 20px', background:'var(--white)' }}>
      <div style={{ maxWidth:'480px', margin:'0 auto' }}>
        <Reveal delay={0}>
          <div style={{ textAlign:'center', marginBottom:'clamp(36px,6vh,52px)' }}>
            <SectionLabel>{t.rsvp.label}</SectionLabel>
            <h2 style={{
              fontFamily:"'Jost',sans-serif",
              fontSize:'clamp(26px,5vw,42px)', fontWeight:300, fontStyle:'italic',
              color:'var(--ink)', letterSpacing:'2px', marginBottom:'8px',
            }}>{t.rsvp.title}</h2>
            <p style={{ fontSize:'11px', letterSpacing:'1.5px', color:'var(--ink)', fontWeight:300, opacity:0.6, fontFamily:"'Jost',sans-serif" }}>
              {t.rsvp.sub}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>

            <div>
              <label style={lbl}>{t.rsvp.nameLabel}</label>
              <input type="text" placeholder={t.rsvp.namePlaceholder} value={form.name}
                onChange={e=>upd('name',e.target.value)} style={inp}
                onFocus={e=>e.target.style.borderColor='var(--ink)'}
                onBlur={e=>e.target.style.borderColor='rgba(0,0,0,0.15)'}
              />
            </div>

            <div>
              <label style={lbl}>{t.rsvp.attendLabel}</label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginTop:'8px' }}>
                {[{v:'yes',tx:t.rsvp.yes,s:t.rsvp.yesSub},{v:'no',tx:t.rsvp.no,s:t.rsvp.noSub}].map(o=>(
                  <button key={o.v} onClick={()=>upd('attendance',o.v)} style={{
                    padding:'16px 12px', cursor:'pointer', textAlign:'center', transition:'all 0.3s',
                    background: form.attendance===o.v ? 'var(--ink)' : 'transparent',
                    border:`1px solid ${form.attendance===o.v ? 'var(--ink)' : 'rgba(0,0,0,0.15)'}`,
                    color: form.attendance===o.v ? 'white' : 'var(--ink)',
                  }}>
                    <p style={{ fontSize:'12px', letterSpacing:'0.5px', marginBottom:'3px', fontFamily:"'Jost',sans-serif", fontWeight:300 }}>{o.tx}</p>
                    <p style={{ fontSize:'9px', letterSpacing:'1px', opacity:0.6, fontFamily:"'Jost',sans-serif", fontWeight:300 }}>{o.s}</p>
                  </button>
                ))}
              </div>
            </div>

            {form.attendance==='yes' && (
              <div>
                <label style={lbl}>{t.rsvp.guestsLabel}</label>
                <div style={{ display:'flex', alignItems:'center', gap:'20px', marginTop:'8px' }}>
                  <button onClick={()=>upd('guests',Math.max(1,form.guests-1))}
                    style={{ width:'36px',height:'36px',border:'1px solid rgba(0,0,0,0.15)',background:'transparent',cursor:'pointer',fontSize:'20px',color:'var(--ink)' }}>−</button>
                  <span style={{ fontFamily:"'Bodoni Moda',serif", fontSize:'28px', fontWeight:300, color:'var(--ink)', minWidth:'40px', textAlign:'center' }}>
                    {form.guests}
                  </span>
                  <button onClick={()=>upd('guests',Math.min(10,form.guests+1))}
                    style={{ width:'36px',height:'36px',border:'1px solid rgba(0,0,0,0.15)',background:'transparent',cursor:'pointer',fontSize:'20px',color:'var(--ink)' }}>+</button>
                  <span style={{ fontSize:'10px',letterSpacing:'2px',color:'var(--ink)',fontWeight:300,opacity:0.55 }}>{t.rsvp.guestsUnit}</span>
                </div>
              </div>
            )}

            <div>
              <label style={lbl}>{t.rsvp.msgLabel}</label>
              <textarea placeholder={t.rsvp.msgPlaceholder} value={form.message}
                onChange={e=>upd('message',e.target.value)} rows={3}
                style={{...inp,resize:'vertical',minHeight:'72px'}}
                onFocus={e=>e.target.style.borderColor='var(--ink)'}
                onBlur={e=>e.target.style.borderColor='rgba(0,0,0,0.15)'}
              />
            </div>

            {error && <p style={{ fontSize:'12px', color:'#c0392b', textAlign:'center' }}>{error}</p>}

            <button onClick={submit} disabled={!form.name||!form.attendance||loading} style={{
              width:'100%', padding:'16px',
              background: (!form.name||!form.attendance) ? 'rgba(0,0,0,0.06)' : 'var(--ink)',
              border:'none',
              cursor: (!form.name||!form.attendance) ? 'not-allowed' : 'pointer',
              color: (!form.name||!form.attendance) ? 'rgba(0,0,0,0.3)' : 'white',
              fontSize:'9.5px', letterSpacing:'4px', textTransform:'lowercase',
              fontFamily:"'Jost',sans-serif", fontWeight:300, transition:'all 0.3s',
            }}>
              {loading
                ? <span style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
                    <span style={{animation:'loadDot 1s ease infinite',display:'inline-block',width:'4px',height:'4px',borderRadius:'50%',background:'white'}}/>
                    <span style={{animation:'loadDot 1s ease 0.2s infinite',display:'inline-block',width:'4px',height:'4px',borderRadius:'50%',background:'white'}}/>
                    <span style={{animation:'loadDot 1s ease 0.4s infinite',display:'inline-block',width:'4px',height:'4px',borderRadius:'50%',background:'white'}}/>
                    {t.rsvp.sending}
                  </span>
                : t.rsvp.submit
              }
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}