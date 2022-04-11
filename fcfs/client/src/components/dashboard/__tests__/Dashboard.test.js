import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Dashboard from '../Dashboard';

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

describe('Dashboard Authenticated User Rendering', () => {
  beforeEach(() => {
    container = renderWithRedux(<Dashboard />, {
      initialState: {
        alert: [],
        auth: {
          token: '1',
          isAuthenticated: true,
          isConfirmed: true,
          loading: false,
          user: {
            name: 'Test User',
            email: 'user@test.com',
            role: 'user',
            campgroundContributions: 0,
            totalComments: 0,
            isEmailConfirmed: true,
            createdAt: '2022-04-06T04:56:41.186Z',
          },
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

  it('confirm loading spinner renders', () => {
    expect(container.getByText(/Test User/)).toBeInTheDocument();
  });
});
