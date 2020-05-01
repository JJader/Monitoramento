import { StyleSheet } from 'react-native';


export default StyleSheet.create({

    cabecalho: {
        textAlign: "center",
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 5,
        flex: 1
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        marginLeft: 10,
        alignItems: 'stretch', 
        fontSize: 18,
    },
    view: {
        minHeight: 50,
        margin: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch', 
        borderColor: 'transparent',
        borderBottomColor: '#C8C8C8',
        borderWidth: 3,
        //borderRadius: 15,
    },
    viewCabecalho: {
        flex: 1,
        backgroundColor: '#0279be',
        fontWeight: 'bold',
        alignItems: "center",
    },

    textInput: {
        minHeight: 40,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        marginVertical: 30,
        flex: 1
    },
    
    viewTextInput:{
        marginBottom: 20,
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'stretch'
    
    },

})