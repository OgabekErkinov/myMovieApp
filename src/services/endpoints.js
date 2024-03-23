export const endpoint = {
    topRated : '/movie/top_rated',
    upComing : '/movie/upcoming',
    popular : '/movie/popular',
    searched : (quary) => `/search/movie?query=${quary}`,
    generalId : (...param) => `/discover/movie?query=${param}`
     
}