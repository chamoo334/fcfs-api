import React, { Fragment } from 'react';

const UpdatePasswordForm = changeFunc => {
  return (
    <Fragment>
      <div className='form-group'>
        <input
          type='password'
          placeholder='New Password'
          minLength='7'
          name='newPassword'
          onChange={changeFunc}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Current Password'
          minLength='7'
          name='currentPassword'
          onChange={changeFunc}
          required
        />
      </div>
      <input
        type='submit'
        value='Update Password'
        className='btn btn-primary'
      />
    </Fragment>
  );
};

export default UpdatePasswordForm;
