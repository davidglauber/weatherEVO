import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//This API is used to fetch the location which the user is typing

const { width, height } = Dimensions.get("screen");
//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component


export default function Search({navigation}: any) {
    const [ cities, setCities ] = useState<any | undefined>([]);

    return (
        <View style={styles.container}>
            <Text style={styles.city}>Adicionar Localização</Text>

            <View style={styles.searchView}>
                <GooglePlacesAutocomplete
                    placeholder='Pesquise a Cidade...'
                    styles={{
                        container: {
                            flex:1,
                            width:width/1.2,
                        },
                        textInput: {
                            borderRadius:20,
                            margin: 12,
                            padding: 10,
                            backgroundColor:'#fff',
                            color:'#121212',
                            fontSize: 18,
                            fontWeight:'bold'
                        },
                        listView: {
                            width:width/1.2,
                            height:100,
                            borderRadius: 20
                        }
                    }}
                    onPress={(data, details = null) => {
                        setCities([...cities, {
                            id: data.place_id,
                            city: details?.address_components[1].long_name,
                            stateOfCity: details?.address_components[2].long_name,
                            latitude: details?.geometry.location.lat,
                            longitude: details?.geometry.location.lng
                        }])
                        console.log(JSON.stringify(cities));
                    }}
                    query={{
                        key: 'AIzaSyApBdPKSS-jOkBatAwVUspBMJ6aTmYogBA',
                        language: 'pt-BR',
                    }}
                    fetchDetails={true}
                />

                {cities.map((item:any) => (
                    <View style={styles.searchedCities} key={item.id}>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:15, marginLeft:100}}>{item.city}, </Text>
                        <Text style={{color:'white', fontSize:15}}>{item.stateOfCity}</Text>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:24, marginLeft:30}}>24°</Text>
                    </View>
                ))}
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
    searchView: {
        width: width/1.1,
        height: height/1.14,
        alignItems: 'center',
        margin: 20,
        paddingVertical:20,
        backgroundColor:'grey',
        borderRadius: 30
    },
    city: {
        fontWeight:'bold',
        fontSize:18
    },
    searchedCities: {
        flexDirection:"row",
        justifyContent:'center',
        marginRight: width/1.8,
        width: width
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
  
