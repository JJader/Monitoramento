import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import stylesContainer from '../../styles/Modal'
import stylesComponets from '../../styles/componets';

import LoadingButton from '../../components/button/loadingButton';
import ModalButton from '../../components/button/modalButton'
import SearchStudentModal from './SearchStudentModal'

class BotaoPonto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  returnSearchStudentComponent() {
    return (
      <SearchStudentModal
        searchStudent={(id, oldPonto) => this.props.searchStudent(id, oldPonto)}
        addStudent={(student) => this.props.addStudent(student)}
        cancel={() => this.cancelSearchModal()}
      />
    )
  }

  cancelSearchModal() {
    this.setState({ modal: false })
  }

  render() {
    return (

      <View style={styles.background}>

        <View style={styles.view}>
          <LoadingButton
            onPress={() => this.props.endingABoarding()}
            text={"Finalizar embarque"}
            style={[stylesComponets.BoxShadow, styles.buttonConteiner]}
          />

          <ModalButton
            title={"Pesquisar aluno"}
            modal={this.state.modal}
            view={this.returnSearchStudentComponent()}
            onRequestClose={() => this.cancelSearchModal()}
            style={[stylesComponets.BoxShadow, styles.buttonConteiner]}
          />
        </View>

        <LoadingButton
          onPress={() => this.props.cancel()}
          text={"Cancelar"}
          style={[stylesComponets.BoxShadow, styles.buttonConteiner,]}
        />

      </View >
    );
  }
}

export default BotaoPonto;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  view: {
    flexDirection: 'row',
    flex: 5,

  },
  buttonConteiner: {
    flex: 1,
    backgroundColor: stylesContainer.background.backgroundColor,
    marginVertical: 5,
    minHeight: 50,
    borderRadius: 10,
  },


})