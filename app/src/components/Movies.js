import React from 'react'




function Movies({ movie,movies, onChange }) {
  
  console.log(movies)
  return (
    <div className="Movies">
      <h1>
        {" "}
        Bin<span className="gold">{"g"}</span>eBoy{" "}
      </h1>
      <h4> Its Movie time! </h4>

      <img
        className="motion poster"
        src="https://s3.amazonaws.com/pbblogassets/uploads/2017/07/oz-wicked-witch-poster.gif"
        alt="Girl in a jacket"
      />

      <p>
        {" "}
        <label htmlFor="movie">Select your Binge!</label>
      </p>
      <select
        id="movie"
        //value={movie.name}
        onChange={(e) => {
          onChange(movies.find((movie) => movie.name === e.target.value));
        }}
      >
        {movies.map((movie) => (
          <option key={movie.name} value={movie.name}>
            {movie.name} ({movie.price})
          </option>
        ))}
      </select>
    </div>
  );
}

export default Movies