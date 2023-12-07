import React from "react";
import { useNavigate } from 'react-router-dom';
import { extractNumberFromUrl, formatDate } from '../functions/utils';
import './TableDataMovie.css';

const TableDataMovie = ({ movie }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/movie/${extractNumberFromUrl(movie?.url)}`);
  };

  return (
    <tr
      className="altFont table-row-clickable"
      onClick={handleRowClick}
    >
      <td>{movie.title}</td>
      <td>{movie.episode_id}</td>
      <td>{formatDate(movie.release_date)}</td>
      <td>{movie.director}</td>
      <td>{movie.producer}</td>
      <td>{`${movie.opening_crawl.slice(0, 250)}...`}</td>
    </tr>
  );
}

export default TableDataMovie;