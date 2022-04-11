import React, { Fragment } from 'react';

const SubmitCampgroundForm = (genChangeFunc, checkChangeFunc) => {
  const states = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];
  return (
    <Fragment>
      <div className='form-group'>
        <input
          type='text'
          placeholder="Campground's Name"
          name='campgroundName'
          // value={campground}
          onChange={genChangeFunc}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='text'
          placeholder="Park's Name"
          name='parkName'
          onChange={genChangeFunc}
          required
        />
      </div>
      <div className='side-by-side'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='123 Address St'
            name='streetAddress'
            onChange={genChangeFunc}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='City'
            name='city'
            onChange={genChangeFunc}
            required
          />
        </div>
        <div
          className='form-group'
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginRight: '35px',
          }}>
          <label className='checkboxtext'>State:</label>
          <select name='stateIdentifier' onChange={genChangeFunc} required>
            <option value=''>{''}</option>
            {states.map(state => (
              <option value={state} key={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <input
            type='text'
            pattern='[0-9]*'
            placeholder='Zip Code (Numbers Only)'
            name='zipCode'
            onChange={genChangeFunc}
            required
          />
        </div>
      </div>
      <div className='side-by-side'>
        <div className='form-group'>
          <input
            type='text'
            pattern='[0-9]*'
            placeholder='$ Fee (Numbers Only)'
            name='fee'
            onChange={genChangeFunc}
            required
          />
        </div>
        <div className='form-group side-by-side side-by-side'>
          <label className='checkboxtext'>Toilet? {'  '}</label>
          <input type='checkbox' name='toilet' onChange={checkChangeFunc} />
        </div>
        <div className='form-group side-by-side'>
          <label className='checkboxtext'>Water?</label>
          <input type='checkbox' name='water' onChange={checkChangeFunc} />
        </div>
        <div className='form-group side-by-side'>
          <label className='checkboxtext'>Year Round?</label>
          <input type='checkbox' name='yearRound' onChange={checkChangeFunc} />
        </div>
        <div className='form-group side-by-side'>
          <label className='checkboxtext'>Vote:</label>
          <select name='vote' onChange={genChangeFunc}>
            <option value=''>{''}</option>
            <option value='1'>Good</option>
            <option value='-1'>Bad</option>
          </select>
        </div>
      </div>

      <input
        type='submit'
        value='Submit Campground'
        className='btn btn-primary'
      />
    </Fragment>
  );
};

export default SubmitCampgroundForm;
