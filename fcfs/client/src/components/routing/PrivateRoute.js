import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) return <Component />;

  return <Navigate to='/login' />;
};

export default PrivateRoute;
