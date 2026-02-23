import { useState } from "react";
import styles from './Home.module.css'
import PrimarySearchAppBar from '../../Components/NavBar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { LeadGrid } from '../../Components/LeadGrid/LeadGrid'
import { DoctorsCard } from '../../Components/DoctorsCard/DoctorsCard'
import CardSkeleton from '../../Components/SimmerEffect/CardSkeleton'
import { HeroImageRight } from '../../Components/HeroImageRight/HeroImageRight'
import { FeaturesCards } from '../../Components/FeatureCard/FeaturesCards'
import { GetInTouch } from '../../Components/GetInTouch/GetInTouch'
import SymptomCheckerModal from '../../Components/SymptomCheckerModal/SymptomCheckerModal';

const Home = () => {
   const [opened, setOpened] = useState(false);
  return (
    <>
    <PrimarySearchAppBar openModel = {open}></PrimarySearchAppBar>
    <HeroImageRight></HeroImageRight>
    <div className={styles.homePage}>
      <button onClick={() => setOpened(true)} className={styles.floatingBtn}>Check Symptoms</button>
      <SymptomCheckerModal  opened={opened} onClose={() => setOpened(false)}></SymptomCheckerModal>
         <LeadGrid></LeadGrid>
         <FeaturesCards></FeaturesCards>
         <GetInTouch></GetInTouch>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Home