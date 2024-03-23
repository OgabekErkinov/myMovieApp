import './homePage.css'
import Popular from "../../components/popularMovies/Popular"
import TopRated from "../../components/topRated/TopRated"
import HeaderSection from '../../components/sectionHeader/HeaderSection'
import Upcoming from '../../components/upcoming/Upcoming'

const HomePage = () => {
  return (
    <div className="homePage_container">
      <HeaderSection sectionTitle={'Premiere'}/>
      <Popular/>
      <HeaderSection sectionTitle={'Upcoming'}/>
      <Upcoming/>
      <HeaderSection sectionTitle={'TopRated'}/>
      <TopRated/>
    </div>
    
  )
}

export default HomePage