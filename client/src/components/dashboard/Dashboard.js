import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDetails, updatePassword } from '../../actions/auth';

const Dashboard = () => {
  const user = useSelector(state => state.auth.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    currentPassword: '',
  });

  const dispatch = useDispatch();

  const { name, email, newPassword, currentPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitDetails = async e => {
    e.preventDefault();
    dispatch(updateDetails(name, email));
  };

  const onSubmitPassword = async e => {
    e.preventDefault();
    dispatch(updatePassword(newPassword, currentPassword));
  };
  return (
    <section className='container'>
      <div className='campground-grid my-1'>
        <div className='bg-primary p-2'>
          <section className='campgroung-left'>
            <img
              className='round-img'
              src='img/photo-user-no-photo.jpg'
              height='500'
              alt='anonymous user'
            />
          </section>
          <section className='campground-right_top'>
            <h1 className='large'>{user.name}</h1>
            <h2 className='medium'>Role: {user.role}</h2>
            {user.role === 'user' && (
              <p> Comment or submit a campground to upgrade to contributor</p>
            )}
          </section>
        </div>

        <div className='campground-amenities bg-light pg-2'>
          <div className='line'></div>
          <h2 className='amenities-header text-primary'>User Stats</h2>
          <div className='amenities'>
            <ul>
              <li>12 Campground Contributions</li>
              <li>30 Comments w/ 56% upvotes</li>
            </ul>
          </div>
        </div>

        <div className='campground-comment bg-white p-2'>
          <h2 className='text-primary'>Recent Comment 1</h2>
          <div>
            <p>Under Construction</p>
          </div>
        </div>
      </div>
      <section className='container'>
        <h1 className='medium text-primary'>Update Details</h1>
        <form onSubmit={onSubmitDetails} className='form'>
          <div className='form-group'>
            <input type='text' placeholder='Name' />
          </div>
          <div className='form-group'>
            <input type='email' placeholder='Email' />
          </div>
          <input type='submit' value='Update' className='btn btn-primary' />
        </form>
      </section>
      <section className='container'>
        <h1 className='medium text-primary'>Change Password</h1>
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
          <input type='submit' value='Update' className='btn btn-primary' />
        </form>
      </section>
    </section>
  );
};

export default Dashboard;