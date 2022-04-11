import React, { Fragment } from 'react';

const UpdateDetailsForm = changeFunc => {
  return (
    <Fragment>
      <div className='form-group'>
        <input
          type='text'
          placeholder='Name'
          name='name'
          onChange={changeFunc}
        />
      </div>
      <div className='form-group'>
        <input
          type='email'
          placeholder='Email'
          name='email'
          onChange={changeFunc}
        />
      </div>
      <input
        type='submit'
        value='Update User Details'
        className='btn btn-primary'
      />
    </Fragment>
  );
};

export default UpdateDetailsForm;
