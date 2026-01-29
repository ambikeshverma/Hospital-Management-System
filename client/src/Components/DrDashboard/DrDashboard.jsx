import React from 'react'
import styles from './DrDashboard.module.css'
import { StatsRingCard } from '../StatsRingCard/StatsRingCard'
import { TableScrollArea } from '../TableScrollArea/TableScrollArea'
import { StatsGrid } from '../StatsGrid/StatsGrid'

const DrDashboard = () => {
  return (
   <>
   <div className={styles.mainCard}>
            <div className={styles.h3}>Wellcome</div>
            <div className={styles.h1}>Dotor</div>
            <div className={styles.p}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio explicabo sunt ad placeat amet aperiam ipsam, eveniet vitae cupiditate maxime!</div>
            <button>Your Appointment</button>
           </div>
           <div className={styles.statsGridWrapper}>
                 <StatsGrid></StatsGrid>
           </div>
           <div className={styles.wrapper2}>
                <StatsRingCard></StatsRingCard>
                <TableScrollArea></TableScrollArea>
           </div>
   </>
  )
}

export default DrDashboard