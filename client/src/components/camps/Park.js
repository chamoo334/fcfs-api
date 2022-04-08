import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeParkCamps, getCampground } from '../../actions/campgrounds';

const Park = () => {
  const stateName = useSelector(state => state.campgrounds.stateName);
  const stateParks = useSelector(state => state.campgrounds.stateData);
  const parkName = useSelector(state => state.campgrounds.parkName);
  const camps = useSelector(state => state.campgrounds.parkData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goBackSubmit = e => {
    e.preventDefault();
    dispatch(removeParkCamps(navigate));
  };

  const campNameClick = (campName, campSlug) => async e => {
    e.preventDefault();
    const parkSlug = stateParks.find(park => park.name === parkName).slug;
    dispatch(getCampground(stateName, parkSlug, campName, campSlug, navigate));
  };

  const Campgrounds = () => {
    return (
      <div className='campgrounds'>
        <ul role='campground-list'>
          {camps.map(camp => (
            <div key={camp.slug} className='campground bg-light'>
              <img
                className='round-img btn'
                src={require('../../img/photo-camp-no-photo.jpg')}
                alt='campground'
                onClick={campNameClick(camp.name, camp.slug)}
              />
              <div>
                <h2>{camp.name}</h2>
                <p>{camp.location.formattedAddress}</p>
                <p>
                  Votes: {camp.votes.total} Positive: {camp.votes.percentPos} %
                </p>
              </div>
              <ul>
                <li className='text-primary'>Fee: ${camp.fee}</li>
                <li className='text-primary'>
                  {' '}
                  Toilet:{' '}
                  {camp.toilet ? (
                    <i className='far fa-smile'></i>
                  ) : (
                    <i className='far fa-frown'></i>
                  )}
                </li>
                <li className='text-primary'>
                  {' '}
                  Water:{' '}
                  {camp.water ? (
                    <i className='far fa-smile'></i>
                  ) : (
                    <i className='far fa-frown'></i>
                  )}
                </li>
                <li className='text-primary'>
                  {' '}
                  Open All Year:{' '}
                  {camp.water ? (
                    <i className='far fa-smile'></i>
                  ) : (
                    <i className='far fa-frown'></i>
                  )}
                </li>
                <li className='text-primary'>
                  Last Update: {camp.lastUpdate.substring(0, 10)}
                </li>
              </ul>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className='container'>
      <form className='form' onSubmit={goBackSubmit}>
        <input
          type='submit'
          value='Back to All Parks'
          className='btn'
          style={{ fontSize: '18px' }}
        />
      </form>
      <h1 className='large text-primary'>{parkName}</h1>
      <p className='lead'>
        <i className='fas fa-campground'>
          Registered users can click on image to join a campground's discussion.
        </i>
      </p>
      <Campgrounds />
    </section>
  );
};

export default Park;
