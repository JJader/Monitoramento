import React, { Component } from 'react';
import { View, Modal, StyleSheet } from 'react-native';

import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';

import LoadingButton from './loadingButton';

class ModalAlunos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }


  componentDidMount() {
    this.setState({ modal: this.props.modal })
  }

  componentWillUpdate(newProps) {
    console.log(newProps.modal);

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

  async onRequestClose() {
    if (this.state.modal) {
      this.props.onRequestClose()
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <LoadingButton
          onPress={() => this.setModal(true)}
          text={this.props.title}
          style={this.props.style}
        />


        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modal}
          onRequestClose={() => this.onRequestClose()}
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