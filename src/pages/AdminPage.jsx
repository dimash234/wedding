import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const ADMIN_PASSWORD = 'admin2026';
const STORAGE_KEY = 'wedding_admin_auth';

export default function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === 'true');
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const login = () => {
    if (input === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setAuthed(true);
    } else {
      setShake(true);
      setInput('');
      setTimeout(() => setShake(false), 600);
    }
  };

  if (!authed)
    return (
      <LoginScreen
        input={input}
        setInput={setInput}
        shake={shake}
        revealed={revealed}
        setRevealed={setRevealed}
        onSubmit={login}
      />
    );
  return (
    <Dashboard
      onLogout={() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setAuthed(false);
      }}
    />
  );
}

function LoginScreen({ input, setInput, shake, revealed, setRevealed, onSubmit }) {
  return (
    <div
      style={{
        minHeight: '100svh',
        background: '#FAFAF8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        fontFamily: "'Jost',sans-serif",
      }}
    >
      <div
        style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom,transparent,#D4B483)',
          marginBottom: '32px',
        }}
      />
      <p
        style={{
          fontFamily: "'Bodoni Moda',serif",
          fontSize: '28px',
          fontWeight: 300,
          fontStyle: 'italic',
          letterSpacing: '4px',
          color: '#1A1410',
          marginBottom: '6px',
        }}
      >
        Р ✦ Ж
      </p>
      <p style={{ fontSize: '9px', letterSpacing: '5px', color: '#1A1410', opacity: 0.4, marginBottom: '40px' }}>
        панель басшысы
      </p>

      <div
        style={{
          width: '100%',
          maxWidth: '300px',
          animation: shake ? 'shakeGate 0.5s ease' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ position: 'relative', borderBottom: '1.5px solid rgba(0,0,0,0.18)' }}>
          <input
            type={revealed ? 'text' : 'password'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
            placeholder="············"
            autoComplete="off"
            style={{
              width: '100%',
              padding: '12px 36px 12px 0',
              border: 'none',
              background: 'transparent',
              fontFamily: "'Jost',sans-serif",
              fontSize: '15px',
              letterSpacing: '3px',
              color: '#1A1410',
              outline: 'none',
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          />
          <button
            onClick={() => setRevealed((r) => !r)}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              opacity: 0.4,
            }}
          >
            {revealed ? '🙈' : '👁'}
          </button>
        </div>

        <button
          onClick={onSubmit}
          disabled={!input.trim()}
          style={{
            padding: '14px',
            background: input.trim() ? '#1A1410' : 'rgba(0,0,0,0.06)',
            border: 'none',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            color: input.trim() ? 'white' : 'rgba(0,0,0,0.25)',
            fontSize: '9.5px',
            letterSpacing: '4px',
            textTransform: 'lowercase',
            fontFamily: "'Jost',sans-serif",
            fontWeight: 300,
            transition: 'all 0.3s',
          }}
        >
          кіру
        </button>
      </div>

      <div
        style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom,#D4B483,transparent)',
          marginTop: '36px',
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@1,6..96,300&family=Jost:wght@300;400&display=swap');
        @keyframes shakeGate { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchGuests = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'rsvp'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setGuests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  const del = async (id) => {
    if (!confirm('Удалить запись?')) return;
    await deleteDoc(doc(db, 'rsvp', id));
    setGuests((prev) => prev.filter((g) => g.id !== id));
  };

  const filtered = guests.filter((g) => {
    if (filter === 'yes') return g.attendance === 'yes';
    if (filter === 'no') return g.attendance === 'no';
    return true;
  });

  const total = guests.filter((g) => g.attendance === 'yes').reduce((acc, curr) => acc + (Number(curr.guests) || 0), 0);

  return (
    <div
      style={{
        minHeight: '100svh',
        background: '#F5F5F3',
        fontFamily: "'Jost', sans-serif",
        padding: '40px 20px',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Bodoni Moda', serif",
                fontSize: '32px',
                fontWeight: 300,
                margin: 0,
                letterSpacing: '2px',
              }}
            >
              Қонақтар тізімі
            </h1>
            <p style={{ margin: '8px 0 0', opacity: 0.5, fontSize: '13px', letterSpacing: '1px' }}>
              жалпы саны: {total} адам (+ {guests.filter((g) => g.attendance === 'yes').length} отбасы)
            </p>
          </div>
          <button
            onClick={onLogout}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'lowercase',
              opacity: 0.4,
            }}
          >
            шығу
          </button>
        </header>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          {['all', 'yes', 'no'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(0,0,0,0.1)',
                background: filter === f ? '#1A1410' : 'white',
                color: filter === f ? 'white' : '#1A1410',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            >
              {f === 'all' ? 'барлығы' : f === 'yes' ? 'келетіндер' : 'келмейтіндер'}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>жүктелуде...</p>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {filtered.map((g) => (
              <div
                key={g.id}
                style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: g.attendance === 'yes' ? '#27ae60' : '#e74c3c',
                      }}
                    />
                    <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 400 }}>{g.name}</h3>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', opacity: 0.5 }}>
                    {g.attendance === 'yes' ? `қонақтар: ${g.guests}` : 'өкінішке орай, келе алмайды'}
                  </p>
                </div>
                <button
                  onClick={() => del(g.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    opacity: 0.2,
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
