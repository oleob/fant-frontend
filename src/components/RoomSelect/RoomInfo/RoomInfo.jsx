import React from 'react';
import Paper from '@material-ui/core/Paper';
import GroupIcon from '@material-ui/icons/Group';
import WifiIcon from '@material-ui/icons/Wifi';
import TvIcon from '@material-ui/icons/Tv';
import ShareIcon from '@material-ui/icons/Share';
import SpeakerIcon from '@material-ui/icons/Speaker';
import './room-info.scss';

import ReservationList from './ReservationList';

const RoomInfo = ({ selectedRoom }) => (
  <>
    {selectedRoom && (
      <Paper className="room-info">
        <div className="room-info__data">
          <div className="room-info__row">
            <h3>{selectedRoom.name}</h3>
            <ShareIcon className="room-info__icon room-info__icon--right" />
          </div>
          <div className="room-info__row">
            <GroupIcon className="room-info__icon" />
            <p>{selectedRoom.capacity}</p>
          </div>
          <div className="room-info__row">
            <WifiIcon className="room-info__icon" />
            <TvIcon className="room-info__icon" />
            <SpeakerIcon className="room-info__icon" />
          </div>
        </div>

        {selectedRoom.reservations.length > 0 && (
          <>
            <p className="room-info__padded-text">Reservasjoner</p>
            <ReservationList reservations={selectedRoom.reservations} />
          </>
        )}
      </Paper>
    )}
  </>
);

export default RoomInfo;
