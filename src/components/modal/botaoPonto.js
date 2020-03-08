import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import styles from '../../styles/Modal'
import stylesText from '../../styles/text';
import stylesComponets from '../../styles/componets';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
class BotaoPonto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno: {
                id: '',
                nome: '',
                idade: '',
                escola: '',
                turno: '',
                presenca: 0,
            },
            index: '',
            oldPonto: '',
            id: '',
            isvisible : false
        };
    }

    modalSet(estado) {
        this.props.modalSet(estado)
    }

    finalizarEmbarque() {
        this.props.finalizarEmbarque()
    }

    idChange = (id) => {
        id ?
        this.setState({ id: parseInt(id) }) :
        this.setState({ id:'' })
        
    };

    oldpontoChange = (oldPonto) => {
        oldPonto ?
        this.setState({ oldPonto : parseInt(oldPonto)}) :
        this.setState({ oldPonto : ''})
    };

    
    restoreProps() {
        this.setState({aluno: {
            id: '',
            nome: '',
            idade: '',
            escola: '',
            turno: '',
            presenca: 0,
        }})
        this.setState({index: ''})
        this.setState({oldPonto: ''})
        this.setState({id : ''})
    }

    printStudent() {

        let id = this.state.id
        let oldPonto = this.state.oldPonto
        let dados = undefined

        if (typeof(id) == "number" && typeof(oldPonto) == "number"){
            
            dados = this.props.printStudent(id, oldPonto)
        }
        
        if (dados != undefined) {
            
            this.setState({ aluno: dados.aluno })
            this.setState({ index: dados.index })
            this.setState({ oldPonto })
            this.setState({isvisible: true})
            
        }else{
            this.restoreProps()
        }
    }

    addStudent(){
        let index = this.state.index
        let oldPonto = this.state.oldPonto

        if (typeof(index) == "number" && typeof(oldPonto) == "number"){
            this.props.addStudent(index, oldPonto)
            this.closeModal()
        }else{
            alert("O aluno não foi encontrado")
        }
    }

    closeModal(){
        this.setState({isvisible: false})
        this.restoreProps()
    }

    showStudent(){
        return( this.state.aluno.id != '' ? 
            <Ionicons name="ios-happy" size={50} color="gray" />
        :
            <Ionicons name="ios-sad" size={50} color="gray" />)
        
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
                <ScrollView contentContainerStyle={{ flex : 1,  justifyContent: 'space-between'}}>

                    <View style={[stylesText.viewCabecalho, {flexDirection: "column", alignItems: 'center'}]}>
                        <Text style={stylesText.cabecalho}>Procurar</Text>
                        <View style = {{flexDirection: "row", flex: 3, justifyContent: 'center', alignItems: "center"}}>
                            <View style= {stylesText.viewTextInput}>
                                <View style = {stylesText.textInput}>
                                    <TextInput 
                                        style = { {flex: 1}}
                                        value={ String(this.state.id) }
                                        onChangeText={this.idChange}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholder={"Id"}
                                        keyboardType={'numeric'} 
                                    />
                                </View>
                                <View style = {stylesText.textInput}>
                                    <TextInput 
                                        style = {{flex: 1}}
                                        value={ String(this.state.oldPonto)}
                                        onChangeText={this.oldpontoChange}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        placeholder={"Bus stop"}
                                        keyboardType={'numeric'}  
                                    />
                                </View>
                                
                            </View>

                            <TouchableOpacity onPress={() => this.printStudent()} style={{ marginRight: 30 }}>
                                <Ionicons name="md-search" size={30} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[stylesText.viewCabecalho, stylesComponets.BoxShadow,{ justifyContent: 'center', backgroundColor: 'white'}]}>
                        {this.showStudent()}
                        <Text style={stylesText.text} > Id: {this.state.aluno.id}</Text>
                        <Text style={stylesText.text} >{this.state.aluno.nome}</Text>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.addStudent()} style={{ flex: 1 }}>
                                <View style={stylesComponets.botao}>
                                    <Text style={stylesText.cabecalho}>Adicionar aluno</Text>
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
