import React, { useContext, useRef } from 'react';

import styles from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationContext = useContext(NotificationContext);

  const registrationHandler = event => {
    event.preventDefault();

    const email = emailInputRef.current.value;

    notificationContext.showNotification({
      title: 'Signing up...',
      message: 'Registering for newslatter.',
      status: 'pending',
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    };

    fetch('/api/v1/newsletter', requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then(data => {
          throw new Error();
        });
      })
      .then(data => {
        notificationContext.showNotification({
          title: 'Success!',
          message: 'Seccessfully registered for newslatter.',
          status: 'success',
        });
      })
      .catch(error => {
        notificationContext.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
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
