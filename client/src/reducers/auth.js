import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAIL,
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
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isConfirmed: false,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isConfirmed: false,
        loading: false,
      };
    case CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: true,
        isConfirmed: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isConfirmed: false,
        loading: false,
      };
    case CONFIRM_EMAIL_FAIL:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isConfirmed: false,
        loading: false,
        user: null,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isConfirmed: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
