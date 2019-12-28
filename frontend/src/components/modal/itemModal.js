import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions, Image, TextInput, StyleSheet } from 'react-native';
import stylesContainer from '../../styles/Modal'
import stylesText from '../../styles/text'
import stylesComponent from '../../styles/componets'
import { Ionicons } from '@expo/vector-icons';

const WINDOW_WIDTH = Dimensions.get('screen').width / 10
class itemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            rua: '',
            numero: '',
            bairro: '',
        };
    }

    alterarRua = (rua) => {
        this.setState({ rua })
    }

    alterarBairro = (bairro) => {
        this.setState({ bairro })
    }

    alterarNumero = (numero) => {
        this.setState({ numero })
    }

    alterarInformacao = () => {
        const rua = this.state.rua
        const numero = this.state.numero
        const bairro = this.state.bairro

        this.props.alterarRua(rua)
        this.props.alterarNumero(numero)
        this.props.alterarBairro(bairro)
        this.setState({ isVisible: false })
    }
    minhaLocalizacao = () => {
        this.props.alterarNumero('null')
        this.props.alterarBairro('null')
        this.props.alterarRua('null')
        this.setState({ isVisible: false })
    }

    render() {
        return (
            <View style={stylesContainer.conteiner2}>

                <TouchableOpacity style={[stylesComponent.botao, { justifyContent: 'flex-start' }]}
                    onPress={() => { this.setState({ isVisible: true }) }}>
                    <Ionicons
                        name="ios-search"
                        size={35}
                        style={{ marginHorizontal: 10, color: 'white' }} />
                    <Text style={stylesText.text}>ROTA PRÓXIMA DE VOCÊ</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isVisible}
                    onRequestClose={() => this.setState({ isVisible: false })}
                >
                    <View style={{ backgroundColor: 'white', flex: 1 }}>
                        <View style={{ justifyContent: 'space-between', flex: 1 }}>

                            <View style={stylesText.viewCabecalho}>
                                <TouchableOpacity style={stylesComponent.botao}
                                    onPress={() => this.setState({ isVisible: false })}>
                                    <Ionicons
                                        name="ios-arrow-round-back"
                                        size={35}
                                        style={{ color: 'white' }} />
                                </TouchableOpacity>
                                <Text style={stylesText.cabecalho}>Descubra a sua rota ambev</Text>
                            </View>

                            <View style={{ flex: 3, marginVertical: 10, padding: 10 }}>
                                <TextInput
                                    style={[stylesComponent.viewInput, { minHeight: 60, marginBottom: 30 }]}
                                    placeholder="Rua"
                                    value={this.state.rua}
                                    onChangeText={this.alterarRua}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                                <TextInput
                                    style={[stylesComponent.viewInput, { minHeight: 60, marginBottom: 30 }]}
                                    placeholder="Numero"
                                    value={this.state.numero}
                                    onChangeText={this.alterarNumero}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                                <TextInput
                                    style={[stylesComponent.viewInput, { minHeight: 60, marginBottom: 30 }]}
                                    placeholder="Bairro"
                                    value={this.state.bairro}
                                    onChangeText={this.alterarBairro}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                            <View style={{ flex: 2, justifyContent: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity style={stylesComponent.botao}
                                        onPress={this.alterarInformacao}>
                                        <Text style={stylesText.text}>Enviar endereço</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 1 }}>
                                    <TouchableOpacity style={stylesComponent.botao}
                                        onPress={this.minhaLocalizacao}>
                                        <Text style={stylesText.text}>Usar minha localização atual</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        );
    }
}
export default itemModal;

const styles = StyleSheet.create({

})
