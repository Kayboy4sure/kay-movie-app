import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import Spinner from "./components/Spinner"
import MoviesBox from "./components/MoviesBox"
import { useState, useEffect } from "react"

function App() {
  const [search, setSearch]= useState(null)
  const [movies, setMovies]= useState({
    isloading:true,
    trending:null, 
    allmovies:null,
  })

  const trendingmovies = movies.trending ? movies.trending.map((movie, index)=> (
    <li key={movie.id}>
      <p>{index + 1}</p>
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
    </li>
  )):null;
  const listofmovies = movies.allmovies ? movies.allmovies.map((movie)=> <MoviesBox key={movie.id} {...movie}/>):null;
  
  async function FetchMovies(search){
    const api_key = import.meta.env.VITE_MOVIE_API_KEY;
    const api_url = 'https://api.themoviedb.org/3'

    try{
      const options = {
          method: 'GET',
          headers: {
          accept: 'application/json',
          Authorization: `Bearer ${api_key}`
          }
      };
      if (search!==null){
        const response = await fetch(`${api_url}/search/movie?query=${search}`, options)
        if (!response.ok){
            throw new Error("Could not connect to server");
        }
        const data = await response.json()
        console.log(data.results)
        setMovies((perdata)=> ({...perdata, allmovies:data.results}))
      } else{
        const response1 = await fetch(`${api_url}/trending/movie/day?language=en-US`, options)
        if (!response1.ok){
            throw new Error("Could not connect to server");
        }
        const data1 = await response1.json()
        console.log(data1.results)
      
        const response2 = await fetch(`${api_url}/discover/movie?sort_by=popularity.desc`, options)
        if (!response2.ok){
            throw new Error("Could not connect to server");
        }
        const data2 = await response2.json()
        console.log(data2.results)
        setMovies((perdata)=> ({...perdata, isloading:false, trending:data1.results, allmovies:data2.results}))
      }
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    FetchMovies(search)
  }, [search])

  console.log(movies , true)

  return (
    <main>
      <div className="wrapper">
        <Header />
        <SearchBar search={search} setSearch={setSearch}/>
        {search ? null : 
        <section className="trending">
          <h2>Trending Movies</h2>
          <ul>
          {trendingmovies}
          </ul>
        </section>}

        <section className="all-movies">
        <h2>{search ? `Search: ${search}` : 'All Movies'}</h2>
        {movies.isloading && <Spinner />}
        <ul>
          {listofmovies}
        </ul>
        </section>
      </div>
    </main>
  )
}

export default App