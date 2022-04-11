import React, { Fragment, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });

  const dispatch = useDispatch();

  const { password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(resetPassword(password, resetToken));
      return <Navigate to='/login' />;
    }
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Reset You Password</h1>

        <form onSubmit={onSubmit} className='form'>
          <div className='form-group'>
            <input
              type='password'
              placeholder='New Password'
              name='password'
              value={password}
              onChange={onChange}
              minLength='7'
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm New Password'
              name='password2'
              value={password2}
              onChange={onChange}
              minLength='7'
            />
          </div>
          <input type='submit' value='Reset' className='btn btn-primary' />
        </form>
      </section>
    </Fragment>
  );
};

export default ResetPassword;
