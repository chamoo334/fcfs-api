import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const dispatch = useDispatch();

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      dispatch(register({ name, email, password }));
      dispatch(setAlert('Check your email before loging in!', 'success'));
    }
  };

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
        <p>
          <h3>
            Notice: FCFS is currently under development and registration is by
            invite only. Please email dilt.fcfs@gmail.com for assistance with
            obtaining an account.
          </h3>
        </p>
        <p className='lead'>
          <i className='fas fa-user'></i>Create Your Account
        </p>

        <form onSubmit={onSubmit} className='form'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
            <small className='form-text'>*public user name</small>
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              minLength='7'
              name='password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              minLength='7'
              name='password2'
              value={password2}
              onChange={onChange}
              required
            />
          </div>
          <input type='submit' value='Register' className='btn btn-primary' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Register;
