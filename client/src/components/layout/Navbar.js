import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-toilet-paper'></i> FCFS Community
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='/states'>Campgrounds</Link>
        </li>
        <li>
          <Link to='/apidocs'>FCFS API</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};
