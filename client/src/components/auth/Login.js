import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const { name, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log('success login');
  };

  // if (isAuthenticated) {
  //   return <Navigate to='/dashboard' />;
  // }

  return (
    <Fragment>
      <section className='container'>
        <div className='alert alert-danger'>Invalid Credentials</div>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign into your account
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
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </section>
    </Fragment>
  );
};

export default Login;
