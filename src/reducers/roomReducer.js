import moment from 'moment';
import {
  ROOM_UPDATE_FILTER,
  ROOM_RESET_FILTER,
  ROOM_FETCHING_ROOMS,
  ROOM_FETCHED_ROOMS,
  ROOM_UPDATE_SELECTED,
  ROOM_UPDATE_FLOOR,
  ROOM_MAKE_RESERVATION
} from '../actions/roomActions';

const initialState = {
  filterValues: {
    capacity: 3,
    start: moment(),
    end: moment().add(0.5, 'hours')
  },
  rawRoomList: [],
  filteredRoomList: [],
  selectedRoomName: '',
  selectedFloorName: ''
};

const dateToMoment = rooms =>
  rooms.map(room => {
    const reservations = room.reservations.map(reservation => ({
      ...reservation,
      to: moment(reservation.to),
      from: moment(reservation.from)
    }));
    return { ...room, reservations };
  });

const filterRooms = (roomList, filterValues) => {
  let filteredList = roomList.map(room => {
    let relevant = true;
    if (room.capacity < filterValues.capacity) {
      relevant = false;
    }
    return { ...room, relevant };
  });
  filteredList = filteredList.map(room => {
    let reserved = false;
    if (
      room.reservations.some(
        reservation =>
          filterValues.start.isBetween(reservation.from, reservation.to) ||
          filterValues.end.isBetween(reservation.from, reservation.to) ||
          reservation.to.isBetween(filterValues.start, filterValues.end) ||
          reservation.from.isBetween(filterValues.start, filterValues.end)
      )
    ) {
      reserved = true;
    }
    const reservations = room.reservations.filter(
      reservation =>
        moment(filterValues.start)
          .startOf('day')
          .diff(moment(reservation.from).startOf('day'), 'days') === 0 ||
        filterValues.start.isBetween(reservation.from, reservation.to) ||
        filterValues.end.isBetween(reservation.from, reservation.to) ||
        reservation.to.isBetween(filterValues.start, filterValues.end) ||
        reservation.from.isBetween(filterValues.start, filterValues.end)
    );
    return { ...room, reserved, reservations };
  });
  return filteredList;
};

const formatRoomList = (rooms, filterValues) => {
  const rawRoomList = dateToMoment(rooms);
  const filteredRoomList = filterRooms(rawRoomList, filterValues);
  return { rawRoomList, filteredRoomList };
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_UPDATE_FILTER:
      return {
        ...state,
        filterValues: action.payload.filterValues,
        filteredRoomList: filterRooms(state.rawRoomList, action.payload.filterValues)
      };
    case ROOM_RESET_FILTER:
      return {
        ...state,
        filterValues: initialState.filterValues
      };
    case ROOM_FETCHING_ROOMS:
      return {
        ...state,
        rawRoomList: [],
        filteredRoomList: []
      };
    case ROOM_FETCHED_ROOMS:
      return { ...state, ...formatRoomList(action.payload.rooms, state.filterValues) };
    case ROOM_UPDATE_SELECTED:
      return {
        ...state,
        selectedRoomName: action.payload.roomName
      };
    case ROOM_UPDATE_FLOOR:
      return {
        ...state,
        selectedFloorName: action.payload.floorName
      };
    case ROOM_MAKE_RESERVATION:
      return {
        ...state,
        filterValues: {
          ...state.filterValues,
          start: moment(),
          end: moment().add(0.5, 'hours')
        },
        selectedRoomName: ''
      };
    default:
      return state;
  }
};

export default roomReducer;
