import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import notFound from '../../components/atoms/LottieAnimations/notfound.json';

import { DataContext } from '../../stores/providers';
//This is the Context to get Global Variables

//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component
const { width, height } = Dimensions.get("screen");

export default function Home({navigation}: any) {
    const { globalArrayCities, setGlobalArrayCities } = React.useContext(DataContext);

    useEffect(() => {
            console.log('WEATHEEEEEEEERR: '+ JSON.stringify(globalArrayCities[0].weather.weather[0].description))
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={() => navigation.navigate('Search')}>
                <Text style={styles.city}>Pesquisar </Text>
                <Feather name="chevron-down" size={20} style={styles.iconArrow}/>
            </TouchableOpacity>

            {globalArrayCities.length == 0 ?
                <View style={styles.mainView}>
                    <LottieView style={{height: 300, width:300}} source={notFound} autoPlay={true}/>
                    <Text style={styles.title}>Parece que você ainda não adicionou uma cidade</Text>
                    <Text style={styles.subtitle}>Tente adicionar uma cidade clicando na seta do topo para buscá-la</Text>
                </View>
            :
                <FlatList 
                    data={globalArrayCities}
                    keyExtractor={item => item.id}
                    renderItem={(item: any) => (
                        <View style={styles.citiesWeather}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:1, flexDirection:'column'}}>
                                    <Text style={{color:'black', fontSize:20, fontWeight:"bold", position:"absolute", left: width/13}}>{item.item.city}</Text>
                                    <Text style={{color:'black', fontSize:14, position:'absolute', left: width/13, top: height/28}}>{item.item.stateOfCity}</Text>
                                    <Text style={{position:'absolute', left: width/13, top: height/11, color:'#5772FF'}}>{item.item.weather.main.description}</Text>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{position:'absolute', left: width/13, top: height/9, color:'black'}}>{item.item.weather.main.temp_min}° - {item.item.weather.main.temp_max}°</Text>
                                        <Feather style={{position:'absolute', right: width/12, top: height/9.9}} name="star" size={24}/>
                                    </View>
                                </View>
                                <Text style={styles.temperature}>{Math.round((item.item.weather.main.temp))}°</Text>
                            </View>
                        </View>
                    )}
                />
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
        maxWidth: width/1.14,
        height: height/5,
        maxHeight: height/5,
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
        position:'absolute',
        right: width/13,
        color:'black',
        fontWeight: 'bold'
    },
    subtitle: {
        textAlign:'center', 
        paddingHorizontal:30,
        color:'black'
    }
  });
  
