import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CONFIRM_EMAIL_SUCCESS,
} from './constants';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth/me');
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
      const res = await axios.post('/api/auth/register', body, config);
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
    const res = await axios.post('/api/auth/login', body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = (name, password) => async dispatch => {
  try {
    await axios.get('/api/auth/logout');
    dispatch({ type: LOGOUT });
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
  }
};

export const forgotPassword = name => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name });
  try {
    await axios.post('/api/auth/forgotpassword', body, config);
    dispatch(
      setAlert(
        'A link to reset your password has been emailed to you!',
        'success'
      )
    );
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
  }
};

export const resetPassword = (password, resetToken) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ password });
  try {
    await axios.put(`/api/auth/resetpassword/${resetToken}`, body, config);
    dispatch(setAlert('Proceed to login with updated password!', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
  }
};

export const confirmEmail = confirmEmailToken => async dispatch => {
  try {
    await axios.get(`/api/auth/confirmemail?token=${confirmEmailToken}`);
    dispatch({ type: CONFIRM_EMAIL_SUCCESS });
    dispatch(setAlert('Email confirmed!', 'success'));
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'danger'));
  }
};
