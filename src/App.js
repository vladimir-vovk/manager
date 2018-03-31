import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBAgXDpJRK-R0WZhFv3z_JAJG9-dW_DvxU',
      authDomain: 'manager-d8d5d.firebaseapp.com',
      databaseURL: 'https://manager-d8d5d.firebaseio.com',
      projectId: 'manager-d8d5d',
      storageBucket: 'manager-d8d5d.appspot.com',
      messagingSenderId: '281384889441'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
