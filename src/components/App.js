import { data } from "../data";
import React from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies } from "../actions";
class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate();
    });
    //make api call
    //dispatch action
    store.dispatch(addMovies(data));
    console.log("STATE", store.getState());
  }
  render() {
    const movies = this.props.store.getState();
    console.log("render....");
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourite</div>
          </div>
          <div className="list">
            {movies.map(
              (
                movie,
                index //uss movie ka index
              ) => (
                <MovieCard movie={movie} key={`movies-${index}`} />
              )
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
