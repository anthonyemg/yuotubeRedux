//React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
//Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers.js';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
