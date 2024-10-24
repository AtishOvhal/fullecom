import React from 'react';
import Cards from '../components/Cards';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to our Store</h1>
      <Cards /> {/* Display all products */}
    </div>
  );
};

export default HomePage;
