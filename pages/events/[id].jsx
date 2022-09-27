import React, { Fragment } from 'react';
import Head from 'next/head';

import {
  getEventById,
  getFeaturedEvents,
} from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const { event } = props;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>      
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          name="description"
          content={event.description}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();

  const paths = allEvents.map((event) => ({
    params: { id: event.id },
  }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const event = await getEventById(id);

  return {
    props: {
      event: event,
    },
    revalidate: 10,
  };
}

export default EventDetailPage;
