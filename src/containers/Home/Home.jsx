import React from 'react';

import './home.scss';

import SelectFloor from '../../components/SelectFloor';

const Home = () => (
  <div className="home">
    <h1>Velg en etasje</h1>
    <SelectFloor />
  </div>
);

export default Home;
