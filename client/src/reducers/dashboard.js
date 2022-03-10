import {
  USER_LOADED,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  SUBMIT_CAMPGROUND_SUCCESS,
  SUBMIT_CAMPGROUND_FAIL,
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isConfirmed: false,
  loading: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isConfirmed: false,
        loading: false,
      };
    default:
      return state;
  }
}
