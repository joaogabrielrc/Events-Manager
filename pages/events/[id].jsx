import React, { Fragment } from 'react';
import {
  getAllEvents,
  getEventById,
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
  const allEvents = await getAllEvents();

  const paths = allEvents.map((event) => ({
    params: { id: event.id },
  }));

  return {
    paths: paths,
    fallback: false
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const event = await getEventById(id);

  return {
    props: {
      event: event,
    },
  };
}

export default EventDetailPage;
