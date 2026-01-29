import React from 'react'
import styles from './PageNotFound.module.css'

const PageNotFound = () => {
  return (
    <div className={styles.notFound}>
          <img src="/Assets/404-page-not-found.jpg" width="400px" alt="" />
          <h5 className={styles.link}>Back to the home</h5>
    </div>
  )
}

export default PageNotFound