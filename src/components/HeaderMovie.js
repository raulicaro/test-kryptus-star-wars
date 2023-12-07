import React, { useState } from 'react';
import './HeaderMovie.css';
import { formatDate } from '../functions/utils'; 

const HeaderMovie = ({ filmInfo }) => {
  const [isCrawlExpanded, setIsCrawlExpanded] = useState(false);
  if (!filmInfo) {
    return null;
  }

  const {
    title,
    episode_id,
    opening_crawl,
    director,
    producer,
    release_date,
  } = filmInfo;

  

  const handleToggleCrawl = () => {
    setIsCrawlExpanded(!isCrawlExpanded);
  };

  return (
    <div className="header-card">
      <h1>{title}</h1>
      <div className="film-info">
        <p className="info-item">Episode: {episode_id}</p>
        <p className="info-item">Director: {director}</p>
        <p className="info-item">Producer: {producer}</p>
        <p className="info-item">Release Date: {formatDate(release_date || '')}</p>
      </div>
      <div className="opening-crawl">
        <div className="crawl-header">
          <p className="crawl-label">Opening Crawl:</p>
          <button className="toggle-crawl-btn" onClick={handleToggleCrawl}>
            {isCrawlExpanded ? '▼' : '▲'}
          </button>
        </div>
        {isCrawlExpanded && <p className="crawl-text">{opening_crawl}</p>}
      </div>
    </div>
  );
};

export default HeaderMovie;


