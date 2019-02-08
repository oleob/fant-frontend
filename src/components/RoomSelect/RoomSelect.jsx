import React, { Component } from 'react';
import { connect } from 'react-redux';

import './room-select.scss';

import Floors from '../Floors';
import RoomInfo from './RoomInfo';
import { fetchRooms, updateSelectedRoom } from '../../actions/roomActions';

class RoomSelect extends Component {
  componentDidMount() {
    const { fetchRoomsAction, floorName } = this.props;
    fetchRoomsAction(floorName);
  }

  changeClass = (element, newClass) => {
    let classes = ['room--free', 'room--reserved', 'room--unrelevant'];
    classes = classes.filter(name => name !== newClass);
    classes.forEach(name => element.classList.remove(name));
    element.classList.add(newClass);
  };

  componentDidUpdate() {
    const { rooms } = this.props;
    rooms.forEach(room => {
      const element = document.getElementById(room.name);
      element.onclick = this.handleClick;
      if (room.reserved) {
        this.changeClass(element, 'room--reserved');
      } else if (!room.relevant) {
        this.changeClass(element, 'room--unrelevant');
      } else {
        this.changeClass(element, 'room--free');
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
        <RoomInfo selectedRoom={selectedRoom} />
        <Floor style={{ width: '40rem' }} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchRoomsAction: fetchRooms,
  updateRoomAction: updateSelectedRoom
};

const mapStateToProps = state => {
  return {
    rooms: state.room.filteredRoomList,
    selectedRoomName: state.room.selectedRoomName
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSelect);
