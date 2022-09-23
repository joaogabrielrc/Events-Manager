import React from 'react';
import Link from 'next/link';

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
    <li>
      <img src={'/' + image} alt={title} />
      <div>
        <div>
          <h2>{title}</h2>
          <div>
            <time>{date}</time>
          </div>
          <div>
            <address>{address}</address>
          </div>
          <div>
            <Link href={exploreLink}>Explore Events</Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
