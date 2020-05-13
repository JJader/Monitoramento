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
        this.updateColor()
      }
    }
    catch (error) {
    }
  }

  setModal(param) {
    this.setState({ modal: param })
  }

  updateColor() {
    if (this.props.index == 0 || this.props.index) {

      let color = this.props.color(this.props.index)
      if (color) {
        this.setState({ color })
      }

    }
  }

  async onRequestClose() {
    if (this.state.modal) {
      this.props.onRequestClose()
    }
  }

  returnStyle() {
    return (this.state.color != '' ?
      [this.props.style, { backgroundColor: this.state.color }]
      :
      this.props.style
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <LoadingButton
          onPress={() => this.setModal(true)}
          text={this.props.title}
          style={this.returnStyle()}
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