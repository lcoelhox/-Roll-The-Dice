import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL_HOME } from '../utils/strings';
import { format } from 'date-fns';
import '../styles/MainPage.css';

export default function MainPage() {
  const [lastClickTime, setLastClickTime] = useState(null);
  const [active, setActive] = useState(false);

  const handleButtonClick = () => {
    const date = new Date().getTime()
    const formartDate = format(date, 'dd/MM/yyyy HH:mm:ss');

    if (lastClickTime === null) {
      setLastClickTime(formartDate);
      setActive(true);
    } else {
      const currentTime = formartDate;
      const time = currentTime - lastClickTime;

      axios.post(API_URL_HOME, { time })
        .then(response => {
          console.log(response.data);
          setLastClickTime(null);
          setActive(false);
        })
        .catch(err => {
          console.error(err);
          setLastClickTime(null);
          setActive(false);
        });
    }
  };

  return (
      <div className="container">
        <h1 className="text-center mt-5">Fast Double Click</h1>
        <div className="row justify-content-center">
            <div className={`button-double-click ${active ? 'active' : ''}`}>
            <button
              className="btn btn-primary btn-lg btn-block"
              id="btn1"
              onClick={handleButtonClick}>Double Click</button>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="button-redirect">
            <Link
              to="/records">
              <button
              className="btn btn-secondary btn-lg btn-block"
              id="btn-redirect"
              >List Records
              </button>
            </Link>
          </div>
        </div>
      </div>
  );
}
