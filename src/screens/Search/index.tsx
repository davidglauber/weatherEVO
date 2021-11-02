import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import GoogleAutoCompleteInput from '../../components/atoms/GoogleAutoCompleteInput';
//This is the Context to get Global Variables

const { width } = Dimensions.get("screen");
//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component


export default function Search({navigation}: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.city}>Adicionar Localização</Text>
            <GoogleAutoCompleteInput nav={navigation}/>
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
    city: {
        fontWeight:'bold',
        fontSize:18
    }
});
  
