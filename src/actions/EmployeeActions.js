import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_RESET,
  EMPLOYEE_SET,
} from './types';

export const employeeUpdate = ({ prop, value }) => ({
  type: EMPLOYEE_UPDATE,
  payload: { prop, value },
});

export const employeeSet = ({ employee }) => ({
  type: EMPLOYEE_SET,
  payload: { employee },
});

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.pop();
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({
      type: EMPLOYEE_UPDATE,
      payload: { prop: 'saving', value: true },
    });
    dispatch({
      type: EMPLOYEE_UPDATE,
      payload: { prop: 'error', value: null },
    });

    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        Actions.pop();
        dispatch({ type: EMPLOYEE_RESET });
      })
      .catch((error) => {
        dispatch({
          type: EMPLOYEE_UPDATE,
          payload: { prop: 'error', value: error },
        });
        dispatch({
          type: EMPLOYEE_UPDATE,
          payload: { prop: 'saving', value: false },
        });
      });
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({
      type: EMPLOYEE_UPDATE,
      payload: { prop: 'saving', value: true },
    });
    dispatch({
      type: EMPLOYEE_UPDATE,
      payload: { prop: 'error', value: null },
    });

    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        Actions.pop();
        dispatch({ type: EMPLOYEE_RESET });
      })
      .catch((error) => {
        dispatch({
          type: EMPLOYEE_UPDATE,
          payload: { prop: 'error', value: error },
        });
        dispatch({
          type: EMPLOYEE_UPDATE,
          payload: { prop: 'saving', value: false },
        });
      });
  };
};
