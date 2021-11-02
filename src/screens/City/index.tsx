import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get("screen");
//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component


export default function City({navigation, route}: any) {

    useEffect(() => {
        const { cityInfo } = route.params;
        //This constant get all the city information


        console.log('CITY PARAMS: ' + JSON.stringify(cityInfo))
    },[])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={20} style={styles.iconArrow}/>
                <Text style={styles.city}>Previsão para os próximos 5 dias</Text>
            </TouchableOpacity>

            <Text style={styles.cityTitle}>Alagoas</Text>

            <View style={styles.citiesWeather}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:1, flexDirection:'column'}}>
                        <Text style={{color:'black', fontSize:20, fontWeight:"bold", position:"absolute", left: width/13}}>Maceió</Text>
                        <Text style={{color:'black', fontSize:14, position:'absolute', left: width/13, top: height/28}}>Alagoas</Text>
                        <Text style={{position:'absolute', left: width/13, top: height/11, color:'#5772FF', textTransform: "capitalize"}}>Chuva Forte</Text>
                        
                        <View style={{flexDirection:"row"}}>
                            <Text style={{position:'absolute', left: width/13, top: height/9, color:'black'}}>20° - 25°</Text>
                        </View>
                    </View>
                    <Text style={styles.temperature}>27°</Text>
                </View>
            </View>
            <StatusBar translucent={true}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: width/8
    },
    citiesWeather: {
        width: width/1.14,
        maxWidth: width/1.14,
        height: height/5,
        maxHeight: height/5,
        alignItems: 'flex-end',
        margin: 20,
        paddingVertical:30,
        backgroundColor:'#F9F7F5',
        borderRadius: 30
    },
    temperature: {
        fontSize: 49,
        position:'absolute',
        right: width/13,
        color:'black',
        fontWeight: 'bold'
    },
    iconArrow: {
        marginRight: 5
    },
    header: {
        flexDirection:'row'
    },
    searchView: {
        width: width/1.1,
        height: height/1.2,
        alignItems: 'center',
        margin: 20,
        paddingVertical:20,
        backgroundColor:'#121212',
        borderRadius: 30
    },
    city: {
        fontWeight:'bold',
        fontSize:16,
        marginRight:15
    },
    cityTitle: {
        fontWeight:'bold',
        fontSize:20,
        marginRight:15,
        padding:10,
        color: "#5959CA"
    },
    searchedCities: {
        backgroundColor:'#282A36',
        flexDirection:"row",
        justifyContent:'center',
        alignItems:"center",
        width: width/1.3,
        maxWidth: width/1.3,
        padding:10,
        borderRadius:10,
        margin:5
    },
    input: {
        height: height/15,
        width: width/1.2,
        margin: 12,
        padding: 10,
        backgroundColor:'#fff',
        color:'#121212',
        borderRadius:20,
        fontSize: 18,
        fontWeight:'bold'
    }
});
  
