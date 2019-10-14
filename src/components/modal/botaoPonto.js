import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/Modal'
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';

class botaoPonto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    ModalSet(estado){
        this.props.ModalSet(estado)
    }


    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.ModalSet(false)}>
                    <View style={stylesComponets.botao}>
                        <Text style={stylesText.cabecalho}>Finalizar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.ModalSet(false)}>
                    <View style={stylesComponets.botao}>
                        <Text style={stylesText.cabecalho}>Buscar aluno</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default botaoPonto;
