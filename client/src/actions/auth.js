import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './constants';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth/me');
    dispatch({ type: USER_LOADED, payload: res.data.user });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const register =
  ({ name, email, password }) =>
  async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post('/api/v1/auth/register', body, config);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch(setAlert(err.response.data.error, 'danger'));
      dispatch({ type: REGISTER_FAIL });
    }
  };

export const login = (name, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, password });
  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: LOGIN_FAIL });
  }
};
