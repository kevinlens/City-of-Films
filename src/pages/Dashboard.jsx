import React from 'react'
import BarChart from '../components/UI/DashboardData/BarChart'
import RadarChart from '../components/UI/DashboardData/RadarChart'
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={`${styles.dashboard}`}>
      <section className='w-[36rem] flex'>
      <BarChart />
      <RadarChart />
      </section>
    </div>
  )
}

export default Dashboard