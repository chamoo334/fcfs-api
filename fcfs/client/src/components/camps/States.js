import React from 'react';
import MapChart from './MapChart';

const States = () => {
  return (
    <section className='container'>
      <h1 className='large text-primary'>Campgrounds</h1>
      <p className='lead'>
        <i className='fas fa-campground'>
          Select a state to view a list of parks. Select a park name to be
          directed to a list of campground.
        </i>
      </p>
      <div className='state'>
        <div role='state-div'>
          <MapChart />
        </div>
      </div>
    </section>
  );
};

export default States;
