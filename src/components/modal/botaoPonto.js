import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal } from 'react-native';
import styles from '../../styles/Modal'
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';
import { ScrollView } from 'react-native-gesture-handler';

class BotaoPonto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno: {
                id: 'null',
                nome: 'null',
                idade: 'null',
                escola: 'nUll',
                turno: 'nUll',
                presenca: 0,
            },
            index: null,
            oldPonto: null,
            id: null,
            isvisible : false
        };
    }

    modalSet(estado) {
        this.props.modalSet(estado)
    }

    finalizarEmbarque() {
        this.props.finalizarEmbarque()
    }

    printStudent(id, oldPonto) {

        dados = this.props.printStudent(id, oldPonto)

        if (dados != undefined) {
            this.setState({ aluno: dados.aluno })
            this.setState({ index: dados.index })
            this.setState({ oldPonto })
            this.setState({isvisible: true})
            
        }
    }

    addStudent(){
        let index = this.state.index
        let oldPonto = this.state.oldPonto

        if (index != null && oldPonto != null){
            this.props.addStudent(index, oldPonto)
            this.closeModal()
        }else{
            alert("O aluno não foi encontrado")
        }
    }

    closeModal(){
        this.setState({isvisible: false})
        this.setState({aluno: {
            id: 'null',
            nome: 'null',
            idade: 'null',
            escola: 'nUll',
            turno: 'nUll',
            presenca: 0,
        }})
        this.setState({index: null})
        this.setState({oldPonto: null})
        this.setState({id : null})
    }

    cancelarSemSalvar() {
        Alert.alert(
            "Cancelar embarque",
            "Você não salvou o embarque",
            [
                {
                    text: "Ok",
                    onPress: () => { this.modalSet(false), this.props.cancelar() },
                    style: "cancel"
                },
                { text: "cancelar", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }


    render() {
        return (
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.finalizarEmbarque()} style={{ flex: 1 }}>
                        <View style={stylesComponets.botao}>
                            <Text style={stylesText.cabecalho}>Finalizar Embarque</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.setState({isvisible: true})} style={{ flex: 1 }}>
                        <View style={stylesComponets.botao}>
                            <Text style={stylesText.cabecalho}>Pesquisar aluno</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => this.cancelarSemSalvar()}>
                    <View style={stylesComponets.botao}>
                        <Text style={stylesText.cabecalho}>Cancelar</Text>
                    </View>
                </TouchableOpacity>

                <Modal visible = {this.state.isvisible}>
                <ScrollView style={{ backgroundColor: 'white' , paddingTop: 30}}>
                    <View style={stylesText.viewCabecalho}>
                        <Text> Input </Text>
                    </View>
                    <View style={stylesText.viewCabecalho}>
                        <Text style={stylesText.cabecalho} > Id: {this.state.aluno.id}</Text>
                        <Text style={stylesText.cabecalho} > Nome: {this.state.aluno.nome}</Text>
                        <Text style={stylesText.cabecalho} > Idade: {this.state.aluno.idade}</Text>
                        <Text style={stylesText.cabecalho} > Escola: {this.state.aluno.escola}</Text>
                        <Text style={stylesText.cabecalho} > Turno: {this.state.aluno.turno}</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.addStudent()} style={{ flex: 1 }}>
                                <View style={stylesComponets.botao}>
                                    <Text style={stylesText.cabecalho}>Adicionar aluno</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.printStudent(11, 0)} style={{ flex: 1 }}>
                                <View style={stylesComponets.botao}>
                                    <Text style={stylesText.cabecalho}>Pesquisar aluno</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.closeModal()}>
                            <View style={stylesComponets.botao}>
                                <Text style={stylesText.cabecalho}>Cancelar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                </Modal>
            </View>
        );
    }
}

export default BotaoPonto;
