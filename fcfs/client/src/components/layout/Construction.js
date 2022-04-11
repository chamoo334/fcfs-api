import React, { Fragment } from 'react';
import construction from './construction.gif';

const Construction = () => {
  return (
    <Fragment>
      <section className='container'>
        <img src={construction} style={{ width: '600px' }} alt='Loading..' />
      </section>
    </Fragment>
  );
};

export default Construction;
