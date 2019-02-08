import React from 'react';

import './floor.scss';

import Search from '../../components/Search';
import RoomSelect from '../../components/RoomSelect';

const Floor = ({ match }) => (
  <div className="floor">
    <Search />
    <RoomSelect floorName={match.params.floorName} />
  </div>
);

export default Floor;
