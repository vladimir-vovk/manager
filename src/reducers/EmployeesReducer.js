import {
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEES_FETCH_LOADING,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  data: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return { ...INITIAL_STATE, data: action.payload };
    case EMPLOYEES_FETCH_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};
