import axios from 'axios'
import React, { Component } from 'react'

export default class Movies extends Component {
 state ={
   movies: [],
   nominatedMovies: [],
   title: ''
 }



 handleSearchMovies = (title) => {
   axios.get(`https://www.omdbapi.com/?type=movie&s=${title}&apikey=ea144ab5`).then(movies => {
     this.setState({ movies: movies.data.Search})
   })
 }

 handleChange = (e) => {
   this.setState({
     title: e.target.value
   })
 }

  addToNominatedList = (movie) => {
    this.setState({nominatedMovies: [...this.state.nominatedMovies, movie ]})
  }

removeFromNominated = id => {
  const movieAfterRemoval = this.state.nominatedMovies.filter(nominated => nominated.imdbID !== id);
  this.setState({ nominatedMovies: movieAfterRemoval });


}


  render() {
    const { title, movies, nominatedMovies} = this.state;
    // imdbID: "tt0206275"

    return (
      <div>
        <input placeholder='type movie name' name="search" onChange={this.handleChange}/>
        <button onClick={() => this.handleSearchMovies(title)}>Search movie</button>
        <div className='movie-list'>
          {movies.map(movie => {
            const isNominated = nominatedMovies.find(nominated => nominated.imdbID === movie.imdbID);
            return (
              <div className='movie'> 
                <h2>{movie.Title}</h2>
                <img src={movie.Poster} alt="movie" />
                <p>{movie.Year}</p>
                <button 
                onClick={() => this.addToNominatedList(movie)} 
                disabled={isNominated}
                  style={{ cursor: isNominated? 'not-allowed' : 'pointer'}}
                > 

                  {isNominated ? "nominated" : "nominate" }
                    
                </button>
              </div>
            )
          })}
        </div>
       
        <div className='movie-list'>
          <h2>Nominated Movie</h2>
          {nominatedMovies.map(movie => {
            return (
              <div className='movie'>
                <h2>{movie.Title}</h2>
                {/* <img src={movie.Poster} alt="movie" /> */}
                <p>{movie.Year}</p>
                <button onClick={() => { this.removeFromNominated(movie.imdbID)}}>Remove</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}