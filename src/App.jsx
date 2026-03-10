import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    attendance: "Приду",
    guests: 1
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
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      });

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addDoc(collection(db, "guests"), {
      ...formData,
      guestsCount: Number(formData.guests),
      created: new Date()
    });

    setIsSubmitted(true);

  };

  return (
    <div className="wrapper">

      <div className="ornament-top"></div>

      <section className="hero">

        <p className="invite">Свадебное приглашение</p>

        <h1>Райымбек <span>&</span> Жансая</h1>

        <p className="date">28 июня 2026</p>

      </section>

      <section className="timer-section">

        <h3>До свадьбы осталось</h3>

        <div className="timer">

          <div>
            <span>{timeLeft.days || 0}</span>
            <p>дней</p>
          </div>

          <div>
            <span>{timeLeft.hours || 0}</span>
            <p>часов</p>
          </div>

          <div>
            <span>{timeLeft.minutes || 0}</span>
            <p>минут</p>
          </div>

        </div>

      </section>

      {!isSubmitted ? (

        <form className="form" onSubmit={handleSubmit}>

          <h3>Подтвердите присутствие</h3>

          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
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
              Да, приду
            </label>

            <label>
              <input
                type="radio"
                name="attendance"
                value="Не приду"
                checked={formData.attendance === "Не приду"}
                onChange={handleChange}
              />
              Не смогу
            </label>

          </div>

          <input
            type="number"
            name="guests"
            min="0"
            placeholder="Сколько гостей с вами?"
            value={formData.guests}
            onChange={handleChange}
          />

          <button type="submit">Отправить</button>

        </form>

      ) : (

        <div className="thanks">
          Спасибо! Будем ждать вас ❤️
        </div>

      )}

      <section className="location">

        <h3>Место проведения</h3>

        <p>Алматы, Ziyafet Meat House</p>

        <div className="map">

          <iframe
            src="https://www.google.com/maps?q=43.305975,77.04876&hl=ru&z=15&output=embed"
            width="100%"
            height="300"
            loading="lazy"
            title="map"
          />

        </div>

        <a
          className="map-btn"
          href="https://2gis.kz/almaty/firm/70000001054095105"
          target="_blank"
        >
          Открыть в 2GIS
        </a>

      </section>

      <div className="ornament-bottom"></div>

    </div>
  );
}

export default App;