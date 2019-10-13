import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import styles from '../styles/Modal'


export default class PresencaAluno extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presente: false
        };
    };

    AlteraPresenca(presente) {
        this.props.setPresencaAluno(presente)
        this.setState({ presente })
    }

    render() {
        return (
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <View style= {{flex: 3}}>
                    <Text style = {styles.textInfo}>{this.props.nome}</Text>
                </View>
                <View style= {{flex: 1}}>
                    <Switch
                        trackColor = {{ true : styles.myBotao.backgroundColor}}
                        thumbColor = {styles.myBotao.backgroundColor}
                        value={this.state.presente}
                        onValueChange={() => this.AlteraPresenca(!this.state.presente)}
                    />
                </View>
            </View>
        )
    }
}