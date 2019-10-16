import React from 'react';  
import { StyleSheet,Platform, Text, View } from 'react-native';  
  
export default class App extends React.Component {  
    constructor(){  
        super();  
        this.state = {  
            ready: false,  
            where: {lat:null, lng:null},  
            error: null  
        }  
    }  
    componentDidMount(){  
        let geoOptions = {  
            enableHighAccuracy:false,  
            timeOut: 20000, //20 second  
          //  maximumAge: 1000 //1 second  
        };  
        this.setState({ready:false, error: null });  
        navigator.geolocation.getCurrentPosition( this.geoSuccess,  
            this.geoFailure,  
            geoOptions);  
    }  
    geoSuccess = (position) => {  
        console.log(position.coords.latitude);  
  
        this.setState({  
            ready:true,  
            where: {lat: position.coords.latitude,lng:position.coords.longitude }  
        })  
    }  
    geoFailure = (err) => {  
        this.setState({error: err.message});  
    }  
    render() {  
        return (  
            <View style={styles.container}>  
                { !this.state.ready && (  
                    <Text style={styles.big}>Using Geolocation in React Native.</Text>  
                )}  
                { this.state.error && (  
                    <Text style={styles.big}>Error: {this.state.error}</Text>  
                )}  
                { this.state.ready && (  
                  <View>
                    <Text style={styles.big}>  
                        Latitude: {this.state.where.lat}    
                    </Text>  
                    <Text style={styles.big}>  
                        Longitude: {this.state.where.lng}  
                    </Text>  
                  </View>
                )}  
            </View>  
        );  
    }  
}  
  
const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
        backgroundColor: '#fff',  
        alignItems: 'center',  
        justifyContent: 'center'  
    },  
    big: {  
        fontSize: 25  
    }  
});  