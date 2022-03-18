import { CURRENT_API_VERSION } from '../actions/constants';

const initialState = {
  cur_api_vers: CURRENT_API_VERSION,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
