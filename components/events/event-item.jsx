import React from 'react';
import Link from 'next/link';
import styles from './event-item.module.css'

function EventItem(props) {
  const { id, title, image, location } = props;
  const date = new Date(props.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const address = location.replace(', ', '\n');
  const exploreLink = `events/${id}`  

  return (
    <li className={styles.item}>
      <img src={'/' + image} alt={title} />
      <div>
        <div className={styles.content}>
          <h2>{title}</h2>
          <div>
            <time className={styles.date}>{date}</time>
          </div>
          <div>
            <address className={styles.address}>{address}</address>
          </div>
          <div className={styles.actions}>
            <Link href={exploreLink}>Explore Events</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
