import axios from 'axios'
import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <div id="container">
        <h3>Movie Search</h3>
        <input placeholder='type in movie name' name="search" onChange={this.handleChange}/>
        <button className='btn' onClick={() => this.handleSearchMovies(title)}>Search movie</button>
        <div className="all-list-wrapper">
        <div className='movie-list'>
          {movies.length> 0 && movies.map(movie => {
            const isNominated = nominatedMovies.find(nominated => nominated.imdbID === movie.imdbID);
            return (
              <div className='movie'> 
                <p className='title'>{movie.Title}</p>
                <img className='movieimg' src={movie.Poster} alt="movie" />
                <p>{movie.Year}</p>
                <button 
                className='action-btn'
                onClick={() =>{
                   this.addToNominatedList(movie)
                  if(nominatedMovies.length === 4){
                    toast("You have successfully nomiated 5 movies");
                  }
                  
                  }} 
                disabled={isNominated}
                  style={{ cursor: isNominated? 'not-allowed' : 'pointer'}}
                > 

                  {isNominated ? "nominated" : "nominate" }
                    
                </button>
              </div>
            )
          })}
        </div>
       
      { nominatedMovies.length> 0 && <div className='nominated-list' >
          <h2>Nominated Movie</h2>
          {nominatedMovies.map(movie => {
            return (
              <div className='nominated-movie' style={{backgroundImage: `url(${movie.Poster})`}}>
                <h2 className='nominated-title'>{movie.Title}</h2>
                {/* <img src={movie.Poster} alt="movie" /> */}
                <p>{movie.Year}</p>
                <button className='action-btn' onClick={() => { this.removeFromNominated(movie.imdbID)}}>Remove</button>
              </div>
            )
          })}
        </div>}
        <ToastContainer position="top-right" type="success" />
        </div>
      </div>
    )
  }
}