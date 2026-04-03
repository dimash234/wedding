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
    fontSize: '16px', color: 'var(--ink)', outline: 'none',
    transition: 'border-color 0.3s', fontWeight: 300, letterSpacing: '0.3px',
  };

  const lbl = {
    display: 'block', fontSize: '13px', letterSpacing: '3px',
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
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <SectionLabel>{t.rsvp.label}</SectionLabel>
            <h2 style={{ fontFamily: "'Bickham', Georgia, serif", fontSize: 'clamp(26px,5vw,38px)', color: 'var(--ink)', marginBottom: '10px', fontWeight: 300, letterSpacing: '2px' }}>
              {t.rsvp.title}
            </h2>
            <p style={{ fontSize: '18px', letterSpacing: '1px', color: 'var(--ink)', fontWeight: 300, opacity: 0.8, fontFamily: "'Bickham', Georgia, serif", margin: '0' }}>
              {t.rsvp.sub}
            </p>
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
                    <p style={{ fontSize: '15px', marginBottom: '3px', fontFamily: FONT, fontWeight: 300 }}>{o.tx}</p>
                    <p style={{ fontSize: '11px', opacity: 0.6, fontFamily: FONT, fontWeight: 300 }}>{o.s}</p>
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
                  <span style={{ fontFamily: FONT, fontSize: '28px', fontWeight: 300, minWidth: '36px', textAlign: 'center', color: 'var(--ink)' }}>
                    {form.guests}
                  </span>
                  <button onClick={() => upd('guests', Math.min(10, form.guests + 1))}
                    style={{ width: '42px', height: '42px', border: '1px solid rgba(0,0,0,0.15)', background: 'transparent', cursor: 'pointer', fontSize: '22px', color: 'var(--ink)', fontFamily: FONT }}>+</button>
                  <span style={{ fontSize: '13px', opacity: 0.5, fontFamily: FONT, fontWeight: 300 }}>{t.rsvp.gUnit}</span>
                </div>
              </div>
            )}


            {error && <p style={{ fontSize: '13px', color: '#c0392b', textAlign: 'center', fontFamily: FONT }}>{error}</p>}

            <button onClick={submit} disabled={!form.name || !form.attendance || loading} style={{
              width: '100%', padding: '18px',
              background: !form.name || !form.attendance ? 'rgba(0,0,0,0.06)' : 'var(--ink)',
              border: 'none',
              cursor: !form.name || !form.attendance ? 'not-allowed' : 'pointer',
              color: !form.name || !form.attendance ? 'rgba(0,0,0,0.3)' : 'white',
              fontSize: '12px', letterSpacing: '4px', textTransform: 'lowercase',
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