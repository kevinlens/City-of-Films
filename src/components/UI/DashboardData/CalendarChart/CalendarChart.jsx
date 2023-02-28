//BUILT-IN REACT HOOKS
import React, { useState, useEffect } from 'react';

import { ResponsiveCalendar } from '@nivo/calendar';

const CalendarChart = ({
  movieCollectionsFor2021,
  movieCollectionsFor2022,
}) => {
  const [calendarData, setCalendarData] = useState([
    {
      value: 0,
      day: '2021-05-28',
    },
    {
      value: 0,
      day: '2021-04-03',
    },
    {
      value: 0,
      day: '2021-08-28',
    },
  ]);

  useEffect(() => {
    if (
      movieCollectionsFor2021.length > 0 &&
      movieCollectionsFor2022.length > 0
    ) {
      let calendarDate = [...calendarData];

      movieCollectionsFor2021.forEach(({ release_date }) => {
        const matchingObj = calendarDate.find(
          ({ day }) => day === release_date
        );
        if (matchingObj) {
          matchingObj.value += 1;
        } else {
          calendarDate.push({ value: 1, day: release_date });
        }
      });

      movieCollectionsFor2022.forEach(({ release_date }) => {
        const matchingObj = calendarDate.find(
          ({ day }) => day === release_date
        );
        if (matchingObj) {
          matchingObj.value += 1;
        } else {
          calendarDate.push({ value: 1, day: release_date });
        }
      });

      // movieCollectionsFor2021.map((item) => {
      //   calendarDate.forEach((date, i) => {
      //     if (date.day === item.release_date) {
      //       calendarDate[i].value++;
      //     } else {
      //       calendarData.push({
      //         value: 1,
      //         day: item.release_date,
      //       });
      //     }
      //   });
      // });

      setCalendarData(calendarDate);
    }
  }, [movieCollectionsFor2021, movieCollectionsFor2022]);

  return (
    <div>
      <h1 className='text-center text-3xl'>
        Calendar of Movie Contributions Throughout the Years
      </h1>
      <section className='w-[44rem] h-[20rem] mx-auto'>
        <ResponsiveCalendar
          data={calendarData}
          from='2021-03-01'
          to='2022-07-12'
          emptyColor='#eeeeee'
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          yearSpacing={40}
          margin={{ left: 30}}
          yearLegendOffset={4}
          monthBorderColor='#ffffff'
          dayBorderWidth={2}
          maxValue={100}
          dayBorderColor='#ffffff'
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 10,
              translateX: -35,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      </section>
    </div>
  );
};

export default CalendarChart;
