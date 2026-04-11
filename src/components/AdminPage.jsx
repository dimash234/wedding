import React, { useState, useEffect } from 'react'
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

// ── Пароль администратора ──────────────────────────
const ADMIN_PASSWORD = 'admin2026'
const STORAGE_KEY    = 'wedding_admin_auth'

export default function AdminPage() {
  const [authed,   setAuthed]   = useState(() => sessionStorage.getItem(STORAGE_KEY) === 'true')
  const [input,    setInput]    = useState('')
  const [shake,    setShake]    = useState(false)
  const [revealed, setRevealed] = useState(false)

  const login = () => {
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setAuthed(true)
    } else {
      setShake(true); setInput('')
      setTimeout(() => setShake(false), 600)
    }
  }

  if (!authed) return <LoginScreen input={input} setInput={setInput} shake={shake} revealed={revealed} setRevealed={setRevealed} onSubmit={login} />
  return <Dashboard onLogout={() => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false) }} />
}

/* ─── Login screen ─────────────────────────────────────────────────── */
function LoginScreen({ input, setInput, shake, revealed, setRevealed, onSubmit }) {
  return (
    <div style={{
      minHeight: '100svh', background: '#FAFAF8',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '32px 24px', fontFamily: "'Jost',sans-serif",
    }}>
      <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom,transparent,#D4B483)', marginBottom: '32px' }} />

      <p style={{ fontFamily: "'Bodoni Moda',serif", fontSize: '28px', fontWeight: 300, fontStyle: 'italic', letterSpacing: '4px', color: '#1A1410', marginBottom: '6px' }}>
        Р ✦ Ж
      </p>
      <p style={{ fontSize: '9px', letterSpacing: '5px', color: '#1A1410', opacity: 0.4, marginBottom: '40px' }}>
        панель басшысы
      </p>

      <div style={{
        width: '100%', maxWidth: '300px',
        animation: shake ? 'shakeGate 0.5s ease' : 'none',
        display: 'flex', flexDirection: 'column', gap: '12px',
      }}>
        <div style={{ position: 'relative', borderBottom: '1.5px solid rgba(0,0,0,0.18)' }}>
          <input
            type={revealed ? 'text' : 'password'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSubmit()}
            placeholder="············"
            autoComplete="off"
            style={{
              width: '100%', padding: '12px 36px 12px 0',
              border: 'none', background: 'transparent',
              fontFamily: "'Jost',sans-serif", fontSize: '15px',
              letterSpacing: '3px', color: '#1A1410',
              outline: 'none', textAlign: 'center',
              boxSizing: 'border-box',
            }}
          />
          <button onClick={() => setRevealed(r => !r)} style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', opacity: 0.4,
          }}>{revealed ? '🙈' : '👁'}</button>
        </div>

        <button onClick={onSubmit} disabled={!input.trim()} style={{
          padding: '14px', background: input.trim() ? '#1A1410' : 'rgba(0,0,0,0.06)',
          border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
          color: input.trim() ? 'white' : 'rgba(0,0,0,0.25)',
          fontSize: '9.5px', letterSpacing: '4px', textTransform: 'lowercase',
          fontFamily: "'Jost',sans-serif", fontWeight: 300, transition: 'all 0.3s',
        }}>кіру</button>
      </div>

      <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom,#D4B483,transparent)', marginTop: '36px' }} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@1,6..96,300&family=Jost:wght@300;400&display=swap');
        @keyframes shakeGate { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  )
}

