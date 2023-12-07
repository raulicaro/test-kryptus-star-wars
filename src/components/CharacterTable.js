import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';  

const CharacterTable = ({ characterUrls }) => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!characterUrls || !characterUrls.length) {
        setIsLoading(false);
        return; 
      }

      try {
        const startIdx = (currentPage - 1) * 5;
        const endIdx = startIdx + 5;
        const charactersToFetch = characterUrls.slice(startIdx, endIdx);

        const charactersData = await Promise.all(
          charactersToFetch.map(async (url) => {
            const match = url.match(/\/(\d+)\/$/);
            const characterId = match ? match[1] : null;

            const localStorageData = localStorage.getItem(`character_${characterId}`);
            
            if (localStorageData) {
              return JSON.parse(localStorageData);
            } else {
              const response = await axios.get(url);
              const characterData = response.data;
              
              localStorage.setItem(`character_${characterId}`, JSON.stringify(characterData));

              return characterData;
            }
          })
        );

        setCharacters(charactersData);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados dos personagens:', error);
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [characterUrls, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const canShowNextPage = (currentPage - 1) * 5 + characters?.length < characterUrls?.length;

  return (
    <div className="table-container">
      {isLoading ? (
        <Spinner />
      ) : (
        characters.length > 0 && (
          <div>
            <p>Characters in this film:</p>
            <table>
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Birthdate</th>
                  <th>Height(cm)</th>
                  <th>Weight (Kg)</th>
                </tr>
              </thead>
              <tbody>
                {characters.map((character) => (
                  <tr key={character.name}>
                    <td>{character.name}</td>
                    <td>{character.birth_year}</td>
                    <td>{character.height}</td>
                    <td>{character.mass}</td>
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

export default CharacterTable;
