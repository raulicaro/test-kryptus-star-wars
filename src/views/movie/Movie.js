import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CharacterTable from "../../components/CharacterTable";
import PlanetTable from "../../components/PlanetTable";
import Top from "../../components/Top";
import Spinner from "../../components/Spinner";
import HeaderMovie from "../../components/HeaderMovie";
import "./Movie.css";
import './CharacterTable.css'; 

const Movie = () => {
  const [movie, setMovie] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsFetching(true);
      const storedMovie = localStorage.getItem(`movie_${id}`);
      if (storedMovie) {
        setMovie(JSON.parse(storedMovie));
      } else {
        try {
          const response = await axios.get(`https://swapi.dev/api/films/${id}`);
          const results = response.data;
          localStorage.setItem(`movie_${id}`, JSON.stringify(results));
          setMovie(results);
        } catch (error) {
          console.error("Erro ao buscar informações do filme:", error);
        }
      }
      setIsFetching(false);
    };

    fetchMovieData();
  }, [id]);

  if (isFetching) {
    return (
      <div className="App">
        <Top />
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Top />
        <HeaderMovie filmInfo={movie} />
        <div className="tables-container">
          <CharacterTable characterUrls={movie?.characters}/>
          <PlanetTable planetUrls={movie?.planets}/>
        </div>
      </div>
    );
  }
}

export default Movie;