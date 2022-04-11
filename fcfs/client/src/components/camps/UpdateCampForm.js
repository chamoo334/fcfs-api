import React, { Fragment } from 'react';

const UpdateCampForm = (genChangeFunc, checkChangeFunc) => {
  return (
    <Fragment>
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
          />
        </div>
        <div
          className='form-group'
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginRight: '35px',
          }}></div>
        <div className='form-group'>
          <input
            type='text'
            pattern='[0-9]*'
            placeholder='Zip Code (Numbers Only)'
            name='zipCode'
            onChange={genChangeFunc}
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
          />
        </div>
        <div className='form-group side-by-side side-by-side'>
          <label className='checkboxtext'>Change Toilet? {'  '}</label>
          <input type='checkbox' name='toilet' onChange={checkChangeFunc} />
        </div>
        <div className='form-group side-by-side'>
          <label className='checkboxtext'>Change Water?</label>
          <input type='checkbox' name='water' onChange={checkChangeFunc} />
        </div>
        <div className='form-group side-by-side'>
          <label className='checkboxtext'>Change Year Round?</label>
          <input type='checkbox' name='yearRound' onChange={checkChangeFunc} />
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

export default UpdateCampForm;
