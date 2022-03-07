import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const auth = useSelector(state => state.auth);

  const authLinks = (
    <div className='buttons'>
      <Link to='/user' className='btn btn-primary'>
        View Profile & Stats
      </Link>
    </div>
  );

  const guestLinks = (
    <div className='buttons'>
      <Link to='/register' className='btn btn-primary'>
        Sign Up
      </Link>
      <Link to='/login' className='btn btn-light'>
        Login
      </Link>
    </div>
  );

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>First Come First Serve API & Community</h1>
          <p className='lead'>
            Community driven collection of campgrounds that do not accept
            reservations. Join to contribute campground data, reviews, and tips
            with other spontaneous campers.
          </p>
          <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
        </div>
      </div>
    </section>
  );
};

export default Landing;
