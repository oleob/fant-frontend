import axios from 'axios';
import moment from 'moment';

const ROOM_UPDATE_FILTER = 'ROOM_UPDATE_FILTER';
const ROOM_RESET_FILTER = 'ROOM_RESET_FILTER';
const ROOM_FETCHING_ROOMS = 'ROOM_FETCHING_ROOMS';
const ROOM_FETCHED_ROOMS = 'ROOM_FETCHED_ROOMS';
const ROOM_UPDATE_SELECTED = 'ROOM_UPDATE_SELECTED';

const dateToMoment = filterValues => {
  const newValues = { ...filterValues };
  newValues.start = moment(filterValues.start);
  newValues.end = moment(filterValues.end);
  return newValues;
};

const updateFilter = filterValues => dispatch => {
  const formattedValues = dateToMoment(filterValues);
  if (formattedValues.start.isBefore(formattedValues.end)) {
    dispatch({ type: ROOM_UPDATE_FILTER, payload: { filterValues: formattedValues } });
  }
};

const updateSelectedRoom = roomName => dispatch => {
  dispatch({ type: ROOM_UPDATE_SELECTED, payload: { roomName } });
};

const resetFilter = () => dispatch => {
  dispatch({ type: ROOM_RESET_FILTER });
};

const fetchRooms = floor => dispatch => {
  dispatch({ type: ROOM_FETCHING_ROOMS });
  axios.get(`/api/floors/?name=${floor}`).then(res => {
    dispatch({ type: ROOM_FETCHED_ROOMS, payload: res.data.floor });
  });
};

export { updateFilter, resetFilter, fetchRooms, updateSelectedRoom };
export {
  ROOM_UPDATE_FILTER,
  ROOM_RESET_FILTER,
  ROOM_FETCHING_ROOMS,
  ROOM_FETCHED_ROOMS,
  ROOM_UPDATE_SELECTED
};
