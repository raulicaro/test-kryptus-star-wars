import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Login from './views/login/Login';
import Movies from './views/movies/Movies';
import Movie from './views/movie/Movie';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/movies" element={<Movies/>} />
        <Route path="/movie/:id" element={<Movie/>} />       
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;

