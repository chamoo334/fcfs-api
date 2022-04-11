import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Login from '../Login';

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

describe('Login Rendering', () => {
  beforeEach(() => {
    container = renderWithRedux(<Login />);
  });

  it('renders with redux', () => {
    expect(container.getByText('Sign In')).toBeInTheDocument();
  });

  it('form renders', () => {
    expect(container.queryAllByRole('form')).toHaveLength(1);
    expect(container.queryAllByRole('button')).toHaveLength(2);
  });

  it('form renders', () => {
    expect(container.queryAllByRole('form')).toHaveLength(1);
  });

  it('buttons render', () => {
    expect(container.queryAllByRole('button')).toHaveLength(2);
  });

  it('register link renders', () => {
    expect(container.queryAllByRole('link')).toHaveLength(1);
  });
});
