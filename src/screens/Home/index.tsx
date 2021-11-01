import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import notFound from '../../components/atoms/LottieAnimations/notfound.json';

import { DataContext } from '../../stores/providers';
//This is the Context to get Global Variables

//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component
const { width, height } = Dimensions.get("screen");

export default function Home({navigation}: any) {
    const { globalArrayCities } = React.useContext(DataContext);
    
    useEffect(() => {
        console.log('CONTEXT VAR VALUE: ' + JSON.stringify(globalArrayCities))
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.city}>Maceió, </Text>
                <Text style={styles.country}>Brasil</Text>
                <Feather name="chevron-down" size={20} style={styles.iconArrow}/>
            </TouchableOpacity>

            <View style={styles.mainView}>
                <LottieView style={{height: 300, width:300}} source={notFound} autoPlay={true}/>
                <Text style={styles.title}>Parece que você ainda não adicionou uma cidade</Text>
                <Text style={styles.subtitle}>Tente adicionar uma cidade clicando na seta do topo para buscá-la</Text>
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
    header: {
        flexDirection:'row'
    },
    mainView: {
      alignItems: 'center',
      margin: 20,
      paddingVertical:20,
      backgroundColor:'#F9F7F5',
      borderRadius: 30
    },
    city: {
        fontWeight:'bold',
        fontSize:18
    },
    country: {
        fontSize:18
    },
    iconArrow: {
        marginLeft: 5
    },
    title: {
        fontSize:18, 
        fontWeight: 'bold', 
        textAlign:'center', 
        padding:30,
        color:'black'
    },
    subtitle: {
        textAlign:'center', 
        paddingHorizontal:30,
        color:'black'
    }
  });
  
