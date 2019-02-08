import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import './search.scss';

import { updateFilter } from '../../actions/roomActions';

class Search extends Component {
  handleChange = name => event => {
    const { filterValues, updateFilterAction } = this.props;
    updateFilterAction({ ...filterValues, [name]: event.target.value });
  };

  render() {
    const { filterValues, rooms, selectedRoomName } = this.props;
    const selectedRoom = rooms.find(room => room.name === selectedRoomName);
    return (
      <Paper className="search">
        <div className="search__pickers">
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
        </div>
        <TextField
          id="standard-number"
          label="Kapasitet"
          value={filterValues.capacity}
          onChange={this.handleChange('capacity')}
          type="number"
          margin="normal"
        />
        <Button variant="contained" color="primary" disabled={selectedRoom ? selectedRoom.reserved || !selectedRoom.relevant : true}>
          Reserver
        </Button>
      </Paper>
    );
  }
}

const mapDispatchToProps = {
  updateFilterAction: updateFilter
};

const mapStateToProps = state => {
  return {
    filterValues: state.room.filterValues,
    rooms: state.room.filteredRoomList,
    selectedRoomName: state.room.selectedRoomName
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
