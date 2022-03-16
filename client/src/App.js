import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import ConfirmEmail from './components/auth/ConfirmEmail';
import States from './components/camps/States';
import Api from './components/apidoc/Api';

import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import Park from './components/camps/Park';

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route
            path='dashboard'
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            exact
            path='/resetpassword/:resetToken'
            element={<ResetPassword />}
          />
          <Route exact path='/confirmemail' element={<ConfirmEmail />} />
          <Route exact path='/states' element={<States />} />
          <Route exact path='/park/:parkSlug' element={<Park />} />
          <Route exact path='/apidocs' element={<Api />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
