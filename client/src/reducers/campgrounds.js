import {
  GET_STATE_PARKS_SUCCESS,
  GET_STATE_PARKS_FAIL,
  GET_PARK_CAMPS_SUCCESS,
  GET_PARK_CAMPS_FAIL,
  TESTING,
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
    case GET_STATE_PARKS_FAIL:
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
    case GET_PARK_CAMPS_FAIL:
      return {
        ...state,
        parkName: '',
        parkData: [],
      };
    case TESTING:
      return state;
    default:
      return state;
  }
}
