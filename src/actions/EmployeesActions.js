import firebase from 'firebase';
import {
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEES_FETCH_LOADING,
} from './types';

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    dispatch({ type: EMPLOYEES_FETCH_LOADING });

    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', (snapshot) => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};
