import { useEffect, useState } from 'react'
import './chosenMovie.css'
import { imageUrl } from '../../utils/imageUrl'
import { useParams } from 'react-router'
import { privateApi } from '../../services/Axios'
import DoubleColumn from '../../components/helperRow/doubleColumn'
import Square from '../../components/squareComponent/Square'
import SecondLoader from '../../components/secondLoader/SecondLoader'


const ChosenMoviePage = () => {
  const [myMovie, setMyMovie] = useState({})
  const [genre, setGenre] = useState([])
  const [companies, setCompanies] = useState([])
  const [chooseLoading, setChooseLoading] = useState(false)

  const {id} = useParams()
  const movieId = id.split('-')
  const similarId = Number(movieId[movieId.length-1])
  console.log(similarId)

  const infoAboutMovie = [
    {type : 'Name : ', value : myMovie?.original_title},
    {type : 'Year : ', value : new Date(myMovie?.release_date).getFullYear()},
    {type : 'Votes : ', value : myMovie?.vote_count},
    {type : 'Original language : ', value : myMovie?.original_language},
    {type : '', value : myMovie?.overview}
  ]

  const getSingle = async () =>{
    setChooseLoading(true)
    const singleMovie = await privateApi.get(`/movie/${movieId[movieId.length-1]}`)
    setMyMovie(singleMovie)
    setChooseLoading(false)
    setGenre(singleMovie?.genres)
    setCompanies(singleMovie?.production_companies)
  }
  useEffect(()=>{
    getSingle()
  },[])
  
  return (
    <div className="chosenMovie_container">
                 <div className="movieImage">
                      {!chooseLoading ? 
                        <img src={`${imageUrl.img500}${myMovie?.poster_path}`} alt="image" /> : 
                        <SecondLoader/>}
                     <div className="genres">{genre?.map((item,idx)=>{
                               return <span key={idx}>{idx === 0 ? `${item?.name}` : ` / ${item?.name}`}</span>
                                                                     })}
                      </div>
                 </div>
                 

                 <div className="infoChosenMovie">
                  {infoAboutMovie?.map((item, idx)=>{
                    return  <DoubleColumn contentOne = {item?.type}
                                          contentTwo={item?.value ? 
                                          item?.value : ''} key={idx}/>
                  })}

                      <div className="companies">
                           {companies?.map((item , idx) => {
                                       return <Square key={idx}>{item?.logo_path ? 
                                                               <img src ={`${imageUrl.img200}${item?.logo_path}`}/> : 
                                                                item?.name}
                                              </Square>
                           }) }
                      </div>
                </div>
   </div>
  )
}

export default ChosenMoviePage