import { Component } from "react";
import { endpoint } from "./endpoints";
import { privateApi } from "./Axios";

class Movie extends Component{
        async getNewMovies(){
            try {
                const movies = await privateApi.get(endpoint.upComing)
                return movies.results
                
            } catch (error) {
                throw error
                
            }

    }

        async getTopData(){
        try {
            const datas = await privateApi.get(endpoint.topRated)
            return datas.results
        } catch (error) {
            throw error      
        } 
    }

        async getPopularData(){

        try {
                const response = await privateApi.get(endpoint.popular)
                return response.results
            }   
         catch (error) {
           throw error  
        }}

        async getSearchedMovie(quary){
        try{
            const response = await privateApi.get(endpoint.searched(quary))
            return {response}
        }
        catch(error) {
            throw {error}
        }
    }

        async getMoviebyGenre(param){
        try{
            const response = await privateApi.get(endpoint.generalId(param))
            return {response}
        }
        catch(error) {
            throw {error}
        }
    }

    //     async getSimilarMovies(myId){
    //     try{
    //         const {response} = await axios.get(`https://api.themoviedb.org/3/movie/${myId}/similar`)
    //         return {response}
    //     }
    //     catch(error) {
    //         throw {error}
    //     }
    // }
    
}

export {Movie}