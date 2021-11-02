import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons';
import ForeCastCity from '../../components/molecules/ForeCastCity';


const { width, height } = Dimensions.get("screen");
//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component

export default function City({navigation, route}: any) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
                <Feather name="chevron-left" size={20} style={styles.iconArrow}/>
                <Text style={styles.city}>Previsão para os próximos 5 dias</Text>
            </TouchableOpacity>

            <ForeCastCity city={route.params.stateCity} cityInfo={route.params.cityInfo}/>
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
    iconArrow: {
        marginRight: 5
    },
    header: {
        flexDirection:'row'
    },
    city: {
        fontWeight:'bold',
        fontSize:16,
        marginRight:15
    }
});