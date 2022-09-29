import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import EventList from '../../client/components/events/event-list';
import EventsSearch from '../../client/components/events/events-search';
import { getAllEvents } from '../../client/helpers/api-util';

function EventsPage(props) {
  const router = useRouter();
  const { events } = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to envolve..."
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

export default EventsPage;
