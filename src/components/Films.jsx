import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms } from "../reduxStore/filmsSlice";

const Films = () => {
  const films = useSelector((state) => state.films.films);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    dispatch(fetchFilms({}));
  }, [dispatch]);

  const search = () => {
    if (value.trim() !== "") {
      dispatch(fetchFilms({ filmName: value.trim(), type: typeFilter }));
    }
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setTypeFilter(selectedType);
    dispatch(fetchFilms({ type: selectedType }));
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </div>
      <div>
        <input
          name="type"
          type="radio"
          id="movie"
          value="movie"
          checked={typeFilter === "movie"}
          onChange={handleTypeChange}
        />
        <label htmlFor="movie">Movies</label>

        <input
          name="type"
          type="radio"
          id="series"
          value="series"
          checked={typeFilter === "series"}
          onChange={handleTypeChange}
        />
        <label htmlFor="series">Series</label>

        <input
          name="type"
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
