import React, { useState } from 'react'
import KazakhOrnament from './KazakhOrnament'

export default function RSVPForm() {
  const [form, setForm] = useState({
    name: '',
    attendance: '',
    guests: 1,
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    if (!form.name || !form.attendance) return
    setLoading(true)
    // Simulate submission (no backend - store in localStorage for demo)
    await new Promise(r => setTimeout(r, 1200))
    const existing = JSON.parse(localStorage.getItem('wedding_rsvp') || '[]')
    existing.push({ ...form, timestamp: new Date().toISOString() })
    localStorage.setItem('wedding_rsvp', JSON.stringify(existing))
    setLoading(false)
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '15px', color: 'var(--text-dark)',
    background: 'var(--white)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  }

  if (submitted) {
    return (
      <section id="rsvp" style={{ padding: '80px 20px', background: 'var(--ivory)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: '8px', padding: '60px 40px',
            boxShadow: '0 8px 40px rgba(201,168,76,0.1)',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
              background: 'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))'
            }} />
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>
              {form.attendance === 'yes' ? '🌸' : '🙏'}
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '36px', fontStyle: 'italic', fontWeight: 300,
              color: 'var(--text-dark)', marginBottom: '16px'
            }}>
              {form.attendance === 'yes' ? 'Рақмет!' : 'Түсінікті!'}
            </h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '20px', color: 'var(--text-mid)', lineHeight: 1.8, fontStyle: 'italic'
            }}>
              {form.attendance === 'yes'
                ? `${form.name}, сізді тойымызда көруге қуаныштымыз! 🎉`
                : `${form.name}, жауабыңыз үшін рақмет. Бізді қолдауыңыз маңызды!`
              }
            </p>
            <div style={{ marginTop: '32px' }}>
              <KazakhOrnament type="divider" color="var(--gold)" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" style={{
      padding: '80px 20px',
      background: 'var(--ivory)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <KazakhOrnament type="divider" color="var(--gold)" />
          <p style={{
            letterSpacing: '5px', fontSize: '11px', textTransform: 'uppercase',
            color: 'var(--gold)', marginBottom: '12px', marginTop: '32px'
          }}>Жауап беріңіз</p>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300,
            fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '12px'
          }}>Қатысасыз ба?</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-light)' }}>
            Тойға қатысуыңызды растаңыз
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: 'clamp(24px, 5vw, 48px)',
          boxShadow: '0 8px 40px rgba(201,168,76,0.08)',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
            background: 'linear-gradient(to right, var(--gold), var(--rose-light), var(--gold))'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Name */}
            <div>
              <label style={{
                display: 'block', fontSize: '11px', letterSpacing: '3px',
                textTransform: 'uppercase', color: 'var(--gold)',
                marginBottom: '8px', fontWeight: 500
              }}>Есіміңіз *</label>
              <input
                type="text"
                placeholder="Аты-жөніңізді жазыңыз..."
                value={form.name}
                onChange={e => update('name', e.target.value)}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Attendance */}
            <div>
              <label style={{
                display: 'block', fontSize: '11px', letterSpacing: '3px',
                textTransform: 'uppercase', color: 'var(--gold)',
                marginBottom: '12px', fontWeight: 500
              }}>Қатысасыз ба? *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { value: 'yes', emoji: '🌸', text: 'Иә, келемін!', sub: 'Тойда боламын' },
                  { value: 'no', emoji: '🙏', text: 'Жоқ, келе алмаймын', sub: 'Бақыт тілеймін' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => update('attendance', opt.value)}
                    style={{
                      padding: '20px 16px', borderRadius: '4px', cursor: 'pointer',
                      border: form.attendance === opt.value
                        ? '2px solid var(--gold)'
                        : '1px solid var(--border)',
                      background: form.attendance === opt.value
                        ? 'var(--gold-faint)'
                        : 'var(--white)',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '6px' }}>{opt.emoji}</div>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '16px', color: 'var(--text-dark)',
                      marginBottom: '4px'
                    }}>{opt.text}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-light)' }}>{opt.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Guests count - only if attending */}
            {form.attendance === 'yes' && (
              <div>
                <label style={{
                  display: 'block', fontSize: '11px', letterSpacing: '3px',
                  textTransform: 'uppercase', color: 'var(--gold)',
                  marginBottom: '8px', fontWeight: 500
                }}>Неше адам келесіз?</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => update('guests', Math.max(1, form.guests - 1))}
                    style={{
                      width: '44px', height: '44px', borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: 'var(--white)', cursor: 'pointer',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '24px', color: 'var(--gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >−</button>
                  <div style={{
                    flex: 1, textAlign: 'center',
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '32px', color: 'var(--text-dark)'
                  }}>
                    {form.guests} <span style={{ fontSize: '16px', color: 'var(--text-light)' }}>адам</span>
                  </div>
                  <button
                    onClick={() => update('guests', Math.min(10, form.guests + 1))}
                    style={{
                      width: '44px', height: '44px', borderRadius: '4px',
                      border: '1px solid var(--border)',
                      background: 'var(--white)', cursor: 'pointer',
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '24px', color: 'var(--gold)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                  >+</button>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label style={{
                display: 'block', fontSize: '11px', letterSpacing: '3px',
                textTransform: 'uppercase', color: 'var(--gold)',
                marginBottom: '8px', fontWeight: 500
              }}>Тілек / Хабарлама (міндетті емес)</label>
              <textarea
                placeholder="Тілектеріңізді жазыңыз..."
                value={form.message}
                onChange={e => update('message', e.target.value)}
                rows={3}
                style={{
                  ...inputStyle,
                  resize: 'vertical', minHeight: '90px'
                }}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!form.name || !form.attendance || loading}
              style={{
                width: '100%', padding: '18px',
                background: (!form.name || !form.attendance)
                  ? 'var(--gold-pale)'
                  : 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                border: 'none', borderRadius: '4px',
                cursor: (!form.name || !form.attendance) ? 'not-allowed' : 'pointer',
                color: (!form.name || !form.attendance) ? 'var(--text-light)' : 'white',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                boxShadow: (!form.name || !form.attendance) ? 'none' : '0 4px 16px rgba(201,168,76,0.3)'
              }}
              onMouseEnter={e => {
                if (form.name && form.attendance) {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(201,168,76,0.4)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(201,168,76,0.3)'
              }}
            >
              {loading ? '⏳ Жіберілуде...' : '✨ Жауабымды жіберу'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}