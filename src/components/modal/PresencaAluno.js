import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import styles from '../../styles/Modal'
import stylesComponets from '../../styles/componets';
import stylesText from '../../styles/text';

export default class PresencaAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presente: this.props.presente,
        };
    };

    AlteraPresenca(presente) {
        this.props.PresencaAluno(this.props.aluno,presente)
        this.setState({ presente })
    }

    TodosAlunos(){
            return (
                this.props.aluno == -1 ? {fontWeight: 'bold'} : 
                {fontWeight: 'normal',}
                    )
    }
    render() {
        return (
            <View style={[stylesText.view,this.TodosAlunos()]}>
                <View style = {stylesComponets.switch}>
                    <Text style = {[stylesText.text, this.TodosAlunos()]}>{this.props.nome}</Text>
                </View>
                <View>
                    <Switch
                        trackColor = {{ true : stylesComponets.botao.backgroundColor}}
                        thumbColor = {stylesComponets.botao.backgroundColor}
                        value={this.state.presente}
                        onValueChange={() => this.AlteraPresenca(!this.state.presente)}
                    />
                </View>
            </View>
        )
    }
}
