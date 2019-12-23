import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Drawer from './src/screens/drawerNavigation'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  render() {
    return (
      <Drawer/>
    );
  }
}

export default App;
