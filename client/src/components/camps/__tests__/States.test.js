import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import States from '../States';

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

describe('States Rendering Empty', () => {
  beforeEach(() => {
    container = renderWithRedux(<States />);
  });

  // it('renders with redux', () => {
  //   expect(container).toBeVisible();
  // });

  it('empty map renders', () => {
    expect(container.queryByRole('state-div').childNodes[0]).toBeVisible();
  });
});

describe('States Rendering Data', () => {
  beforeEach(() => {
    container = renderWithRedux(<States />, {
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
          stateName: 'ca',
          parkName: '',
          campgroundName: '',
          stateData: [
            {
              location: {
                type: 'Point',
                coordinates: [-116.866158, 36.457097],
                formattedAddress:
                  '328 Greenland Blvd, Death Valley, CA 92328-9600, US',
              },
              name: 'Death Valley National Park',
              slug: 'death-valley-national-park',
              stateID: '620dbaac838b6897f4806f65',
            },
          ],
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

  let parkDisplay;

  it('map renders', () => {
    expect(container.queryByRole('state-div').childNodes[0]).toBeVisible();
  });

  it('selected state name displayed', () => {
    expect(container.queryAllByText('California')).toHaveLength(1);
  });

  it('selected state data displayed', () => {
    parkDisplay = container.queryAllByText('Death Valley National Park');
    expect(parkDisplay).toHaveLength(1);
    expect(parkDisplay[0]).toBeVisible();
  });
});
