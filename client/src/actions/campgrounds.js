import axios from 'axios';
import { useSelector } from 'react-redux';
import { setAlert } from './alert';
import {
  GET_STATE_PARKS_SUCCESS,
  GET_STATE_PARKS_FAIL,
  GET_PARK_CAMPS_SUCCESS,
  GET_PARK_CAMPS_FAIL,
  TESTING,
} from './constants';

// const dispatchThenRoute = (myAction, myPath) => {
//   return dispatch => {
//     dispatch(myAction);
//     browserHistory.push(myPath);
//   };
// };

export const getStateParks = stateID => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/parks/${stateID}`);
    const load = { state: stateID, data: res.data.data };
    dispatch({ type: GET_STATE_PARKS_SUCCESS, payload: load });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: GET_STATE_PARKS_FAIL });
  }
};

export const getParkCamps = stateID => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/campgrounds`);
    console.log(res);
    dispatch({ type: TESTING });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: TESTING });
  }
};

// export const getParkCamps = parkSlug => async dispatch => {
//   try {
//     const state = useSelector(state => state.campgrounds.stateName);
//     console.log(state);
//     const res = await axios.get(`/api/v1/${state}/${parkSlug}`);
//     const load = { park: parkName, data: res.data.data };
//     //   dispatch({ type: GET_PARK_CAMPS_SUCCESS, payload: load });
//   } catch (err) {
//     dispatch(setAlert(err.response.data.error, 'danger'));
//     dispatch({ type: GET_PARK_CAMPS_FAIL });
//   }
// };

export const getCamps = () => dispatch => {
  return useSelector(state => state.campgrounds.parkData);
};
