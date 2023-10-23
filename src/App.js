import logo from './logo.svg';
import { useState } from 'react';
import axios from 'axios';

import styles from "./App.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [offer, setOffer] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with form data
    const formData = {
      name,
      email,
      offer,
    };

    axios
      .post('http://localhost:3001/send-email', formData)
      .then((response) => {
        if (response.data.success) {
          setSuccessMessage('Offer sent successfully!');

          // Clear the form fields
          setName('');
          setEmail('');
          setOffer('');

          // Hide the success message after a few seconds
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000); // 5000 milliseconds (5 seconds)
        } else {
          setErrorMessage('Failed to send offer. Please try again later.');
        }
      })
      .catch((error) => {
        setErrorMessage('Failed to send the offer. Please try again later.');
      });
  };


  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.m_left}>
            <div className={styles.heading}>
              <h1>For Sale!</h1>
              <h2>MyDomain.com</h2>
              <div className={styles.para}>Estimated Value <span>$650</span></div>
              <div className={styles.para2}>12 Years old premium domain name available for instantly purchase. Invest in a premium domain name to launch your brand.</div>
              <div className={styles.contact}>
                <div className={styles.left}><FontAwesomeIcon icon="fa-solid fa-phone" />(+91) 11-2142-566
                </div>
                <div className={styles.center}><FontAwesomeIcon icon="fa-solid fa-envelope" style={{ color: "#fcfcfc", }} />info@mydomain.com</div>
                <div className={styles.right}><FontAwesomeIcon icon="fa-solid fa-globe" style={{ color: "#ffffff", }} />More Domains</div>
              </div>
            </div>
          </div>
          <div className={styles.m_right}><div className={styles.form_wrapper}>
            <div className={styles.header}>
              <h2>Make Your offer</h2>
              <h1>Please fill out the form below so that the seller receive your offer.</h1 >
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                placeholder='Enter your name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="number"
                placeholder='Enter your offer'
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                required
              />

              <div>
                <button className={styles.but} type="submit">Send Offer</button>
              </div>
            </form>
            {successMessage && (
              <div className={styles.successMessage} >
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className={styles.errorMessage}>
                {errorMessage}
              </div>
            )}
          </div></div>
        </div>

      </div>
    </div>


  );

}

export default App;
