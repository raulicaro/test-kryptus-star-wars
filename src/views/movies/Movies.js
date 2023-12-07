import React, { useState, useEffect } from "react";
import "./Movies.css";
import Table from "../../components/Table";
import Top from "../../components/Top";
import Spinner from "../../components/Spinner"; 
import axios from "axios";
import { checkDateCreated } from "../../functions/checkDateCreated";
import TableDataMovie from "../../components/TableDataMovie";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const cachedPage = JSON.parse(localStorage.getItem("movies"));
    checkDateCreated();
    displayPage(cachedPage);

    async function displayPage(cachedPage) {
      cachedPage === null ? await fetchMovies() : setMovies(cachedPage);
    }

    async function fetchMovies() {
      setIsFetching(true);
      try {
        const response = await axios.get("https://swapi.dev/api/films/");
        const pageResults = response.data.results;
        setAdditionalData(pageResults);
      } catch (error) {
        console.error(error);
        setIsFetching(false);
      }
    }

    const setAdditionalData = (results) => {
      cachePage(results);
      setMovies([...results]);
      setIsFetching(false);
    };

    const cachePage = (newPageComponents) => {
      localStorage.setItem("movies", JSON.stringify(newPageComponents));
      localStorage.setItem("date-created", JSON.stringify(new Date().getTime()));
    };
  }, []); 

  if (isFetching) {
    return (
      <div className="App">
        <Top />
        <Spinner/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Top />
        <Table rows={movies.map((film) => <TableDataMovie movie={film} key={film.title} />)}/>
      </div>
    );
  }
};

export default Movies;
