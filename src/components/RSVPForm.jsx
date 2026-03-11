import React, { useState, useContext } from 'react'
import KazakhOrnament from './KazakhOrnament'
import { LangContext } from '../App'

export default function RSVPForm() {
  const { t } = useContext(LangContext)
  const [form, setForm] = useState({ name:'', attendance:'', guests:1, message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const upd = (f,v) => setForm(p=>({...p,[f]:v}))

  const submit = async () => {
    if (!form.name || !form.attendance) return
    setLoading(true)
    await new Promise(r=>setTimeout(r,1200))
    try {
      const arr = JSON.parse(localStorage.getItem('wedding_rsvp')||'[]')
      arr.push({...form, ts: new Date().toISOString()})
      localStorage.setItem('wedding_rsvp', JSON.stringify(arr))
    } catch(e){}
    setLoading(false); setSubmitted(true)
  }

  const inp = { width:'100%', padding:'14px 18px', border:'1px solid var(--border)', borderRadius:'4px', fontFamily:"'Raleway',sans-serif", fontSize:'15px', color:'var(--text-dark)', background:'var(--white)', outline:'none', transition:'border-color 0.3s', boxSizing:'border-box' }

  if (submitted) return (
    <section id="rsvp" style={{ padding:'80px 20px', background:'var(--ivory)', textAlign:'center' }}>
      <div style={{ maxWidth:'560px', margin:'0 auto' }}>
        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:'8px', padding:'56px 32px', boxShadow:'0 8px 40px rgba(201,168,76,0.1)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))' }} />
          <div style={{ fontSize:'56px', marginBottom:'16px' }}>{form.attendance==='yes'?'🌸':'🙏'}</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'34px', fontStyle:'italic', fontWeight:300, color:'var(--text-dark)', marginBottom:'14px' }}>
            {form.attendance==='yes' ? t.rsvp.thankYes : t.rsvp.thankNo}
          </h2>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'19px', color:'var(--text-mid)', lineHeight:1.8, fontStyle:'italic' }}>
            {form.attendance==='yes' ? t.rsvp.msgYes(form.name) : t.rsvp.msgNo(form.name)}
          </p>
        </div>
      </div>
    </section>
  )

  return (
    <section id="rsvp" style={{ padding:'80px 20px', background:'var(--ivory)' }}>
      <div style={{ maxWidth:'620px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'40px' }}>
          <KazakhOrnament type="divider" color="var(--gold)" />
          <p style={{ letterSpacing:'5px', fontSize:'11px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'12px', marginTop:'32px' }}>{t.rsvp.label}</p>
          <h2 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:300, fontStyle:'italic', color:'var(--text-dark)', marginBottom:'10px' }}>{t.rsvp.title}</h2>
          <p style={{ fontSize:'14px', color:'var(--text-light)' }}>{t.rsvp.sub}</p>
        </div>

        <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:'8px', padding:'clamp(20px,5vw,44px)', boxShadow:'0 8px 40px rgba(201,168,76,0.08)', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:'4px', background:'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:'22px' }}>

            <div>
              <label style={{ display:'block', fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'8px', fontWeight:500 }}>{t.rsvp.nameLabel}</label>
              <input type="text" placeholder={t.rsvp.namePlaceholder} value={form.name} onChange={e=>upd('name',e.target.value)} style={inp}
                onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
            </div>

            <div>
              <label style={{ display:'block', fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'10px', fontWeight:500 }}>{t.rsvp.attendLabel}</label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
                {[{v:'yes',e:'🌸',tx:t.rsvp.yes,s:t.rsvp.yesSub},{v:'no',e:'🙏',tx:t.rsvp.no,s:t.rsvp.noSub}].map(o=>(
                  <button key={o.v} onClick={()=>upd('attendance',o.v)} style={{
                    padding:'18px 14px', borderRadius:'4px', cursor:'pointer',
                    border: form.attendance===o.v ? '2px solid var(--gold)' : '1px solid var(--border)',
                    background: form.attendance===o.v ? 'var(--gold-faint)' : 'var(--white)',
                    transition:'all 0.3s', textAlign:'center'
                  }}>
                    <div style={{ fontSize:'26px', marginBottom:'5px' }}>{o.e}</div>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'15px', color:'var(--text-dark)', marginBottom:'3px' }}>{o.tx}</p>
                    <p style={{ fontSize:'10px', color:'var(--text-light)' }}>{o.s}</p>
                  </button>
                ))}
              </div>
            </div>

            {form.attendance==='yes' && (
              <div>
                <label style={{ display:'block', fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'8px', fontWeight:500 }}>{t.rsvp.guestsLabel}</label>
                <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
                  <button onClick={()=>upd('guests',Math.max(1,form.guests-1))} style={{ width:'42px',height:'42px',borderRadius:'4px',border:'1px solid var(--border)',background:'var(--white)',cursor:'pointer',fontSize:'22px',color:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center' }}>−</button>
                  <div style={{ flex:1,textAlign:'center',fontFamily:"'Cormorant Garamond',serif",fontSize:'30px',color:'var(--text-dark)' }}>
                    {form.guests} <span style={{ fontSize:'14px',color:'var(--text-light)' }}>{t.rsvp.guestsUnit}</span>
                  </div>
                  <button onClick={()=>upd('guests',Math.min(10,form.guests+1))} style={{ width:'42px',height:'42px',borderRadius:'4px',border:'1px solid var(--border)',background:'var(--white)',cursor:'pointer',fontSize:'22px',color:'var(--gold)',display:'flex',alignItems:'center',justifyContent:'center' }}>+</button>
                </div>
              </div>
            )}

            <div>
              <label style={{ display:'block', fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'var(--gold)', marginBottom:'8px', fontWeight:500 }}>{t.rsvp.msgLabel}</label>
              <textarea placeholder={t.rsvp.msgPlaceholder} value={form.message} onChange={e=>upd('message',e.target.value)} rows={3}
                style={{...inp, resize:'vertical', minHeight:'80px'}}
                onFocus={e=>e.target.style.borderColor='var(--gold)'} onBlur={e=>e.target.style.borderColor='var(--border)'} />
            </div>

            <button onClick={submit} disabled={!form.name||!form.attendance||loading} style={{
              width:'100%', padding:'17px',
              background: (!form.name||!form.attendance) ? 'var(--gold-pale)' : 'linear-gradient(135deg,var(--gold),var(--gold-light))',
              border:'none', borderRadius:'4px',
              cursor: (!form.name||!form.attendance) ? 'not-allowed' : 'pointer',
              color: (!form.name||!form.attendance) ? 'var(--text-light)' : 'white',
              fontFamily:"'Raleway',sans-serif", fontSize:'13px', letterSpacing:'3px', textTransform:'uppercase', fontWeight:500,
              transition:'all 0.3s', boxShadow: (!form.name||!form.attendance) ? 'none' : '0 4px 16px rgba(201,168,76,0.3)'
            }}>
              {loading ? t.rsvp.sending : t.rsvp.submit}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}