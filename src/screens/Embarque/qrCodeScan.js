import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ModalButton from '../../components/button/modalButton'
import stylesContainer from '../../styles/Modal';
import { Ionicons } from '@expo/vector-icons';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    qrcode: '',
    studentOnBus: [],
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  handleBarCodeScanned = ({ type, data }) => {
    if (this.validQrCode(data)) {
      this.addStudentOnBus(data)
    }

    this.setState({ qrcode: data })
    this.setState({ scanned: true });
    this.updateScannedWithDelay()
  };

  addStudentOnBus(data) {
    let studentOnBus = this.state.studentOnBus
    studentOnBus.push(data)
    this.setState({ studentOnBus })
  }

  updateScannedWithDelay() {
    this.wait(5000).then(
      () => this.closeModal()
    )
  }

  wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  closeModal() {
    this.setState({ scanned: false })
  }

  whichviewStudent() {
    let isOkay = this.validQrCode(this.state.qrcode)

    return (
      isOkay ?
        this.viewConfirmStudent()
        :
        this.viewWrongStudent()
    )
  }

  viewConfirmStudent() {
    return (
      <View style={styles.studentConfirm}>
        <Text style={styles.text}>Confirmado</Text>
        <Ionicons
          name="md-checkmark-circle-outline"
          size={70}
          color="white"
        />
      </View>
    )
  }

  viewWrongStudent() {
    return (
      <View style={styles.studentWrong}>
        <Text style={styles.text}>Negado</Text>
        <Ionicons
          name="md-close"
          size={70}
          color="white"
        />
      </View>
    )
  }

  validQrCode(param) {
    return !isNaN(parseFloat(param)) && isFinite(param);
  }

  async changeScreen() {
    if (this.state.studentOnBus.length) {
      
      await this.sendListStudentsToServer()
      this.props.navigation.navigate('Iniciar', {
        index: this.props.navigation.getParam('index', null)
      })

    }
    else {
      this.props.navigation.navigate('Iniciar')
    }
  }

  async sendListStudentsToServer(){
    this.setState({studentOnBus: []})
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={styles.view}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        <ModalButton
          modal={this.state.scanned}
          onPress={() => this.changeScreen()}
          icon={"map"}
          text={"Retornar para o mapa"}
          style={styles.button}
          view={this.whichviewStudent()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  button: {
    position: 'absolute',
    alignItems: 'flex-end',
    top: '90%',
    right: '40%',
    backgroundColor: stylesContainer.background.backgroundColor,
    minHeight: 40,
    borderRadius: 60,
  },

  studentConfirm: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39ff14',
  },

  studentWrong: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },

  text: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 20
  }
})