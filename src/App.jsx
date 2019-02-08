import React from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './scss/app.scss';

import store from './store';

import Routes from './containers/Routes';

import Header from './components/Header';
import Footer from './components/Footer';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E574BC'
    },
    secondary: {
      main: '#63B0CD'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <div className="grid">
        <Header />
        <div className="content">
          <Routes />
        </div>
        <Footer />
      </div>
    </MuiThemeProvider>
  </Provider>
);

export default App;
