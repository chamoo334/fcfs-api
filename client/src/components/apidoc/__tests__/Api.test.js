import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Api from '../Api';

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

it('renders with redux', () => {
  renderWithRedux(<Api />);
});
