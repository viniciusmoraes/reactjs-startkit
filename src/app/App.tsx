import React, { Component } from 'react';
import Routes from "./config/routes";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './@core/store';
import './App.scss';

class App extends Component{
  render() {
    return (
        <Provider store={store}>
          <Router>
            <Routes />
          </Router>
        </Provider>
    );
  }
}
export default App;
