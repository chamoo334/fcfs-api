import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, forgotPassword } from '../../actions/auth';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const dispatch = useDispatch();

  const { name, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    dispatch(login(name, password));
  };

  const forgottenPassword = async e => {
    e.preventDefault();
    dispatch(forgotPassword(name));
  };

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign into your account
        </p>
        <form onSubmit={onSubmit} className='form' aria-label='form'>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </div>
          <input type='submit' value='Login' className='btn btn-primary' />
          <input
            type='button'
            onClick={forgottenPassword}
            value='Forgot Password?'
            className='btn btn-danger'
          />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
