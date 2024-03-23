import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { privateApi } from "../../services/Axios"
import './upcoming.css'
import { imageUrl } from "../../utils/imageUrl";
import SecondLoader from "../secondLoader/SecondLoader";

const Upcoming = () => {

    const [upcomingMovie, setUpcomingMovie] = useState([])
    const [upLoading, setUpLoading] = useState(false)


    const upcomingMovies = async () => {
        setUpLoading(true)
        const response = await privateApi.get('movie/upcoming')
        setUpLoading(false)
        setUpcomingMovie(response?.results)
    }

    useEffect(()=>{
        upcomingMovies()
    },[])

  return (
<div className="upcoming_container">
  {!upLoading ? 
        <Swiper
        breakpoints={{
          240:{
            slidesPerView : 1
          },
          426 : {
            slidesPerView : 2

          },
          540 : {
            slidesPerView : 3
          },
          750 : {
            slidesPerView : 4
          }

        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        loop
        autoplay={{
            delay: 3500,
           disableOnInteraction: false,
        }}
        className="upcomingSwiper"
      >

        {upcomingMovie?.slice(1,10).map((el,idx)=>{
            return <SwiperSlide key={idx} className='upcoming_item'>
                         <Link to={`/chosenMoviePage/${el?.title?.replaceAll(" ",'-').toLowerCase()}-${el?.id}`}>
                            <img src={`${imageUrl.img500}${el?.backdrop_path}`} alt="image" />
                            <h3 className="upMovieName">{el.title}</h3>
                         </Link>

                  </SwiperSlide>
   } )}
      </Swiper> : <SecondLoader count={5}/> }
        </div>
  )
}

export default Upcoming