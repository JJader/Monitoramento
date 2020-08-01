import { StyleSheet } from 'react-native';
import stylesContainer from './Modal'

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
  
  button: {
    backgroundColor: stylesContainer.background.backgroundColor,
    marginVertical: 20,
    minHeight: 50,
    maxHeight: 70,
    borderRadius: 15,
  },

  BoxShadow: {
    borderColor: stylesContainer.background.backgroundColor,
    borderWidth: 1,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 6,
  },
})