import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'Приду',
    guests: 0
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Сохраняем в коллекцию 'guests' в Firestore
      await addDoc(collection(db, "guests"), {
        name: formData.name,
        attendance: formData.attendance,
        guestsCount: Number(formData.guests),
        timestamp: new Date()
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Ошибка при отправке: ", error);
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      {/* Казахский орнамент */}
      <svg className="ornament" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,10 C40,10 35,20 35,30 C35,40 45,45 50,55 C55,45 65,40 65,30 C65,20 60,10 50,10 Z M50,90 C60,90 65,80 65,70 C65,60 55,55 50,45 C45,55 35,60 35,70 C35,80 40,90 50,90 Z M10,50 C10,40 20,35 30,35 C40,35 45,45 55,50 C45,55 40,65 30,65 C20,65 10,60 10,50 Z M90,50 C90,60 80,65 70,65 C60,65 55,55 45,50 C55,45 60,35 70,35 C80,35 90,40 90,50 Z" />
      </svg>

      <header className="header">
        <h1>Райымбек & Жансая</h1>
        <h2>Үйлену тойы / Свадьба</h2>
        <p>Дорогие родные и друзья!<br/>Мы с радостью приглашаем вас разделить с нами один из самых важных дней в нашей жизни.</p>
      </header>

      {!isSubmitted ? (
        <form className="rsvp-form" onSubmit={handleSubmit}>
          <h3>Подтвердите ваше присутствие</h3>
          
          <div className="form-group">
            <label>Ваше имя и фамилия:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Например: Арман Сериков" />
          </div>

          <div className="form-group">
            <label>Сможете ли вы прийти?</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="attendance" value="Приду" checked={formData.attendance === 'Приду'} onChange={handleChange} />
                С удовольствием приду
              </label>
              <label>
                <input type="radio" name="attendance" value="Не приду" checked={formData.attendance === 'Не приду'} onChange={handleChange} />
                К сожалению, не смогу
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Сколько человек придет с вами? (включая детей)</label>
            <input type="number" name="guests" min="0" max="10" value={formData.guests} onChange={handleChange} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Отправка...' : 'Отправить ответ'}
          </button>
        </form>
      ) : (
        <div className="success-message">
          <h3>Көп рахмет! Спасибо!</h3>
          <p>Ваш ответ успешно записан.</p>
        </div>
      )}

      <div className="map-section">
        <h3>Ждем вас по адресу:</h3>
        <p>Нажмите на кнопку ниже, чтобы открыть маршрут.</p>
        <a href="https://2gis.kz/almaty/firm/70000001054095105/77.04876%2C43.305975" target="_blank" rel="noopener noreferrer" className="btn-map">
          Открыть карту в 2GIS
        </a>
      </div>
    </div>
  );
}

export default App;