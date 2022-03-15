import React from 'react';
import MapChart from './MapChart';

const States = () => {
  return (
    <section className='container'>
      <h1 className='large text-primary'>Campgrounds</h1>
      <p className='lead'>
        <i className='fas fa-campground'>
          Select a state to view a list of parks. Select a park to view
          campgrounds.
        </i>
      </p>
      <div className='state'>
        {/* TODO: redirect to reload */}
        Below should dropdown when image is clicked
        <div>
          <MapChart />
        </div>
        <div className='state-park bg-light'>
          <h2>Alabama</h2>
          <h3>
            <a href='park.html' className='btn'>
              {' '}
              Clickable Park 2
            </a>
          </h3>
          <section>
            <input type='checkbox' id='al' className='accordion'></input>
            <label for='al'>
              <span></span>
              <a href='park.html' className='btn'>
                {' '}
                Clickable Park 1
              </a>
            </label>
            <article>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                voluptatum nihil tenetur. Magnam vero mollitia modi cupiditate
                adipisci enim in labore. Provident explicabo nulla impedit.
              </p>
            </article>
          </section>
        </div>
      </div>
    </section>
  );
};

export default States;
