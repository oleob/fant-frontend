import React from 'react';
import { Provider } from 'react-redux';

import './scss/app.scss';

import store from './store';

import Routes from './containers/Routes';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <Provider store={store}>
    <div className="grid">
      <Header />
      <div className="content">
        <Routes />
      </div>
      <Footer />
    </div>
  </Provider>
);

export default App;
