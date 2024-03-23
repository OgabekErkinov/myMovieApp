import './popular.css'
import {Swiper, SwiperSlide} from "swiper/react"
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { privateApi } from '../../services/Axios'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { imageUrl } from '../../utils/imageUrl';
import SecondLoader from '../secondLoader/SecondLoader';


const Popular = () => {

    const [popLoading , setPopLoading] = useState(false)
    const [popularMovies , setPopularMovies] = useState([])
    
    const getData = async () => {
                 try {
                     setPopLoading(true)
                     const response = await privateApi.get('/movie/popular')
                     setPopLoading(false)
                     setPopularMovies(response.results)
                     }   
                catch (error) {
                    //  setPopLoading(false)   
                     }}
    useEffect(()=>{
        getData()
    },[])


  return (<>
    {!popLoading ? 
    <Swiper
    modules={[Navigation, Pagination, Autoplay]}
    spaceBetween={50}
    slidesPerView={1}
    navigation
    pagination={{
        dynamicBullets: true,
      }}
    loop
    autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    className="mySwiper"

  >
    {popularMovies?.slice(0,10).map((item,idx)=>{
        return <SwiperSlide className="swiperItem" key={idx}>
                      <img src={`${imageUrl.img500}${item?.backdrop_path}`} alt="rasmcha" />
                      <div className="infoMovie">
                          <h1 className="title">{item?.title}</h1>
                          <p className="aboutMovie">{`${item?.overview.slice(0,50)} . . .`}</p>
                          <div className="directToMovie">
                                     <div className="showData">{item?.release_date.replaceAll("-","/")}</div>
                                          <Link to = {`/chosenMoviePage/${item?.title?.replaceAll(" ",'-').toLowerCase()}-${item?.id}`}>
                                                <button className='singleButton'>
                                                    show more
                                               </button>
                                          </Link>          
                                     </div>
                         </div> 
              </SwiperSlide>

    })}
  </Swiper>  :     <Swiper
                     modules={[Navigation, Pagination, Autoplay]}
                     spaceBetween={50}
                     slidesPerView={1}
                     navigation
                     pagination={{
                       dynamicBullets: true,
                                 }}
                    loop
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                               }}
                     className="mySwiper"
                  >
                    <SwiperSlide><SecondLoader count={1}/></SwiperSlide>
                    <SwiperSlide><SecondLoader count={1}/></SwiperSlide>
                    <SwiperSlide><SecondLoader count={1}/></SwiperSlide></Swiper>} </>
  )
}

export default Popular