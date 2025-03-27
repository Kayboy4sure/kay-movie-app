export default function MoviesBox(props) {
  return (
  <div className="movie-card all-movies ">
    <img
      src={props.poster_path ?
        `https://image.tmdb.org/t/p/w500/${props.poster_path}` : '/src/assets/no-movie.png'}
      alt={props.title}
    />

    <div className="mt-4">
      <h3>{props.title}</h3>

      <div className="content">
        <div className="rating">
          <p>rating: </p>
          <img src="/src/assets/star.svg" alt="Star Icon" />
          <p>{props.vote_average ? props.vote_average.toFixed(1) : 'N/A'}</p>
        </div>

        <span>•</span>
        <p className="lang">lang: {props.original_language}</p>

        <span>•</span>
        <p className="year">release_date: {props.release_date ? props.release_date : 'N/A'}</p>
      </div>
    </div>
  </div>
  )
}