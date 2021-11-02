import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import ListCities from '../../components/molecules/ListCities';
import { Feather } from '@expo/vector-icons';
import { DataContext } from '../../stores/providers';

const { width } = Dimensions.get("screen");

export default function Home({navigation}: any) {
    const { globalArrayCities } = React.useContext(DataContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.city}>Pesquisar </Text>
                <Feather name="chevron-down" size={20} style={styles.iconArrow}/>
            </TouchableOpacity>
            
            <ListCities citiesContext={globalArrayCities} nav={navigation}/>
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
    header: {
        flexDirection:'row'
    },
    city: {
        fontWeight:'bold',
        fontSize:18
    },
    iconArrow: {
        marginLeft: 5
    }
  });
  
