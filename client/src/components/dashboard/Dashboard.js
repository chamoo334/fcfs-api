import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails, updatePassword } from '../../actions/dashboard';
import { setAlert } from '../../actions/alert';
import Spinner from '../layout/Spinner';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [displayForm, setDisplayForm] = useState(<div></div>);

  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    setUserData(user);
  }, [user]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    currentPassword: '',
    campgroundName: '',
    parkName: '',
  });

  const dispatch = useDispatch();

  const {
    name,
    email,
    newPassword,
    currentPassword,
    campgroundName,
    parkName,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitDetails = async e => {
    e.preventDefault();
    if (name.length === 0 && email.length === 0) {
      dispatch(setAlert('Both name and email cannot be empty.', 'danger'));
    } else {
      dispatch(updateDetails(name, email));
      setDisplayForm(<div></div>);
    }
  };

  const onSubmitPassword = async e => {
    e.preventDefault();
    dispatch(updatePassword(newPassword, currentPassword));
    setDisplayForm(<div></div>);
  };

  const onSubmitCampground = async e => {
    e.preventDefault();
    console.log('add campground');
    setDisplayForm(<div></div>);
  };

  const updateDetailsBtn = async e => {
    e.preventDefault();
    setDisplayForm(
      <form onSubmit={onSubmitDetails} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
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
        <input
          type='submit'
          value='Update User Details'
          className='btn btn-primary'
        />
      </form>
    );
  };

  const updatePasswordBtn = async e => {
    e.preventDefault();
    setDisplayForm(
      <form onSubmit={onSubmitPassword} className='form'>
        <div className='form-group'>
          <input
            type='password'
            placeholder='New Password'
            minLength='7'
            name='newPassword'
            value={newPassword}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Current Password'
            minLength='7'
            name='currentPassword'
            value={currentPassword}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Update Password'
          className='btn btn-primary'
        />
      </form>
    );
  };

  const submitCampgroundBtn = async e => {
    e.preventDefault();
    setDisplayForm(
      <form onSubmit={onSubmitCampground} className='form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder="Campground's Name"
            name='campgroundName'
            value={campgroundName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder="Park's Name"
            name='parkName'
            value={parkName}
            onChange={onChange}
            required
          />
        </div>
        <input
          type='submit'
          value='Submit Campground'
          className='btn btn-primary'
        />
      </form>
    );
  };

  return userData === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className='container'>
        <div className='campground-grid my-1'>
          <div className='bg-primary p-2'>
            <section className='campgroung-left'>
              <img
                className='round-img'
                src={require('../../img/photo-user-no-photo.jpg')}
                style={{ height: '500px' }}
                alt='user'
              />
            </section>
            <section className='campground-right_top'>
              <h1 className='large'>{userData.name}</h1>
              <h2 className='medium'>Role: {userData.role}</h2>
              {userData.role === 'user' && (
                <p>
                  {' '}
                  Submit a campground or comment or vote on a campground to
                  upgrade to contributor
                </p>
              )}
            </section>
          </div>

          <div className='campground-amenities bg-light pg-2'>
            <h2 className='amenities-header text-primary'>User Stats</h2>
            <div className='amenities'>
              <ul>
                <li>
                  {userData.campgroundContributions} Campground Contributions
                </li>
                <li>{userData.totalComments} Comments</li>
              </ul>
            </div>
          </div>
          <div className='campground-amenities bg-dark pg-2'>
            {/* <div ref={formRef} className='campground-amenities bg-dark pg-2'> */}
            <div className='amenities'>
              <ul>
                <li>
                  <button onClick={updateDetailsBtn}>
                    <h1 className='medium text-primary btn'>Update Details</h1>
                  </button>
                </li>
                <li>
                  <button onClick={updatePasswordBtn}>
                    <h1 className='medium text-primary btn'>Change Password</h1>
                  </button>
                </li>
                <li>
                  <button onClick={submitCampgroundBtn}>
                    <h1 className='medium text-primary btn'>
                      Submit Campground
                    </h1>
                  </button>
                </li>
              </ul>
            </div>
            <div className='campground-amenities bg-light pg-2'>
              {displayForm}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
