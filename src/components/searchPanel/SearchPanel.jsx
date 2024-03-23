import  {Movie} from '../../services/service.Api'
import { useDebounce } from '../../hook/useDebounce'
import Square from '../squareComponent/Square'
import MyPagination from '../pagination/MyPagination'
import {imageUrl} from '../../utils/imageUrl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import './searchPanel.css'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const SearchPanel = ({isVisible, setIsVisible}) => { 

      const searchPerView = 6
      const [movies, setMovies] = useState([])
      const [inputValue, setInputValue] = useState('')
      const {debounceValue} = useDebounce(inputValue)
      const [currentSearchPage, setCurrentSearchPage] = useState(1)
      const [searchPageCount, setSearchPageCount] = useState(Math.ceil(movies?.length / searchPerView))
      const firstIndex = searchPerView * currentSearchPage - searchPerView
      const lastIndex = searchPerView * currentSearchPage - 1

    const handleSearchChange = (e,p) => {
        setCurrentSearchPage(p)
      }

    const handleChange = (e) => {
        setInputValue(e.target.value)
       }

    const getSearchedMovie = async () => {
        const {response} = await new Movie().getSearchedMovie(debounceValue)
        setSearchPageCount(Math.ceil(response?.results?.length / searchPerView))
        setMovies(response?.results)
        
        }
        useEffect(()=>{
          getSearchedMovie()
        },[debounceValue])

  return (
    <div className={isVisible ? "search_container" : "displayNone"}>

        <div className="closeButton"><FontAwesomeIcon icon={faClose} color='white' 
                                                      onClick={()=>setIsVisible((prev)=>!prev)}/>
       </div>
        <input type="text" id='inputMovie' 
                           placeholder='search movies' 
                           value={inputValue}
                           onChange={(e)=>handleChange(e)}/>

        <div className="searchedMovies" >

          {movies?.slice(firstIndex,lastIndex).map((item, idx)=>{
            return <Link to = {`/chosenMoviePage/${item?.title?.replaceAll(" ",'-').toLowerCase()}-${item?.id}`}
                        key = {idx}
                        onClick = {()=>setIsVisible((prev)=>!prev)}>
            
            <Square>
              {item?.backdrop_path ? <img src={`${imageUrl.img500}${item?.backdrop_path}`} alt="image" /> : 
                                     <img src={`${imageUrl.img500}${item?.poster_path}`} alt="image" />}
              <h6>{item?.original_title}</h6>
            </Square>

            </Link>
          })}
          <MyPagination countPages={searchPageCount} handleChangePagination={handleSearchChange} className = 'm-t-b'/>
        </div>
        
        
      </div>
  )
}

export default SearchPanel