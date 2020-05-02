import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import stylesContainer from '../../styles/Modal'

const sizeIcon = 35;


export default class pickerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem : '',
      dates: [{ id: 0, value: 'Null' }],
    };
  }

  componentDidMount(){
    this.setState({dates: this.props.dates})
  }

  componentWillUpdate(newProps) {
    
    try {
      this.updateDates(newProps.dates)
    } 
    catch (error) {
    
    }

  }

  updateDates(dates){
    if (dates[0].id != this.state.dates[0].id){
      this.setState({dates})
    }
  }

  updateSelectedItem(selectedItem){
    this.setState({selectedItem})
    this.props.onValueChange(selectedItem)
  }

  render() {
    return (
      <View style={styles.view}>
        <Ionicons name={this.props.iconName} size={sizeIcon} style={styles.icon} />

        <Picker
          selectedValue={this.state.selectedItem}
          style={styles.pickerStyle}
          onValueChange={(itemValue) =>
            this.updateSelectedItem(itemValue)
          }
        >

          <Picker.Item label={this.props.text} value="" />

          {
            this.state.dates.map((item) => {
              return (
                <Picker.Item 
                  label={"   " + item.value} 
                  value={item.value} 
                  key={item.id} 
                />
              )
            })
          }

        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: stylesContainer.background.backgroundColor,
    flexDirection: 'row',
    borderRadius: 15,
    marginVertical: "5%",
    minHeight: sizeIcon,
  },

  pickerStyle: {
    flex: 1,
    color: 'white',
    justifyContent: 'center',
  },

  icon: {
    marginHorizontal: 10,
    color: 'white',
  }
})
