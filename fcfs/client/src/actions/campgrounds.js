import axios from 'axios';
import { setAlert } from './alert';
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
  UPVOTE_CAMPGROUND_SUCCESS,
  UPVOTE_CAMPGROUND_FAIL,
  DOWNVOTE_CAMPGROUND_SUCCESS,
  DOWNVOTE_CAMPGROUND_FAIL,
  UPDATE_CAMPGROUND_SUCCESS,
  UPDATE_CAMPGROUND_FAIL,
} from './constants';

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

export const removeStateParks = navigate => async dispatch => {
  try {
    dispatch({ type: REMOVE_STATE_PARKS_SUCCESS });
    navigate('/states');
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: REMOVE_STATE_PARKS_FAIL });
  }
};

export const getParkCamps =
  (state, pName, pSlug, navigate) => async dispatch => {
    try {
      const res = await axios.get(`/api/v1/${state}/${pSlug}`);
      const load = { park: pName, data: res.data.data };
      dispatch({ type: GET_PARK_CAMPS_SUCCESS, payload: load });
      navigate(`/park/${pSlug}`);
    } catch (err) {
      dispatch(setAlert(err.response.data.error, 'danger'));
      dispatch({ type: GET_PARK_CAMPS_FAIL });
    }
  };

export const removeParkCamps = navigate => async dispatch => {
  try {
    dispatch({ type: REMOVE_PARK_CAMPS_SUCCESS });
    navigate('/states');
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: REMOVE_PARK_CAMPS_FAIL });
  }
};

export const getCampground =
  (state, pSlug, cName, cSlug, navigate) => async dispatch => {
    try {
      const res = await axios.get(`/api/v1/${state}/${pSlug}/${cSlug}`);
      const load = { campground: cName, data: res.data.data[0] };
      dispatch({ type: GET_CAMPGROUND_SUCCESS, payload: load });
      navigate(`/camp/${cSlug}`);
    } catch (err) {
      dispatch(setAlert(err.response.data.error, 'danger'));
      dispatch({ type: GET_CAMPGROUND_FAIL });
    }
  };

export const removeCampground = (navigate, parkSlug) => async dispatch => {
  try {
    dispatch({ type: REMOVE_CAMPGROUND_SUCCESS });
    navigate(`/park/${parkSlug}`);
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: REMOVE_CAMPGROUND_FAIL });
  }
};

export const voteCampground = (state, pSlug, cSlug, up) => async dispatch => {
  let url = `/api/v1/${state}/${pSlug}/${cSlug}/`;
  let actReduce = null;
  if (up) {
    url += 'good';
    actReduce = [UPVOTE_CAMPGROUND_SUCCESS, UPVOTE_CAMPGROUND_FAIL];
  } else {
    url += 'bad';
    actReduce = [DOWNVOTE_CAMPGROUND_SUCCESS, DOWNVOTE_CAMPGROUND_FAIL];
  }

  try {
    const res = await axios.put(url);
    dispatch({ type: actReduce[0], payload: res.data.resData });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: actReduce[1] });
  }
};

export const updateCampground =
  (state, pSlug, cSlug, campData) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify(campData);

    try {
      const res = await axios.put(
        `/api/v1/${state}/${pSlug}/${cSlug}`,
        body,
        config
      );
      dispatch({ type: UPDATE_CAMPGROUND_SUCCESS, payload: res.data.resData });
    } catch (err) {
      dispatch(setAlert(err.response.data.error, 'danger'));
      dispatch({ type: UPDATE_CAMPGROUND_FAIL });
    }
  };
