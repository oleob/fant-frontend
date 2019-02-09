import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';

import './search.scss';

import { updateFilter, updateSelectedFloor, makeReservation } from '../../actions/roomActions';

class Search extends Component {
  handleChange = name => event => {
    const { filterValues, updateFilterAction } = this.props;
    updateFilterAction({ ...filterValues, [name]: event.target.value });
  };

  makeReservation = () => {
    const { filterValues, selectedRoomName, selectedFloorName, makeReservationAction } = this.props;
    makeReservationAction({
      roomName: selectedRoomName,
      floorName: selectedFloorName,
      reservation: {
        from: filterValues.start.toISOString(),
        to: filterValues.end.toISOString(),
        reservedBy: 'Taco Terje'
      }
    });
  };

  render() {
    const { filterValues, rooms, selectedRoomName } = this.props;
    const selectedRoom = rooms.find(room => room.name === selectedRoomName);
    return (
      <>
        <div className="search">
          <Paper className="search__settings">
            <TextField
              id="datetime-local"
              label="Fra"
              type="datetime-local"
              value={filterValues.start.format('YYYY-MM-DDTHH:mm')}
              onChange={this.handleChange('start')}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="datetime-local"
              label="Til"
              type="datetime-local"
              value={filterValues.end.format('YYYY-MM-DDTHH:mm')}
              onChange={this.handleChange('end')}
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="standard-number"
              label="Kapasitet"
              value={filterValues.capacity}
              onChange={this.handleChange('capacity')}
              type="number"
              InputLabelProps={{
                shrink: true
              }}
            />
          </Paper>
          <div className="search__button-container">
            <Button
              className="search__button"
              variant="contained"
              color="primary"
              disabled={selectedRoom ? selectedRoom.reserved || !selectedRoom.relevant : true}
              onClick={this.makeReservation}
            >
              Reserver
            </Button>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = {
  updateFilterAction: updateFilter,
  updateFloorAction: updateSelectedFloor,
  makeReservationAction: makeReservation
};

const mapStateToProps = state => {
  return {
    filterValues: state.room.filterValues,
    rooms: state.room.filteredRoomList,
    selectedRoomName: state.room.selectedRoomName,
    selectedFloorName: state.room.selectedFloorName
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
