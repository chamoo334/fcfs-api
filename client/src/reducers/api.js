import { CURRENT_API_VERSION } from '../actions/constants';

const initialState = {
  cur_api_vers: CURRENT_API_VERSION,
};

export default function api_reduc(state = initialState, action) {
  const { type } = action;
  switch (type) {
    default:
      return state;
  }
}
