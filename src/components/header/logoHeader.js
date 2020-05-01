import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const logoHeader = ({ text }) => (
    
    <View style={styles.cabecalho}>
        <Text style={styles.cabecalhoText}>{text}</Text>
        <Image
            source={require("../../assets/logo/logo.png")}
            style={{ flex: 1 }}
            resizeMode="center"
        />
    </View>
);

export default logoHeader;

const styles = StyleSheet.create({
    cabecalho: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2
    },
    cabecalhoText: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
    },
});
