import React, { Component } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation'

import { DrawerActions } from "react-navigation-drawer";

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Login' }),
    ],
    key: null
});

export default class exit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (BackHandler.exitApp());
    }
}
