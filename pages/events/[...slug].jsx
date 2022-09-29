import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import EventList from '../../client/components/events/event-list';
import ResultsTitle from '../../client/components/events/results-title';
import Button from '../../client/components/ui/button';
import ErrorAlert from '../../client/components/ui/error-alert';

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();

  const filterData = router.query.slug;

  useEffect(async () => {
    const response = await fetch(
      'https://react-getting-started-d3117-default-rtdb.firebaseio.com/events.json'
    );
    const data = await response.json();

    const events = [];

    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }

    setLoadedEvents(events);
  }, []);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={'A list of filtered events.'}
      />
    </Head>
  );

  if (!loadedEvents || !filterData) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = filterData.at(0);
  const filteredMonth = filterData.at(1);

  const year = +filteredYear;
  const month = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${month}/${year}`}
      />
    </Head>
  );

  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <div className="center">
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year &&
      eventDate.getMonth() === month - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="center">
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData.at(0);
//   const filteredMonth = filterData.at(1);

//   const year = +filteredYear;
//   const month = +filteredMonth;

//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: year,
//     month: month,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: year,
//         month: month,
//       },
//     },
//   };
// }

export default FilteredEventsPage;
