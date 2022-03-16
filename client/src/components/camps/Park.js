import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
// import {  } from '../../actions/campgrounds';

const Park = () => {
  const { parkSlug } = useParams();
  const location = useLocation();
  let campsComplete = false;
  const { parkName } = location.state;
  const [campsData, setCampsData] = useState(null);
  const dispatch = useDispatch();

  return (
    <section className='container'>
      <Link to='/states' className='btn'>
        Back to All Parks
      </Link>
      <h1 className='large text-primary'>{parkName}</h1>
      <p className='lead'>
        <i className='fas fa-campground'>
          Registered users can click on image to join a campground's discussion.
        </i>
      </p>
      <div className='campgrounds'>
        <div className='campground bg-light'>
          <Link to={`/campground/campgroundSlug`} className='btn'>
            <img
              className='round-img'
              src={require('../../img/photo-camp-no-photo.jpg')}
              alt='campground'
            />
          </Link>
          <div>
            <h2>Campground 1</h2>
            <p>Location</p>
            <p>Votes</p>
          </div>
          <ul>
            <li className='text-primary'>Fee: $20</li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Toilet
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Water
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'></i> Open All Year
            </li>
            <li className='text-primary'>Date last modified: 2022-02-24</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Park;
