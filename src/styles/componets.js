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
        margin: 20, 
        minHeight: 50, 
        borderRadius: 20,
        justifyContent: "center", 
        alignItems: 'center', 
        flexDirection: 'row'
    },
    botao: {
        padding: 10,
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
    },
    sectionHeader: {
        padding: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#0279be',
        color: 'white',
      },

      BoxShadow: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 30,
        elevation: 6,
        margin: 10,
      }
})