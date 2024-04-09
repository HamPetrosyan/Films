import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms, fetchFilmsByType } from "../reduxStore/filmsSlice";

const Films = () => {
  const films = useSelector((state) => state.films.films);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("movie");

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFilmsByType("movie"));
  }, [dispatch]);

  const search = () => {
    dispatch(fetchFilms());
  };

  const handleSearch = (e) => {
    setValue(e.target.value);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
    dispatch(fetchFilmsByType("movie"));
  };

  return (
    <>
      <div>
        <input type="text" value={value} onChange={handleSearch} />
        <button onClick={search}>Search</button>
      </div>
      <div>
        <input
          type="radio"
          id="movie"
          value="movie"
          checked={typeFilter === "movie"}
          onChange={handleTypeChange}
        />
        <label htmlFor="movie">Movies</label>

        <input
          type="radio"
          id="series"
          value="series"
          checked={typeFilter === "series"}
          onChange={handleTypeChange}
        />
        <label htmlFor="series">Series</label>

        <input
          type="radio"
          id="episode"
          value="episode"
          checked={typeFilter === "episode"}
          onChange={handleTypeChange}
        />
        <label htmlFor="episode">Episodes</label>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {films ? (
          films.map((film) => (
            <div style={{ width: 300 }} key={film.imdbID}>
              <h2>{film.Title}</h2>
              <img src={film.Poster} alt={film.Title} />
              <p>{film.Year}</p>
              <p>{film.Type}</p>
            </div>
          ))
        ) : (
          <p>No films found</p>
        )}
      </div>
    </>
  );
};

export { Films };
