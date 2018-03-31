import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_RESET,
  EMPLOYEE_SET,
  EMPLOYEES_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: '',
  saving: false,
  error: null,
  list: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_RESET:
      return INITIAL_STATE;
    case EMPLOYEE_SET:
      return { ...state, ...action.payload.employee };
    case EMPLOYEES_FETCH_SUCCESS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
