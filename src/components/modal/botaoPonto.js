import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../../styles/Modal'
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';

class BotaoPonto extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    modalSet(estado){
        this.props.modalSet(estado)
    }

    finalizarEmbarque(){
        this.props.finalizarEmbarque()
    }
    addStudent(id, oldPonto){
        
        this.props.addStudent(id,oldPonto)

    }
                                            
    cancelarSemSalvar(){
        Alert.alert(
            "Cancelar embarque",
            "Você não salvou o embarque",
            [
              {
                text: "Ok",
                onPress: () => {this.modalSet(false), this.props.cancelar()},
                style: "cancel"
              },
              { text: "cancelar", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
    }


    render() {
        return (
            <View style = {{marginTop: 20}}>
                <View style = {{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.finalizarEmbarque()} style = {{flex: 1}}>
                        <View style={stylesComponets.botao}>
                            <Text style={stylesText.cabecalho}>Finalizar Embarque</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.addStudent(1,0)} style = {{flex: 1}}>
                        <View style={stylesComponets.botao}>
                            <Text style={stylesText.cabecalho}>Adicionar aluno</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => this.cancelarSemSalvar()}>
                    <View style={stylesComponets.botao}>
                        <Text style={stylesText.cabecalho}>Cancelar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export default BotaoPonto;
