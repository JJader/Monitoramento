import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class NavigationMenu extends Component {
  render() {
    return (
      <View style={styles.view}>

        <TouchableOpacity
          onPress={this.props.navigationProps.bind(this)}
        >
          <Ionicons name="md-reorder"
            size={50}
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={styles.text}>
          {this.props.title}
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#0279be',
    paddingTop: 20,
    marginHorizontal: 5,
  },

  icon: {
    marginLeft: 10,
    color: 'white',
  },

  text: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold'
  },
});
