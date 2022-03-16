import {
  GET_STATE_PARKS_SUCCESS,
  GET_STATE_PARKS_FAIL,
  REMOVE_STATE_PARKS_SUCCESS,
  REMOVE_STATE_PARKS_FAIL,
  GET_PARK_CAMPS_SUCCESS,
  GET_PARK_CAMPS_FAIL,
  REMOVE_PARK_CAMPS_SUCCESS,
  REMOVE_PARK_CAMPS_FAIL,
  GET_CAMPGROUND_SUCCESS,
  GET_CAMPGROUND_FAIL,
  REMOVE_CAMPGROUND_SUCCESS,
  REMOVE_CAMPGROUND_FAIL,
} from '../actions/constants';

const initialState = {
  stateName: '',
  parkName: '',
  campgroundName: '',
  stateData: [],
  parkData: [],
  campgroundData: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_STATE_PARKS_SUCCESS:
      return {
        ...state,
        stateName: payload.state,
        stateData: payload.data,
      };
    case REMOVE_STATE_PARKS_SUCCESS:
      return {
        ...state,
        stateName: '',
        stateData: [],
      };
    case GET_PARK_CAMPS_SUCCESS:
      return {
        ...state,
        parkName: payload.park,
        parkData: payload.data,
      };
    case REMOVE_PARK_CAMPS_SUCCESS:
      return {
        ...state,
        parkName: '',
        parkData: [],
      };
    case GET_CAMPGROUND_SUCCESS:
      return {
        ...state,
        campgroundName: payload.campground,
        campgroundData: payload.data,
      };
    case REMOVE_CAMPGROUND_SUCCESS:
      return {
        ...state,
        campgroundName: '',
        campgroundData: [],
      };
    case GET_STATE_PARKS_FAIL:
    case GET_PARK_CAMPS_FAIL:
    case GET_CAMPGROUND_FAIL:
    case REMOVE_CAMPGROUND_FAIL:
    case REMOVE_STATE_PARKS_FAIL:
    case REMOVE_PARK_CAMPS_FAIL:
    default:
      return state;
  }
}
