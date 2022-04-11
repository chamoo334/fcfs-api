import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateDetails,
  updatePassword,
  submitCampground,
} from '../../actions/dashboard';
import { setAlert } from '../../actions/alert';
import Spinner from '../layout/Spinner';
import UpdateDetailsForm from './UpdateDetailsForm';
import UpdatePasswordForm from './UpdatePasswordForm';
import SubmitCampgroundForm from './SubmitCampgroundForm';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [displayForm, setDisplayForm] = useState(<div></div>);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    newPassword: '',
    currentPassword: '',
    campgroundName: '',
    parkName: '',
    stateIdentifier: '',
    streetAddress: '',
    zipCode: '',
    city: '',
    fee: '0',
    toilet: 'false',
    water: 'false',
    yearRound: 'false',
    vote: '',
  });
  const {
    name,
    email,
    newPassword,
    currentPassword,
    campgroundName,
    parkName,
    stateIdentifier,
    streetAddress,
    zipCode,
    city,
    fee,
    toilet,
    water,
    yearRound,
    vote,
  } = formData;

  const clearDisplayAndForm = () => {
    setDisplayForm(<div></div>);
    setFormData({
      name: '',
      email: '',
      newPassword: '',
      currentPassword: '',
      campgroundName: '',
      parkName: '',
      stateIdentifier: '',
      streetAddress: '',
      zipCode: '',
      city: '',
      fee: '',
      toilet: '',
      water: '',
      yearRound: '',
      vote: '',
    });
  };

  const user = useSelector(state => state.auth.user);
  useEffect(() => {
    setUserData(user);
  }, [user]);

  const formArea = useRef();
  useEffect(() => {
    const clearDisplayForm = e => {
      if (formArea.current !== null) {
        if (!formArea.current.contains(e.target)) {
          setDisplayForm(<div></div>);
          setFormData({
            name: '',
            email: '',
            newPassword: '',
            currentPassword: '',
            campgroundName: '',
            parkName: '',
            stateIdentifier: '',
            streetAddress: '',
            zipCode: '',
            city: '',
            fee: '',
            toilet: false,
            water: false,
            yearRound: false,
            vote: '',
          });
        }
      }
    };
    document.body.addEventListener('click', clearDisplayForm);

    return () => {
      document.body.removeEventListener('click', clearDisplayForm);
    };
  }, []);

  const dispatch = useDispatch();

  // FIXME: setFormData not consistent?
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

  const onSubmitDetails = async e => {
    e.preventDefault();
    if (name.length === 0 && email.length === 0) {
      dispatch(setAlert('Both name and email cannot be empty.', 'danger'));
    } else {
      dispatch(updateDetails(name, email));
      clearDisplayAndForm();
    }
  };

  const onSubmitPassword = async e => {
    e.preventDefault();
    dispatch(updatePassword(newPassword, currentPassword));
    clearDisplayAndForm();
  };

  const onSubmitCampground = async e => {
    e.preventDefault();

    let newCamp = {
      name: formData.campgroundName,
      park: formData.parkName,
      state: formData.stateIdentifier.toLocaleLowerCase(),
      address:
        formData.streetAddress +
        ' ' +
        formData.city +
        ' ' +
        formData.stateIdentifier +
        ' ' +
        formData.zipCode,
      fee: formData.fee,
      toilet: formData.toilet === true,
      water: formData.water === true,
      yearRound: formData.yearRound === true,
    };

    if (formData.vote.length > 0) {
      newCamp.vote = formData.vote;
    }

    dispatch(submitCampground(newCamp));
    // clearDisplayAndForm();
  };

  const updateDetailsBtn = async e => {
    e.preventDefault();
    setDisplayForm(
      <form onSubmit={onSubmitDetails} className='form'>
        {UpdateDetailsForm(onChange)}
      </form>
    );
  };

  const updatePasswordBtn = async e => {
    e.preventDefault();
    setDisplayForm(
      <form onSubmit={onSubmitPassword} className='form'>
        {UpdatePasswordForm(onChange)}
      </form>
    );
  };

  const submitCampgroundBtn = async e => {
    e.preventDefault();
    setDisplayForm(
      <form onSubmit={onSubmitCampground} className='form'>
        {SubmitCampgroundForm(
          onChange,
          checkboxChange,
          campgroundName,
          parkName,
          streetAddress,
          city,
          zipCode
        )}
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
          <div ref={formArea} className='campground-amenities bg-dark pg-2'>
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
