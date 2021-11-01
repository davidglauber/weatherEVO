import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
//This API is used to fetch the location which the user is typing

const { width, height } = Dimensions.get("screen");
//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component

export default function Search({navigation}: any) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.city}>Adicionar Localização</Text>

            <View style={styles.searchView}>
                <GooglePlacesAutocomplete
                    placeholder='Pesquise a Cidade...'
                    styles={{
                        container: {
                            width:width/1.2,
                            height: height/15
                        },
                        textInput: {
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
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
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyApBdPKSS-jOkBatAwVUspBMJ6aTmYogBA',
                        language: 'pt-BR',
                    }}
                    fetchDetails={true}
                />
                <View style={styles.searchedCities}>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:15}}>Maceió, </Text>
                    <Text style={{color:'white', fontSize:15}}>Alagoas</Text>
                    <Text style={{color:'white', fontWeight:'bold', fontSize:24, position:'absolute', left: width/1.4}}>24°</Text>
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
    searchView: {
        width: width,
        height: height,
        alignItems: 'center',
        margin: 20,
        paddingVertical:20,
        backgroundColor:'#121212',
        borderRadius: 30
    },
    city: {
        fontWeight:'bold',
        fontSize:18
    },
    searchedCities: {
        flex:1,
        alignItems:'center',
        marginRight: width/1.8,
        marginTop: 30,
        flexDirection:"row",
        maxHeight: height/15,
        maxWidth: width/1.2,
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
  
