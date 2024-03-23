import './topRated.css'
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Movie } from "../../services/service.Api"
import MyLoading from "../loading/MyLoading"
import { imageUrl } from "../../utils/imageUrl";
import { Link } from "react-router-dom";
import SecondLoader from '../secondLoader/SecondLoader';


const TopRated = () => {
    const [rated_image, setRated] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getTopMovies = async () =>{
      setIsLoading(true)
      const movies = await new Movie().getTopData()
      setIsLoading(false)
      setRated(movies)
    }

    useEffect(()=>{
      getTopMovies()
    },[])
  return (
    
    <div className="topRated_container">
      {!isLoading ? 
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
    modules={[ Pagination, Autoplay]}
    spaceBetween={30}
    slidesPerView={4}
    // navigation
    // pagination={{
    //     dynamicBullets: true,
    //            }}
    loop
    autoplay={{
        delay : 3000,
        disableOnInteraction: false,
              }}
    className="ratedSwiper"
  >
    {rated_image?.slice(0,10).map((item,idx)=>{
        return  <SwiperSlide className="ratedItem" key={idx}>
                            <Link to = {`/chosenMoviePage/${item?.title?.replaceAll(" ",'-').toLowerCase()}-${item?.id}`}>
                                    <img src={`${imageUrl.img500}${item?.backdrop_path}`} alt="image" />
                                    <h3 className="movieTitle">{item?.title}</h3>                             
                            </Link>
               </SwiperSlide>
    })}
  </Swiper>  : <SecondLoader count={5}/>}
    </div>
  )
}

export default TopRated