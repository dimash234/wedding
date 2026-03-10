import { useState, useEffect } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ name: '', attendance: 'Приду', guests: 0 });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Состояние для таймера
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("June 28, 2026 00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });

      if (distance < 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "guests"), {
        ...formData,
        guestsCount: Number(formData.guests),
        timestamp: new Date()
      });
      setIsSubmitted(true);
    } catch (e) { alert("Ошибка при отправке"); }
    setLoading(false);
  };

  return (
    <div className="main-wrapper">
      <div className="content-card">
        <svg className="ornament-top" viewBox="0 0 100 100">
          <path d="M50,10 C40,10 35,20 35,30 C35,40 45,45 50,55 C55,45 65,40 65,30 C65,20 60,10 50,10 Z M50,90 C60,90 65,80 65,70 C65,60 55,55 50,45 C45,55 35,60 35,70 C35,80 40,90 50,90 Z" />
        </svg>

        <header className="hero-section">
          <p className="sub-title">Приглашение на свадьбу</p>
          <h1>Райымбек & Жансая</h1>
          <div className="divider"><span>28.06.2026</span></div>
        </header>

        <section className="timer-container">
          <h3>До торжества осталось:</h3>
          <div className="timer">
            <div className="timer-item"><span>{timeLeft.days || '0'}</span><label>дней</label></div>
            <div className="timer-item"><span>{timeLeft.hours || '0'}</span><label>часов</label></div>
            <div className="timer-item"><span>{timeLeft.minutes || '0'}</span><label>минут</label></div>
          </div>
        </section>

        {!isSubmitted ? (
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <h3 className="centered-h3">Вы придете?</h3>
            <input type="text" name="name" placeholder="Ваше Имя" value={formData.name} onChange={handleChange} required />
            
            <div className="radio-container">
              <label><input type="radio" name="attendance" value="Приду" checked={formData.attendance === 'Приду'} onChange={handleChange} /> Да, приду</label>
              <label><input type="radio" name="attendance" value="Не приду" checked={formData.attendance === 'Не приду'} onChange={handleChange} /> Не смогу</label>
            </div>

            <input type="number" name="guests" placeholder="Количество гостей" min="0" value={formData.guests} onChange={handleChange} />
            <button type="submit" disabled={loading}>{loading ? 'Загрузка...' : 'Отправить'}</button>
          </form>
        ) : (
          <div className="success-msg">Ждем вас! Көп рахмет!</div>
        )}

        <div className="location-info">
          <h3>Место проведения</h3>
          <p>г. Алматы</p>
          <a href="https://2gis.kz/almaty/firm/70000001054095105/77.04876%2C43.305975" target="_blank" className="btn-secondary">Открыть в 2GIS</a>
        </div>
      </div>
    </div>
  );
}

export default App;