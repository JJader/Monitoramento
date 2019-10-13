import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    conteiner: {
        flex: 1,
    },
    item: {
        flex: 1,
        fontSize: 18,
        marginLeft: 20,
    },
    textView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    modalBackground: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalItem: {
        minHeight: 200,
        minWidth: 200,
        backgroundColor: 'white'
    },
    itemText: {
        flex: 2,
    },
    itemCabecalho: {
        flex: 1,
        backgroundColor: '#0279be',
        fontWeight: 'bold',
        alignItems: "center",
    },
    textCabecalho: {
        flex: 1,
        textAlign: "center",
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    textInfo: {
        margin: 10,
        fontSize: 18,
    },
    myBotao: {
        backgroundColor: '#0279be', 
        margin: 20, 
        minHeight: 50, 
        borderRadius: 20,
        justifyContent: "center", 
        alignItems: 'center', 
        flexDirection: 'row'
    }

});