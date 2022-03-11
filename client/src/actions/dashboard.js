import {
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_FAIL,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  SUBMIT_CAMPGROUND_SUCCESS,
  SUBMIT_CAMPGROUND_FAIL,
} from './constants';
import { loadUser } from './auth';
import axios from 'axios';
import { setAlert } from './alert';

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
    await axios.put('/api/v1/auth/updatedetails', body, config);
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
      await axios.put('/api/v1/auth/updatepassword', body, config);
      dispatch(setAlert('Password updated!', 'success'));
    } catch (err) {
      dispatch(setAlert(err.response.data.error, 'danger'));
    }
  };

export const submitCampground = campData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(campData);
  console.log(campData);
};
