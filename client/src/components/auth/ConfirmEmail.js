import React, { Fragment, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail } from '../../actions/auth';

const ConfirmEmail = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const token = query.get('token');

  const dispatch = useDispatch();

  useEffect(() => {
    const confirm = async () => {
      dispatch(confirmEmail(token));
    };

    confirm();
  });

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Confirming Email...</h1>
      </section>
    </Fragment>
  );
};

export default ConfirmEmail;
