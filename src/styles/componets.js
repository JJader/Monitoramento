import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    modalBackground: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalItem: {
        minWidth: 200,
        flex: 1,
        flexDirection: 'column', 
        alignItems: 'stretch',
        justifyContent: 'center',       
        backgroundColor: 'white',
        margin: 20,
        marginVertical: '20%'
    },
    ponto: {
        backgroundColor: '#0279be', 
        margin: 20, 
        minHeight: 50, 
        borderRadius: 20,
        justifyContent: "center", 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    botao: {
        backgroundColor: '#0279be', 
        margin: 10, 
        minHeight: 50, 
        borderRadius: 15,
        justifyContent: "center", 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    switch:{
        flex: 1,
        alignItems: "stretch",
        justifyContent: 'space-evenly',

    }
})