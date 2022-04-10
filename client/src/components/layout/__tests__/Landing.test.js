import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Landing from '../Landing';

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

describe('Landing Unauthenticated User Rendering', () => {
  beforeEach(() => {
    container = renderWithRedux(<Landing />);
  });

  it('unauthenticated user links', () => {
    expect(container.queryAllByRole('link')).toHaveLength(2);
  });
});

describe('Landing Authenticated User Rendering', () => {
  beforeEach(() => {
    container = renderWithRedux(<Landing />, {
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
    expect(container.queryAllByRole('link')).toHaveLength(1);
  });
});
