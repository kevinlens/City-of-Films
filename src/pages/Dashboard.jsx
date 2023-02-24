import React from 'react';

//DATA CHART
import BarChart from '../components/UI/DashboardData/BarChart';
import RadarChart from '../components/UI/DashboardData/RadarChart';
import ChoroplethChart from '../components/UI/DashboardData/ChoroplethChart/ChoroplethChart';

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={`${styles.dashboard} pb-20`}>
      <section className='flex items-center place-content-evenly'>
        <BarChart />
        <RadarChart />
      </section>
      <section className='w-[42rem] h-[28rem] mx-auto'>
        <h1 className='text-center text-3xl'>
        Countries and their Number of Aired TV Shows in 2022
        </h1>
        <ChoroplethChart />
      </section>
    </div>
  );
};

export default Dashboard;
