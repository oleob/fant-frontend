import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
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
      <>
        <div className="search">
          <TextField
            label="Søk"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
          />
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <p style={{ margin: 0 }}>Flere instillinger</p>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ padding: 0 }}>
              <div className="search__settings">
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
                  margin="normal"
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <div className="search__button-container">
            <Button
              className="search__button"
              variant="contained"
              color="primary"
              disabled={selectedRoom ? selectedRoom.reserved || !selectedRoom.relevant : true}
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
