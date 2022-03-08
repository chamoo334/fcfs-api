import React, { Fragment } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmEmail } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const ConfirmEmail = () => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const token = query.get('token');

  const dispatch = useDispatch();

  const confirm = async () => {
    dispatch(confirmEmail(token));
    return <Navigate to='/login' />;
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Confirming Email...</h1>
        {this.confirm()}
      </section>
    </Fragment>
  );
};

export default ConfirmEmail;
