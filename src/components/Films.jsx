import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms } from "../reduxStore/filmsSlice";
import "./Films.css";

const Films = () => {
  const films = useSelector((state) => state.films.films);
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [lastSearchedFilm, setLastSearchedFilm] = useState("Avatar");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchFilms({
        filmName: lastSearchedFilm,
        type: typeFilter,
        page: currentPage,
      })
    );
  }, [dispatch, lastSearchedFilm, typeFilter, currentPage]);

  const search = () => {
    if (value.trim() !== "") {
      setLastSearchedFilm(value.trim());
    }
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setTypeFilter(selectedType);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="films-container">
      <header>
        <h1>
          Ham<span style={{ color: "rgb(132, 0, 255)" }}>Film</span>
        </h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={search}>Search</button>
        </div>
        <div className="radio-buttons">
          <input
            name="type"
            type="radio"
            id="movie"
            value="movie"
            checked={typeFilter === "movie"}
            onChange={handleTypeChange}
            className={typeFilter === "movie" ? "selected" : ""}
          />
          <label htmlFor="movie">Movies</label>

          <input
            name="type"
            type="radio"
            id="series"
            value="series"
            checked={typeFilter === "series"}
            onChange={handleTypeChange}
            className={typeFilter === "series" ? "selected" : ""}
          />
          <label htmlFor="series">Series</label>

          <input
            name="type"
            type="radio"
            id="episode"
            value="episode"
            checked={typeFilter === "episode"}
            onChange={handleTypeChange}
            className={typeFilter === "episode" ? "selected" : ""}
          />
          <label htmlFor="episode">Episodes</label>

          <input
            name="type"
            type="radio"
            id="game"
            value="game"
            checked={typeFilter === "game"}
            onChange={handleTypeChange}
            className={typeFilter === "game" ? "selected" : ""}
          />
          <label htmlFor="game">Games</label>
        </div>
      </header>

      <div
        className="films"
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
          <p className="no-results">
            <span style={{ textDecoration: "underline" }}>Information:</span> We
            Couldn't Find Anything, try searching for another film.{" "}
            <i className="far fa-smile"></i>
          </p>
        )}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
    </div>
  );
};

export { Films };
