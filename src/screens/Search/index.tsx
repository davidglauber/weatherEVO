import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'

//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component
const { width, height } = Dimensions.get("screen");

export default function Search({navigation}: any) {
    
    return (
        <View style={styles.container}>
            <Text style={styles.city}>Adicionar Localização</Text>

            <View style={styles.searchView}>
                <TextInput style={styles.input} placeholder="Pesquise a Cidade..." />
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
        backgroundColor:'#261C2C',
        borderRadius: 30
    },
    city: {
        fontWeight:'bold',
        fontSize:18
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
  
