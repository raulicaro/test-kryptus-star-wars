import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const PlanetTable = ({ planetUrls }) => {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {    
    const fetchPlanets = async () => {
      if (!planetUrls || !planetUrls.length) {
        setIsLoading(false);
        return;
      }

      try {
        const startIdx = (currentPage - 1) * 5;
        const endIdx = startIdx + 5;
        const planetsToFetch = planetUrls.slice(startIdx, endIdx);

        const planetsData = await Promise.all(
          planetsToFetch.map(async (url) => {
            const match = url.match(/\/(\d+)\/$/);
            const planetId = match ? match[1] : null;

            const localStorageData = localStorage.getItem(`planet_${planetId}`);

            if (localStorageData) {
              return JSON.parse(localStorageData);
            } else {
              const response = await axios.get(url);
              const planetData = response.data;

              localStorage.setItem(`planet_${planetId}`, JSON.stringify(planetData));

              return planetData;
            }
          })
        );

        setPlanets(planetsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados dos planetas:', error);
        setIsLoading(false);
      }
    };

    fetchPlanets();
  }, [planetUrls, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const canShowNextPage = (currentPage - 1) * 5 + planets?.length < planetUrls?.length;

  return (
    <div className="table-container">
      {isLoading ? (
        <Spinner />
      ) : (
        planets.length > 0 && (
          <div>
            <p>Planets in this film:</p>
            <table>
              <thead>
                <tr>
                  <th>Planet</th>
                  <th>Diameter(Km)</th>
                  <th>Climate</th>
                  <th>Terrain</th>
                </tr>
              </thead>
              <tbody>
                {planets.map((planet) => (
                  <tr key={planet.name}>
                    <td>{planet.name}</td>
                    <td>{planet.diameter}</td>
                    <td>{planet.climate}</td>
                    <td>{planet.terrain}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {currentPage > 1 && (
                <button onClick={handlePrevPage}>Back</button>
              )}
              {canShowNextPage && (
                <button onClick={handleNextPage}>Next</button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default PlanetTable;