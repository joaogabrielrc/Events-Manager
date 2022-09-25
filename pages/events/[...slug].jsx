import React, { Fragment } from 'react';

import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
  const { events } = props;

  if (props.hasError) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const { year, month } = props.date;
  const date = new Date(year, month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData.at(0);
  const filteredMonth = filterData.at(1);

  const year = +filteredYear;
  const month = +filteredMonth;

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return {
      props: { hasError: true },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: year,
    month: month,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: year,
        month: month,
      },
    },
  };
}

export default FilteredEventsPage;
