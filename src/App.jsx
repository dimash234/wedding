import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // Предполагаю, что firebase настроен
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    attendance: "Приду",
    guests: 1,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("June 28, 2026 18:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return; // Простая валидация

    await addDoc(collection(db, "guests"), {
      ...formData,
      guestsCount: Number(formData.guests),
      created: new Date(),
    });

    setIsSubmitted(true);
  };

  return (
    <div className="wrapper">
      <div className="ornament-top"></div>

      <section className="hero">
        <p className="invite">Қазақша үйлену тойына шақыру</p> {/* Добавил казахский для аутентичности, можно изменить */}
        <h1>Райымбек <span>&</span> Жансая</h1>
        <p className="date">28 июня 2026</p>
      </section>

      <div className="ornament-border"></div> {/* Новый орнамент-бордюр */}

      <section className="timer-section">
        <h3>Тойға дейін қалды</h3>
        <div className="timer">
          <div>
            <span>{timeLeft.days || 0}</span>
            <p>күн</p>
          </div>
          <div>
            <span>{timeLeft.hours || 0}</span>
            <p>сағат</p>
          </div>
          <div>
            <span>{timeLeft.minutes || 0}</span>
            <p>минут</p>
          </div>
          <div>
            <span>{timeLeft.seconds || 0}</span>
            <p>секунд</p>
          </div>
        </div>
      </section>

      <div className="ornament-border"></div> {/* Ещё один бордюр */}

      {!isSubmitted ? (
        <form className="form" onSubmit={handleSubmit}>
          <h3>Қатысуыңызды растаңыз</h3>
          <input
            type="text"
            name="name"
            placeholder="Атыңыз"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <div className="radio">
            <label>
              <input
                type="radio"
                name="attendance"
                value="Приду"
                checked={formData.attendance === "Приду"}
                onChange={handleChange}
              />
              Иә, келемін
            </label>
            <label>
              <input
                type="radio"
                name="attendance"
                value="Не приду"
                checked={formData.attendance === "Не приду"}
                onChange={handleChange}
              />
              Келе алмаймын
            </label>
          </div>

          <input
            type="number"
            name="guests"
            min="0"
            placeholder="Сізбен бірге қанша адам келеді?"
            value={formData.guests}
            onChange={handleChange}
          />

          <button type="submit">Жіберу</button>
        </form>
      ) : (
        <div className="thanks">
          Рақмет! Сізді күтеміз ❤️
        </div>
      )}

      <section className="location">
        <h3>Өтетін орны</h3>
        <p>Алматы, Ziyafet Meat House</p>
        <div className="map">
          {/* Static 2GIS map (замените YOUR_API_KEY на свой ключ с dev.2gis.com) */}
          <img
            src="https://static.maps.2gis.com/2.0?s=600x300&c=43.305975,77.04876&z=15&key=YOUR_API_KEY"
            alt="Карта Ziyafet Meat House"
            loading="lazy"
          />
        </div>
        <a
          className="map-btn"
          href="https://2gis.kz/almaty/firm/70000001054095105"
          target="_blank"
          rel="noopener noreferrer"
        >
          2GIS-те ашу
        </a>
      </section>

      <div className="ornament-bottom"></div>
    </div>
  );
}

export default App;