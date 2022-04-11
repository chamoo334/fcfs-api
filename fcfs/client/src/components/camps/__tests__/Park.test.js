import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Park from '../Park';

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
    stateName: 'ca',
    parkName: 'Death Valley National Park',
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
    parkData: [
      {
        location: {
          coordinates: [36.457097, -116.866158],
          formattedAddress:
            '328 Greenland Blvd, Death Valley, CA 92328-9600, US',
        },
        name: 'Mesquite Spring',
        park: 'Death Valley National Park',
        state: 'CA',
        fee: 14,
        toilet: true,
        water: true,
        yearRound: false,
        lastModifiedBy: 'chuck2',
        photo: 'photo-camp-no-photo.jpg',
        lastUpdate: '2022-03-15T00:30:07.906Z',
        slug: 'mesquite-spring',
        votes: {
          total: 2,
          percentPos: 50,
        },
        parkSlug: 'death-valley-national-park',
      },
      {
        location: {
          coordinates: [36.457097, -116.866158],
          formattedAddress:
            '328 Greenland Blvd, Death Valley, CA 92328-9600, US',
        },
        name: 'Emigrant',
        park: 'Death Valley National Park',
        state: 'CA',
        fee: 0,
        toilet: true,
        water: false,
        yearRound: true,
        lastModifiedBy: 'chuck2',
        photo: 'photo-camp-no-photo.jpg',
        lastUpdate: '2022-03-15T00:45:19.059Z',
        slug: 'emigrant',
        votes: {
          total: 2,
          percentPos: 100,
        },
        parkSlug: 'death-valley-national-park',
      },
    ],
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

describe('Park Rendering', () => {
  beforeEach(() => {
    container = renderWithRedux(<Park />);
  });

  it('renders park name', () => {
    expect(
      container.getByText('Death Valley National Park')
    ).toBeInTheDocument();
  });

  it('campground lists renders', () => {
    expect(container.queryByRole('campground-list')).toBeInTheDocument();
  });

  it('correct number of campgrounds', () => {
    expect(container.queryByRole('campground-list').childNodes).toHaveLength(2);
  });
});
