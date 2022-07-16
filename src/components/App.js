import { data } from "../data";

import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
import { data as moviesList } from "../data";
// import { StoreContext } from "../index";
class App extends React.Component {
  componentDidMount() {
    // this.props.store.subscribe(() => this.forceUpdate());
    // this.props.store.dispatch(addMovies(moviesList));
    this.props.dispatch(addMovies(moviesList));
  }

  isMovieInFavourite = (movie) => {
    // const { movies } = this.props.store.getState(); //yaha favourite wala array aa jayega favourites me
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);
    if (index !== -1) {
      //found the movie
      return true;
    }
    return false;
  };
  ChangeTab = (val) => {
    // this.props.store.dispatch(setShowFavourites(val));
    this.props.dispatch(setShowFavourites(val));
  };
  render() {
    // const { movies, search } = this.props.store.getState(); //movies:{} , search:{}
    // const movies = this.props.store.getState(); //{list:[m1,m2..],favourites:[]}
    //to ye mujhe object return krega

    const { movies, search } = this.props;
    const { list, showFavourites = [], favourites = [] } = movies;
    // console.log("render....", this.props.store.getState());
    const displayMovies = showFavourites ? favourites : list;
    return (
      <div className="App">
        <Navbar search={search} />

        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"} `}
              onClick={() => this.ChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""} `}
              onClick={() => this.ChangeTab(true)}
            >
              Favourite
            </div>
          </div>
          {/* <div className="list"> */}
          <div id="list">
            {displayMovies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                // dispatch={this.props.store.dispatch}
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieInFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies to display!</div>
          ) : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

// export default AppWrapper;
function callback(state) {
  return {
    movies: state.movies,
    search: state.movies,
  };
}
const connectedComponent = connect(callback)(App);
export default connectedComponent;
