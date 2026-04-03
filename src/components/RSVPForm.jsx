import React, { useState, useContext } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { LangContext } from '../context/LangContext';
import { Reveal } from './common/Reveal';
import { SectionLabel } from './common/SectionLabel';

export default function RSVPForm() {
  const { t } = useContext(LangContext);
  const [form, setForm] = useState({ name: '', attendance: '', guests: 1, message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const upd = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const submit = async () => {
    if (!form.name || !form.attendance) return;
    setLoading(true);
    setError(null);
    try {
      await addDoc(collection(db, 'rsvp'), {
        name: form.name,
        attendance: form.attendance,
        guests: form.attendance === 'yes' ? form.guests : 0,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError('Қате кетті. Қайта көріңіз.');
    }
    setLoading(false);
  };

  const FONT = "'Ante', sans-serif";

  const inp = {
    width: '100%', padding: '14px 0',
    border: 'none', borderBottom: '1px solid rgba(0,0,0,0.15)',
    background: 'transparent', fontFamily: FONT,
    fontSize: '19px', color: 'var(--ink)', outline: 'none',
    transition: 'border-color 0.3s', fontWeight: 300, letterSpacing: '0.3px',
  };

  const lbl = {
    display: 'block', fontSize: '16px', letterSpacing: '3px',
    textTransform: 'lowercase', color: 'var(--ink)',
    marginBottom: '10px', fontWeight: 400, fontFamily: FONT, opacity: 0.5,
  };

  if (submitted)
    return (
      <section id="rsvp" style={{ padding: '80px 20px', background: 'var(--white)', textAlign: 'center' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <p style={{ fontFamily: FONT, fontSize: 'clamp(26px,5vw,36px)', fontWeight: 300, color: 'var(--ink)', marginBottom: '14px', letterSpacing: '1px' }}>
            {form.attendance === 'yes' ? t.rsvp.thankYes : t.rsvp.thankNo}
          </p>
          <p style={{ fontSize: '16px', color: 'var(--ink)', lineHeight: 1.8, fontWeight: 300, fontFamily: FONT }}>
            {form.attendance === 'yes' ? t.rsvp.msgYes(form.name) : t.rsvp.msgNo(form.name)}
          </p>
        </div>
      </section>
    );

  return (
    <section id="rsvp" style={{ padding: '10px 20px', background: 'var(--white)' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

       <Reveal delay={0}>
  <div style={{ 
    position: 'relative',
    textAlign: 'center', 
    marginBottom: '50px',
    padding: '40px 60px',
  }}>
    {/* Four symmetric corner frames */}
    <div style={{
      position: 'absolute',
      top: '0',
      left: '0',
      width: '30px',
      height: '30px',
      borderLeft: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      opacity: 0.5,
    }} />
    <div style={{
      position: 'absolute',
      top: '0',
      right: '0',
      width: '30px',
      height: '30px',
      borderRight: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      opacity: 0.5,
    }} />
    <div style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '30px',
      height: '30px',
      borderLeft: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      opacity: 0.5,
    }} />
    <div style={{
      position: 'absolute',
      bottom: '0',
      right: '0',
      width: '30px',
      height: '30px',
      borderRight: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      opacity: 0.5,
    }} />

    {/* Symmetric ornamental dots - diagonal corners */}
    <div style={{
      position: 'absolute',
      top: '15px',
      right: '15px',
      width: '35px',
      height: '35px',
      backgroundImage: 'radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)',
      backgroundSize: '8px 8px',
      opacity: 0.3,
    }} />
    <div style={{
      position: 'absolute',
      bottom: '15px',
      left: '15px',
      width: '35px',
      height: '35px',
      backgroundImage: 'radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)',
      backgroundSize: '8px 8px',
      opacity: 0.3,
    }} />

    {/* Vertical side accents */}
    <div style={{
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '40%',
      width: '1px',
      background: 'linear-gradient(180deg, transparent, var(--border) 50%, transparent)',
      opacity: 0.4,
    }} />
    <div style={{
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      height: '40%',
      width: '1px',
      background: 'linear-gradient(180deg, transparent, var(--border) 50%, transparent)',
      opacity: 0.4,
    }} />

    {/* Top decorative flourish */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginBottom: '24px',
    }}>
      <div style={{
        width: '50px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border))',
        opacity: 0.5,
      }} />
      <div style={{
        width: '6px',
        height: '6px',
        transform: 'rotate(45deg)',
        border: '1px solid var(--border)',
        opacity: 0.5,
      }} />
      <div style={{
        width: '50px',
        height: '1px',
        background: 'linear-gradient(90deg, var(--border), transparent)',
        opacity: 0.5,
      }} />
    </div>

    <SectionLabel>{t.rsvp.label}</SectionLabel>
    
    <h2 style={{ 
      fontFamily: "'Bickham', Georgia, serif", 
      fontSize: 'clamp(48px,9vw,72px)', 
      color: 'var(--ink)', 
      marginBottom: '16px', 
      fontWeight: 300, 
      letterSpacing: '2px',
      position: 'relative',
      display: 'inline-block',
    }}>
      {t.rsvp.title}
      {/* Decorative underline */}
      <div style={{
        position: 'absolute',
        bottom: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--ink), transparent)',
        opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '5px',
        height: '5px',
        background: 'var(--ink)',
        opacity: 0.4,
        borderRadius: '50%',
      }} />
    </h2>

    {/* Middle decorative flourish */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      margin: '20px 0',
    }}>
      <div style={{
        width: '20px',
        height: '1px',
        background: 'var(--border)',
        opacity: 0.4,
      }} />
      <div style={{
        width: '4px',
        height: '4px',
        background: 'var(--border)',
        opacity: 0.5,
        borderRadius: '50%',
      }} />
      <div style={{
        width: '20px',
        height: '1px',
        background: 'var(--border)',
        opacity: 0.4,
      }} />
    </div>

    <p style={{ 
      fontSize: 'clamp(36px,7vw,54px)', 
      letterSpacing: '1px', 
      color: 'var(--ink)', 
      fontWeight: 300, 
      opacity: 1, 
      fontFamily: "'Bickham', Georgia, serif", 
      margin: '0',
      position: 'relative',
    }}>
      {t.rsvp.sub}
    </p>

    {/* Bottom decorative flourish */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      marginTop: '24px',
    }}>
      <div style={{
        width: '40px',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--border))',
        opacity: 0.4,
      }} />
      <div style={{
        width: '6px',
        height: '6px',
        border: '1px solid var(--border)',
        opacity: 0.5,
        transform: 'rotate(45deg)',
      }} />
      <div style={{
        width: '40px',
        height: '1px',
        background: 'linear-gradient(90deg, var(--border), transparent)',
        opacity: 0.4,
      }} />
    </div>
  </div>
</Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            <div>
              <label style={lbl}>{t.rsvp.nameLabel}</label>
              <input type="text" placeholder={t.rsvp.namePh} value={form.name}
                onChange={(e) => upd('name', e.target.value)} style={inp}
                onFocus={e => e.target.style.borderColor = 'var(--ink)'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.15)'}
              />
            </div>

            <div>
              <label style={lbl}>{t.rsvp.attendLabel}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                {[
                  { v: 'yes', tx: t.rsvp.yes, s: t.rsvp.yesSub },
                  { v: 'no',  tx: t.rsvp.no,  s: t.rsvp.noSub  },
                ].map((o) => (
                  <button key={o.v} onClick={() => upd('attendance', o.v)} style={{
                    padding: '18px 10px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s',
                    background: form.attendance === o.v ? 'var(--ink)' : 'transparent',
                    border: `1px solid ${form.attendance === o.v ? 'var(--ink)' : 'rgba(0,0,0,0.15)'}`,
                    color: form.attendance === o.v ? 'white' : 'var(--ink)',
                  }}>
                    <p style={{ fontSize: '18px', marginBottom: '3px', fontFamily: FONT, fontWeight: 300 }}>{o.tx}</p>
                    <p style={{ fontSize: '14px', opacity: 0.6, fontFamily: FONT, fontWeight: 300 }}>{o.s}</p>
                  </button>
                ))}
              </div>
            </div>

            {form.attendance === 'yes' && (
              <div>
                <label style={lbl}>{t.rsvp.gLabel}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '8px' }}>
                  <button onClick={() => upd('guests', Math.max(1, form.guests - 1))}
                    style={{ width: '42px', height: '42px', border: '1px solid rgba(0,0,0,0.15)', background: 'transparent', cursor: 'pointer', fontSize: '22px', color: 'var(--ink)', fontFamily: FONT }}>−</button>
                  <span style={{ fontFamily: FONT, fontSize: '31px', fontWeight: 300, minWidth: '36px', textAlign: 'center', color: 'var(--ink)' }}>
                    {form.guests}
                  </span>
                  <button onClick={() => upd('guests', Math.min(10, form.guests + 1))}
                    style={{ width: '42px', height: '42px', border: '1px solid rgba(0,0,0,0.15)', background: 'transparent', cursor: 'pointer', fontSize: '22px', color: 'var(--ink)', fontFamily: FONT }}>+</button>
                  <span style={{ fontSize: '16px', opacity: 0.5, fontFamily: FONT, fontWeight: 300 }}>{t.rsvp.gUnit}</span>
                </div>
              </div>
            )}


            {error && <p style={{ fontSize: '16px', color: '#c0392b', textAlign: 'center', fontFamily: FONT }}>{error}</p>}

            <button onClick={submit} disabled={!form.name || !form.attendance || loading} style={{
              width: '100%', padding: '18px',
              background: !form.name || !form.attendance ? 'rgba(0,0,0,0.06)' : 'var(--ink)',
              border: 'none',
              cursor: !form.name || !form.attendance ? 'not-allowed' : 'pointer',
              color: !form.name || !form.attendance ? 'rgba(0,0,0,0.3)' : 'white',
              fontSize: '15px', letterSpacing: '4px', textTransform: 'lowercase',
              fontFamily: FONT, fontWeight: 300, transition: 'all 0.3s',
            }}>
              {loading ? t.rsvp.sending : t.rsvp.submit}
            </button>

          </div>
        </Reveal>
      </div>
    </section>
  );
}