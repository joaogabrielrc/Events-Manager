import React from 'react';
import Head from 'next/head';

import EventList from '../client/components/events/event-list';
import { getFeaturedEvents } from '../client/helpers/api-util';
import NewsletterRegistration from '../client/components/input/newsletter-registration';

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to envolve..."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 600,
  };
}

export default HomePage;
