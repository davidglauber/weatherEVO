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

            {globalArrayCities.length == 0 ?
                <View style={styles.mainView}>
                    <LottieView style={{height: 300, width:300}} source={notFound} autoPlay={true}/>
                    <Text style={styles.title}>Parece que você ainda não adicionou uma cidade</Text>
                    <Text style={styles.subtitle}>Tente adicionar uma cidade clicando na seta do topo para buscá-la</Text>
                </View>
            :
                <View style={styles.citiesWeather}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{color:'black', fontSize:20, fontWeight:"bold", marginRight: width/3}}>Blumenau</Text>
                            <Text style={{color:'black', fontSize:14, marginRight: width/3}}>Brasil</Text>
                            <Text style={{marginTop:20, color:'#5772FF'}}>Chuva Fraca</Text>
                            <Text style={{marginTop:10, color:'black'}}>14° - 24°</Text>
                        </View>
                        <Text style={styles.temperature}>29°</Text>
                    </View>
                    <Feather style={{marginRight: width/16}} name="star" size={24}/>
                </View>
            }
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
    citiesWeather: {
        width: width/1.14,
        height: height/5,
        alignItems: 'flex-end',
        margin: 20,
        paddingVertical:30,
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
    temperature: {
        fontSize: 49,
        marginRight:20,
        color:'black',
        fontWeight: 'bold'
    },
    subtitle: {
        textAlign:'center', 
        paddingHorizontal:30,
        color:'black'
    }
  });
  
