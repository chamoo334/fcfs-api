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
  }, []);

  const isConfirmed = useSelector(state => state.auth.isConfirmed);
  if (isConfirmed) {
    return <Navigate to='/login' />;
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
