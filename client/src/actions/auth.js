import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
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
    dispatch({ type: USER_LOADED, payload: res.data });
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
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = (name, password) => async dispatch => {
  try {
    await axios.get('/api/v1/auth/logout');
    dispatch({ type: LOGOUT });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
  }
};

export const updateDetails = (name, email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let preBody = {};

  if (name.length > 0) {
    preBody['name'] = name;
  }

  if (email.length > 0) {
    preBody['email'] = email;
  }

  const body = JSON.stringify(preBody);
  try {
    await axios.get('/api/v1/auth/updatedetails', body, config);
    dispatch(loadUser());
    dispatch(setAlert('Details updated!', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
  }
};

export const updatePassword =
  (newPassword, currentPassword) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ newPassword, currentPassword });
    try {
      await axios.get('/api/v1/auth/updatepassword', body, config);
      dispatch(setAlert('Password updated!', 'success'));
    } catch (err) {
      dispatch(setAlert(err.response.data.error, 'danger'));
    }
  };
