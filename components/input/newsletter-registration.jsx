import React, { useRef } from 'react';
import styles from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const emailInputRef = useRef();

  const registrationHandler = async event => {
    event.preventDefault();

    const email = emailInputRef.current.value;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(email),
    };

    const response = await fetch(
      '/api/v1/newsletter',
      requestOptions
    );
    const data = await response.json();

    console.log(data);
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            ref={emailInputRef}
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
