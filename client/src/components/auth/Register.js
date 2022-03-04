import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';

// const Register = ({ setAlert }) => {
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
      // console.log('password error should alert');
      // setAlert('Passwords do not match', 'danger');
      dispatch(setAlert('Passwords do not match', 'danger'));
    } else {
      // register({ name, email, password });
      console.log(formData);
    }
  };

  // if (isAuthenticated) {
  //   return <Navigate to='/dashboard' />;
  // }

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign Up</h1>
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
            />
          </div>
          <input type='submit' value='Register' className='btn btn-primary' />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='login'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};

// Register.propTypes = {
//   setAlert: PropTypes.func.isRequired,
// };

// export default connect(null, { setAlert })(Register);
export default Register;
