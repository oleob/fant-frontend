import React, { Component } from 'react';
import { connect } from 'react-redux';

import './room-select.scss';

import Floors from '../Floors';
import RoomInfo from './RoomInfo';
import { fetchRooms, updateSelectedRoom, updateSelectedFloor } from '../../actions/roomActions';

const changeClass = (element, newClass) => {
  let classes = ['room--free', 'room--reserved', 'room--unrelevant'];
  classes = classes.filter(name => name !== newClass);
  classes.forEach(name => element.classList.remove(name));
  element.classList.add(newClass);
};

class RoomSelect extends Component {
  componentDidMount() {
    const { fetchRoomsAction, floorName, updateFloorAction } = this.props;
    fetchRoomsAction(floorName);
    updateFloorAction(floorName);
  }

  componentDidUpdate() {
    const { rooms } = this.props;
    rooms.forEach(room => {
      const element = document.getElementById(room.name);
      element.onclick = this.handleClick;
      if (room.reserved) {
        changeClass(element, 'room--reserved');
      } else if (!room.relevant) {
        changeClass(element, 'room--unrelevant');
      } else {
        changeClass(element, 'room--free');
      }
    });
  }

  handleClick = event => {
    const { updateRoomAction } = this.props;
    updateRoomAction(event.target.id);
  };

  render() {
    const { floorName, rooms, selectedRoomName } = this.props;
    const selectedRoom = rooms.find(room => room.name === selectedRoomName);
    let Floor;
    if (Floors[floorName]) {
      Floor = Floors[floorName];
    } else {
      return (
        <div>
          <h3>No Floor found</h3>
        </div>
      );
    }
    return (
      <div className="room-select">
        <Floor className="room-select__floor" />
        <RoomInfo selectedRoom={selectedRoom} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchRoomsAction: fetchRooms,
  updateRoomAction: updateSelectedRoom,
  updateFloorAction: updateSelectedFloor
};

const mapStateToProps = state => ({
  rooms: state.room.filteredRoomList,
  selectedRoomName: state.room.selectedRoomName
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSelect);
