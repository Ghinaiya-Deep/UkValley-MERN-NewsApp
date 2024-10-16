// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NewsCard from './components/NewsCard';
import IndividualNews from './components/IndividualNews';
import AddNewsModal from './components/AddNewsModal';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css';
import env from './img/environment.png';
import gov from './img/housing.png';
import ai from './img/ai.jpg';
import ten from './img/tennis.png';

function App() {
  const [newsList, setNewsList] = useState([
    { id: '1', title: 'Climate Change and Sustainability', description: 'A new study published in Nature Climate Change reveals that global warming is causing sea levels to rise at an alarming rate.', extraDescription: 'A new study published in Nature Climate Change reveals that global warming is causing sea levels to rise at an alarming rate. Scientists predict that coastal cities around the world could face devastating flooding and erosion if emissions continue unabated. The study findings underscore the urgency of addressing climate change and transitioning to sustainable energy sources.', date: '10/10/2024', image: env },
    { id: '2', title: 'Government New Affordable Housing Scheme', description: 'The Indian government has announced a new affordable housing scheme aimed at providing affordable homes to low-income families.', extraDescription: 'The Indian government has announced a new affordable housing scheme aimed at providing affordable homes to low-income families. The scheme offers subsidies, interest rate reductions, and other incentives to make homeownership more accessible. The government hopes that this initiative will help address the housing shortage in the country.', date: '11/10/2024', image: gov },
    { id: '3', title: 'Artificial Intelligence and Technology', description: 'A team of scientists has leveraged artificial intelligence to rapidly identify potential drug candidates for COVID-19.', extraDescription: 'A team of scientists has leveraged artificial intelligence to rapidly identify potential drug candidates for COVID-19. By analyzing vast datasets of molecular structures and biological properties, the Al system was able to pinpoint molecules that could inhibit the virus ability to infect cells, could have a profound impact on future pandemic response efforts.', date: '12/10/2024', image: ai },
    { id: '4', title: 'Serena Williams Announces Retirement from Tennis', description: 'Tennis legend Serena Williams has announced her retirement from professional tennis after a long and illustrious career.', extraDescription: 'Tennis legend Serena Williams has announced her retirement from professional tennis after a long and illustrious career. Williams, who holds numerous Grand Slam titles, has been a dominant force in the sport for decades. Her retirement marks. the end end of of an era and will be e significant loss to the tennis world.', date: '13/10/2024', image: ten }
  ]);

  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  const addNewsHandler = (newNews) => {
    setNewsList([...newsList, newNews]); // Function to add new news
    setShowModal(false); // Close the modal after adding news
  };

  const editNewsHandler = (id, updatedData) => {
    const updatedNewsList = newsList.map((news) =>
      news.id === id ? { ...news, ...updatedData } : news
    );
    setNewsList(updatedNewsList); // Update the state with the new news list
  };

  const deleteNewsHandler = (id) => {
    const updatedNewsList = newsList.filter((news) => news.id !== id);
    setNewsList(updatedNewsList); // Update the state with the filtered news list
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar with Add Icon */}
        <nav className="navbar">
          <h1>Deep's News App</h1>
          <Link to="#" className="add-icon" onClick={() => setShowModal(true)}>
            <i className="fas fa-plus"></i>
          </Link>
        </nav>

        {showModal && <AddNewsModal addNews={addNewsHandler} closeModal={() => setShowModal(false)} />}
        
        <Routes>
          <Route path="/" element={
            <div className="news-list">
              {newsList.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          } />
          <Route path="/news/:id" element={<IndividualNews newsList={newsList} editNews={editNewsHandler} deleteNews={deleteNewsHandler} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
