import React from 'react';
import Paper from '@material-ui/core/Paper';
import GroupIcon from '@material-ui/icons/Group';
import WifiIcon from '@material-ui/icons/Wifi';
import TvIcon from '@material-ui/icons/Tv';
import ShareIcon from '@material-ui/icons/Share';
import SpeakerIcon from '@material-ui/icons/Speaker';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tooltip from '@material-ui/core/Tooltip';

import './room-info.scss';

import ReservationList from './ReservationList';

const RoomInfo = ({ selectedRoom }) => (
  <>
    {selectedRoom && (
      <>
        <Paper className="room-info">
          <div className="room-info__data">
            <div className="room-info__row">
              <h3>{selectedRoom.name}</h3>
              <ShareIcon className="room-info__icon room-info__icon--right" />
            </div>
            <div className="room-info__row">
              <Tooltip title="Antal sitteplasser">
                <GroupIcon className="room-info__icon" />
              </Tooltip>
              <p>{selectedRoom.capacity}</p>
            </div>
            <div className="room-info__row">
              <Tooltip title="Rommet har wifi">
                <WifiIcon className="room-info__icon" />
              </Tooltip>
              <Tooltip title="Rommet har TV/prosjektor">
                <TvIcon className="room-info__icon" />
              </Tooltip>
              <Tooltip title="Rommet har Høytalere">
                <SpeakerIcon className="room-info__icon" />
              </Tooltip>
            </div>
          </div>
        </Paper>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <p>Reservasjoner</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ padding: 0 }}>
            <ReservationList reservations={selectedRoom.reservations} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </>
    )}
  </>
);

export default RoomInfo;
