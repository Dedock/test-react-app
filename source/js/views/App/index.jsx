import React, { Component } from 'react';
import Routes from 'config/routes';
import PropTypes from 'prop-types';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  render() {
    return (
      <div className='App'>
        <div className='Page'>
          <Routes />
        </div>
      </div>
    );
  }
}
