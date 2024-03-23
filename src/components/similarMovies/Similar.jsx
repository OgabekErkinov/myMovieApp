import { useEffect, useState } from 'react'
import './similar.css'
import axios from 'axios'
import {Movie} from '../../services/service.Api'


// axios.get(`https://api.themoviedb.org/3/movie/${id}/similar`)

const Similar = ({id}) => {
  const [similar, setSimilar] = useState([])

    const similarMovies = async () => {
        const {response} = await new Movie().getSimilarMovies(id)
        setSimilar(response?.data?.results)
        console.log(similar)
    }

    useEffect(()=>{
      similarMovies()
    },[])

  return (
    <div>Similar</div>
  )
}

export default Similar