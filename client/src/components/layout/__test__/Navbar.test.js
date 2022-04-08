import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Navbar from '../Navbar';

afterEach(cleanup);

const startState = {
  alert: [],
  auth: {
    token: null,
    isAuthenticated: false,
    isConfirmed: false,
    loading: false,
    user: null,
  },
  campgrounds: {
    stateName: '',
    parkName: '',
    campgroundName: '',
    stateData: [],
    parkData: [],
    campgroundData: {},
    loading: false,
  },
  api: {
    cur_api_vers: '1',
  },
  dashboard: {},
};
function reducer(state = startState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

// provider helper
function renderWithRedux(
  ui,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    ),
    store,
  };
}

let container;

describe('Navbar Unauthenticated User Rendering', () => {
  beforeEach(() => {
    container = renderWithRedux(<Navbar />);
  });

  it('unauthenticated user links', () => {
    expect(container.queryAllByRole('link')).toHaveLength(5);
  });
});

describe('Navbar Authenticated User Rendering', () => {
  beforeEach(() => {
    container = renderWithRedux(<Navbar />, {
      initialState: {
        alert: [],
        auth: {
          token: null,
          isAuthenticated: true,
          isConfirmed: false,
          loading: false,
          user: null,
        },
        campgrounds: {
          stateName: '',
          parkName: '',
          campgroundName: '',
          stateData: [],
          parkData: [],
          campgroundData: {},
          loading: false,
        },
        api: {
          cur_api_vers: '1',
        },
        dashboard: {},
      },
    });
  });

  it('authenticated user links', () => {
    expect(container.queryAllByRole('link')).toHaveLength(4);
  });
});
