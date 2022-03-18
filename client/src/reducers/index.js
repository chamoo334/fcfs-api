import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import campgrounds from './campgrounds';
import api from './api';
import dashboard from './dashboard';

const rootReducer = combineReducers({
  alert,
  auth,
  campgrounds,
  api,
  dashboard,
});

export default rootReducer;