/* ─── Dashboard ────────────────────────────────────────────────────── */
function Dashboard({ onLogout }) {
  const [guests,  setGuests]  = useState([])
  const [loading, setLoading] = useState(true)
  const [filter,  setFilter]  = useState('all') // all | yes | no

  const fetchGuests = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'rsvp'))
      const snap = await getDocs(q)
      setGuests(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  useEffect(() => { fetchGuests() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Жазбаны өшіру?')) return
    await deleteDoc(doc(db, 'rsvp', id))
    setGuests(g => g.filter(x => x.id !== id))
  }

  const shown   = guests.filter(g => filter === 'all' ? true : g.attendance === filter)
  const totalYes  = guests.filter(g => g.attendance === 'yes').reduce((s, g) => s + (g.guests || 1), 0)
  const totalNo   = guests.filter(g => g.attendance === 'no').length
  const totalResp = guests.length

  const fmt = (ts) => {
    if (!ts) return '—'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('kk-KZ', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' })
  }

  return (
    <div style={{ minHeight: '100svh', background: '#FAFAF8', fontFamily: "'Jost',sans-serif" }}>

      {/* Header */}
      <div style={{
        borderBottom: '1px solid rgba(180,152,100,0.2)',
        padding: '0 clamp(16px,4vw,40px)',
        height: '58px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'white', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <p style={{ fontFamily: "'Bodoni Moda',serif", fontSize: '18px', fontWeight: 300, fontStyle: 'italic', letterSpacing: '3px', color: '#1A1410' }}>
            Р ✦ Ж
          </p>
          <span style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.12)' }} />
          <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'lowercase', color: '#1A1410', opacity: 0.5 }}>
            қонақтар тізімі
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={fetchGuests} style={{
            background: 'none', border: '1px solid rgba(0,0,0,0.15)', cursor: 'pointer',
            padding: '6px 14px', fontSize: '9px', letterSpacing: '2px',
            textTransform: 'lowercase', color: '#1A1410', fontFamily: "'Jost',sans-serif",
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#1A1410'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)'}
          >↻ жаңарту</button>
          <button onClick={onLogout} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '9px', letterSpacing: '2px', textTransform: 'lowercase',
            color: '#1A1410', opacity: 0.4, fontFamily: "'Jost',sans-serif",
          }}>шығу</button>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(24px,4vh,48px) clamp(16px,4vw,40px)' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(180,152,100,0.2)', marginBottom: '32px' }}>
          {[
            { label: 'жауаптар',    value: totalResp, sub: 'барлығы'  },
            { label: 'келеді',      value: totalYes,  sub: 'адам'     },
            { label: 'келе алмайды', value: totalNo,  sub: 'жауап'    },
          ].map((s, i) => (
            <div key={i} style={{ background: 'white', padding: '20px 16px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 'clamp(28px,6vw,44px)', fontWeight: 300, color: '#1A1410', lineHeight: 1, marginBottom: '6px' }}>
                {s.value}
              </p>
              <p style={{ fontSize: '8px', letterSpacing: '3px', textTransform: 'lowercase', color: '#1A1410', opacity: 0.4 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '20px', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          {[['all','барлығы'],['yes','келеді'],['no','келмейді']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '9.5px', letterSpacing: '2px', textTransform: 'lowercase',
              fontFamily: "'Jost',sans-serif", fontWeight: 300,
              color: filter === v ? '#1A1410' : 'rgba(0,0,0,0.35)',
              borderBottom: filter === v ? '1.5px solid #1A1410' : '1.5px solid transparent',
              transition: 'all 0.2s', marginBottom: '-1px',
            }}>{l}</button>
          ))}
        </div>

        {/* Guest list */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#1A1410', opacity: 0.3, fontSize: '13px', letterSpacing: '2px' }}>
            жүктелуде...
          </div>
        ) : shown.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#1A1410', opacity: 0.3, fontSize: '13px', letterSpacing: '2px' }}>
            жазбалар жоқ
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(180,152,100,0.15)' }}>
            {shown.map((g, i) => (
              <div key={g.id} style={{
                background: 'white',
                padding: 'clamp(14px,3vw,20px) clamp(14px,3vw,24px)',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '12px',
                alignItems: 'start',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAF8'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}
              >
                <div>
                  {/* Name + badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: "'Bodoni Moda',serif", fontSize: 'clamp(15px,3vw,18px)', fontWeight: 300, fontStyle: 'italic', color: '#1A1410', letterSpacing: '0.5px' }}>
                      {g.name}
                    </p>
                    <span style={{
                      padding: '2px 10px',
                      background: g.attendance === 'yes' ? '#1A1410' : 'rgba(0,0,0,0.06)',
                      color: g.attendance === 'yes' ? 'white' : '#1A1410',
                      fontSize: '8px', letterSpacing: '2px', textTransform: 'lowercase',
                    }}>
                      {g.attendance === 'yes' ? `келеді · ${g.guests || 1} адам` : 'келмейді'}
                    </span>
                  </div>

                  {/* Message */}
                  {g.message && (
                    <p style={{ fontSize: '12px', color: '#1A1410', opacity: 0.55, lineHeight: 1.7, fontStyle: 'italic', marginBottom: '6px' }}>
                      «{g.message}»
                    </p>
                  )}

                  {/* Date */}
                  <p style={{ fontSize: '9px', color: '#1A1410', opacity: 0.3, letterSpacing: '1px' }}>
                    {fmt(g.createdAt)}
                  </p>
                </div>

                {/* Delete button */}
                <button onClick={() => handleDelete(g.id)} style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '14px', opacity: 0.2, padding: '4px',
                  transition: 'opacity 0.2s', color: '#1A1410',
                  flexShrink: 0,
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0.2'}
                  title="Өшіру"
                >✕</button>
              </div>
            ))}
          </div>
        )}

        {shown.length > 0 && (
          <p style={{ marginTop: '16px', fontSize: '9px', letterSpacing: '2px', color: '#1A1410', opacity: 0.3, textAlign: 'right' }}>
            {shown.length} жазба
          </p>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;1,6..96,300&family=Jost:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAFAF8; }
      `}</style>
    </div>
  )
}