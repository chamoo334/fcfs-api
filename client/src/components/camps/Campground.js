import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateCampground,
  voteCampground,
  removeCampground,
} from '../../actions/campgrounds';
import Construction from '../layout/Construction';
import Spinner from '../layout/Spinner';
import UpdateCampForm from './UpdateCampForm';
import { setAlert } from '../../actions/alert';

const Campground = () => {
  const [campData, setCampData] = useState(null);
  const [displayForm, setDisplayForm] = useState(<div></div>);
  const [formData, setFormData] = useState({
    streetAddress: '',
    zipCode: '',
    city: '',
    fee: '',
    toilet: false,
    water: false,
    yearRound: false,
  });
  const { streetAddress, zipCode, city, fee, toilet, water, yearRound } =
    formData;
  const stateName = useSelector(state => state.campgrounds.stateName);
  const stateParks = useSelector(state => state.campgrounds.stateData);
  const parkName = useSelector(state => state.campgrounds.parkName);
  const parkSlug = stateParks.find(park => park.name === parkName).slug;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const camp = useSelector(state => state.campgrounds.campgroundData);
  useEffect(() => {
    setCampData(camp);
  }, [camp]);

  const campVote = isUpVote => async e => {
    e.preventDefault();
    dispatch(voteCampground(stateName, parkSlug, campData.slug, isUpVote));
  };

  const isLongerThan0 = value => {
    return value.length > 0;
  };

  const onSubmitDetails = async e => {
    e.preventDefault();
    let campUpdate = {};
    if (isLongerThan0(formData.streetAddress)) {
      if (!isLongerThan0(formData.city) || !isLongerThan0(formData.zipCode)) {
        dispatch(
          setAlert(
            'Street Address, city, and zip code are required to update address',
            'danger'
          )
        );
        return;
      }
      campUpdate.address =
        formData.streetAddress +
        ' ' +
        formData.city +
        ' ' +
        campData.state +
        ' ' +
        formData.zipCode;
    }

    if (isLongerThan0(formData.fee)) {
      campUpdate.fee = formData.fee;
    }

    if (formData.toilet) {
      if (!campData.toilet) {
        campUpdate.toilet = 'true';
      } else {
        campUpdate.toilet = formData.toilet;
      }
    }

    if (formData.water) {
      if (!campData.water) {
        campUpdate.water = 'true';
      } else {
        campUpdate.water = formData.water;
      }
    }

    if (formData.yearRound) {
      if (!campData.yearRound) {
        campUpdate.yearRound = 'true';
      } else {
        campUpdate.yearRound = formData.yearRound;
      }
    }
    if (!isLongerThan0(Object.keys(campUpdate))) {
      dispatch(setAlert('Unable to submit empty form', 'danger'));
      return;
    }

    dispatch(updateCampground(stateName, parkSlug, campData.slug, campUpdate));
  };

  const onChange = e => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    let tempFormData = formData;
    tempFormData[e.target.name] = e.target.value;
    return tempFormData;
  };

  const checkboxChange = e => {
    let tempFormData = formData;
    tempFormData[e.target.name] = e.target.checked;
    return tempFormData;
  };

  const updateDetailsBtn = async e => {
    e.preventDefault();
    setDisplayForm(
      <form onSubmit={onSubmitDetails} className='form'>
        {UpdateCampForm(onChange, checkboxChange)}
      </form>
    );
  };

  const goBackSubmit = e => {
    e.preventDefault();
    dispatch(removeCampground(navigate, parkSlug));
  };

  const formArea = useRef();
  useEffect(() => {
    const clearDisplayForm = e => {
      if (formArea.current !== null) {
        if (!formArea.current.contains(e.target)) {
          setDisplayForm(<div></div>);
          setFormData({
            streetAddress: '',
            zipCode: '',
            city: '',
            fee: '0',
            toilet: 'false',
            water: 'false',
            yearRound: 'false',
          });
        }
      }
    };
    document.body.addEventListener('click', clearDisplayForm);

    return () => {
      document.body.removeEventListener('click', clearDisplayForm);
    };
  }, []);
  return campData === null ? (
    <Spinner />
  ) : (
    <section className='container'>
      <form className='form' onSubmit={goBackSubmit}>
        <input
          type='submit'
          value='Back to All Campgrounds'
          className='btn'
          style={{ fontSize: '18px' }}
        />
      </form>
      <div className='campground-grid my-1'>
        {/* TOP */}
        <div className='campground-top bg-primary p-2'>
          <section className='campground-left'>
            <img
              className='round-img'
              src={require('../../img/photo-camp-no-photo.jpg')}
              alt='campground'
            />
          </section>
          <section className='campground-right_top'>
            <h1>{campData.name}</h1>
            <h2>{campData.location.formattedAddress}</h2>
            <h2>
              Coordinates: {campData.location.coordinates[0]},
              {campData.location.coordinates[1]}
            </h2>
            <h2>
              {campData.votes.total > 0
                ? `${campData.votes.percentPos} % Positive out of ${campData.votes.total} votes`
                : `Votes: ${campData.votes.total}`}
            </h2>
            <h2>
              Last Update: {campData.lastUpdate.substring(0, 10)} By:{' '}
              {campData.lastModifiedBy}
            </h2>
          </section>
          <section className='campground-right-bottom m-2'>
            <ul>
              <li>
                <form className='form m-1' onSubmit={campVote(true)}>
                  <button type='submit' className='btn btn-plain'>
                    <i className='fas fa-thumbs-up fa-6x'></i>
                  </button>
                </form>
              </li>{' '}
              <li>
                <form className='form m-1' onSubmit={campVote(false)}>
                  <button type='submit' className='btn btn-plain'>
                    <i className='fas fa-thumbs-down fa-6x'></i>
                  </button>
                </form>
              </li>
            </ul>
          </section>
        </div>
        {/* About */}
        <div ref={formArea} className='campground-amenities bg-light pg-2'>
          <button
            onClick={updateDetailsBtn}
            className='medium amenities-header text-primary'>
            <h1 className='text-primary btn'>Amenities</h1>
          </button>
          <div className='amenities'>
            <ul>
              <li>Fee: ${campData.fee}</li>
              <li>
                {' '}
                Toilet:{' '}
                {campData.toilet ? (
                  <i className='far fa-smile'></i>
                ) : (
                  <i className='far fa-frown'></i>
                )}
              </li>
              <li>
                {' '}
                Water:{' '}
                {campData.water ? (
                  <i className='far fa-smile'></i>
                ) : (
                  <i className='far fa-frown'></i>
                )}
              </li>
              <li>
                {' '}
                Open All Year:{' '}
                {campData.water ? (
                  <i className='far fa-smile'></i>
                ) : (
                  <i className='far fa-frown'></i>
                )}
              </li>
            </ul>
          </div>
          <div className='campground-amenities bg-light pg-2'>
            {displayForm}
          </div>
        </div>
        {/* Comments & Disccusion */}
        <div className='campground-comment bg-white p-2'>
          <h2 className='text-primary'>Comments</h2>
          <Construction />
        </div>
      </div>
    </section>
  );
};

export default Campground;
