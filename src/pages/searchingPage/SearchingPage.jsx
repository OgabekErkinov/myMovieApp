import { useEffect, useState } from 'react'
import { Movie } from '../../services/service.Api'
import './serchingPage.css'
import {imageUrl} from '../../utils/imageUrl'
import {cut} from '../../utils/cuttingCode'
import { Link } from 'react-router-dom'
import MyPagination from '../../components/pagination/MyPagination'
const SearchingPage = () => {
  const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
  const [chosenGenre, setChosenGenre] = useState('')
  const [searchedMovies, setSearchedMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  
  const chosenPerView = 8
  const firstIndex = chosenPerView * currentPage - chosenPerView
  const lastIndex = chosenPerView * currentPage - 1
  const [countPages, setCountPages] = useState(Math.ceil(searchedMovies.length/chosenPerView))


const searchByGenre = async () =>{
  const {response} = await new Movie().getMoviebyGenre(chosenGenre)
  setCountPages(Math.ceil(response?.results?.length / chosenPerView))
  setSearchedMovies(response?.results)
  
}

const handleGenre = (genreId) =>{
  setChosenGenre(`&with_genres=${genreId}`)
  
}
useEffect(()=>{
  searchByGenre()
},[chosenGenre])
cut


const handleChangeByGenre = (event,p) => {
  setCurrentPage(p)
}

  return (
    <div className="searchingPage_container">
         <div className="inputArea">
              <select name="" id="selectGenre" onChange={(e) => handleGenre(e.target.value)}>
                      {genres.map((item,idx)=>{
                              return  <option value={item.id} key={idx} className='genreItem' >{item.name}</option>
                      })}
              </select>    

          </div>

         <div className="searchingResults">
               {searchedMovies?.slice(firstIndex,lastIndex).map((item, idx)=>{
                               return  <Link to = {`/chosenMoviePage/${cut.Title(item)}-${item?.id}`} key={idx}>
                                     <div className="chosenMovie" >
                                          <img src={`${imageUrl.img500}${item?.backdrop_path}`} alt="image" />
                                          <h4>{item?.original_title}</h4>
                                     </div> 
                                 </Link>
                                 

                                            })} 
    
         </div>
        <MyPagination countPages={countPages} handleChangePagination={handleChangeByGenre}/>
  </div>
  )
}

export default SearchingPage