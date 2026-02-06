import React from 'react'
import PrimarySearchAppBar from '../../Components/NavBar/Navbar'
import styles from './AboutPage.module.css'
import Footer from '../../Components/Footer/Footer'

const AboutPage = () => {
  return (
    <>
    <PrimarySearchAppBar></PrimarySearchAppBar>
    <div className={styles.aboutPage}>
        <div className={styles.notFound}>
                  <img src="/Assets/404-page-not-found.jpg" width="400px" alt="" />
                  <h5 className={styles.link}>Open Modal</h5>
        </div>
   </div>
    <Footer></Footer>
    </>
  )
}

export default AboutPage