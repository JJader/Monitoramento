import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { DrawerActions, NavigationActions } from 'react-navigation'

export default class exit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    resetAction() {
       //return this.props.navigation.reset([NavigationActions.navigate({routeName: 'Login'})], 0)
       return this.props.navigation.pop(1)
    }
    render() {
        return (this.resetAction());
    }
}
