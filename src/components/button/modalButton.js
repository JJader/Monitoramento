import React, { Component } from 'react';
import { View, Modal, StyleSheet } from 'react-native';

import LoadingButton from './loadingButton';
import IconButton from './iconButton'

class ModalAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      color: '',
    };
  }

  componentDidMount() {
    this.setState({ modal: this.props.modal })
  }

  componentWillUpdate(newProps) {
    try {
      if (newProps.modal != this.state.modal) {
        this.setModal(newProps.modal)
      }
    }
    catch (error) {
    }
  }

  setModal(param) {
    this.setState({ modal: param })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        {this.props.icon ?
          <IconButton
            onPress={() => this.props.onPress()}
            name={this.props.icon}
            text={this.props.text}
            style={this.props.style}
          />
          :
          <LoadingButton
            onPress={() => this.props.onPress()}
            text={this.props.title}
            style={this.props.style}
          />
        }

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => this.props.onRequestClose()}
        >

          <View style={{ flex: 1 }}>
            {this.props.view}
          </View>

        </Modal>

      </View>
    );
  }
}

export default ModalAlunos;