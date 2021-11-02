import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Touchable } from 'react-native'
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import notFound from '../../components/atoms/LottieAnimations/notfound.json';

import { DataContext } from '../../stores/providers';

const { width, height } = Dimensions.get("screen");

export default function Home({navigation}: any) {
    const { globalArrayCities, setGlobalArrayCities } = React.useContext(DataContext);
    const [ refreshPage, setRefreshPage ] = useState(false);

    useEffect(() => {
        console.log('WEATHEEEEEEEERR: '+ JSON.stringify(globalArrayCities))
    }, [])
    
    
    Array.prototype.move = function(from: any, to: any){
        this.splice(to,0,this.splice(from,1)[0]);
        return this;
    };
    //This function changes the currentValue (from) to the another position in array, in this case I want to set every city that has favorite as true to the 0 position

    function reload(indexCurrentElement: number, favoriteStatus: boolean) {
        if(favoriteStatus == false) {
            globalArrayCities.move(indexCurrentElement, 0)
            setRefreshPage(!refreshPage)
        } else {
            setRefreshPage(!refreshPage)
        }
    }


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
                        <TouchableOpacity onPress={() => navigation.navigate('City', {
                            cityInfo: item,
                            stateCity: item.item.stateOfCity 
                        })}>
                            <View style={styles.citiesWeather}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'column'}}>
                                        <Text style={{color:'black', fontSize:20, fontWeight:"bold", position:"absolute", left: width/13}}>{item.item.city}</Text>
                                        <Text style={{color:'black', fontSize:14, position:'absolute', left: width/13, top: height/28}}>{item.item.stateOfCity}</Text>
                                        <Text style={{position:'absolute', left: width/13, top: height/11, color:'#5772FF', textTransform: "capitalize"}}>{item.item.weather.weather[0].description}</Text>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={{position:'absolute', left: width/13, top: height/9, color:'black'}}>{item.item.weather.main.temp_min}° - {item.item.weather.main.temp_max}°</Text>
                                            <TouchableOpacity style={{flex:1, position:'absolute', right: width/12, top: height/9.9}} onPress={() => [reload(globalArrayCities.indexOf(item.item), item.item.favorite), item.item.favorite = !item.item.favorite]}>
                                                {item.item.favorite == false ?
                                                    <Feather style={{color: "black"}} name="star" size={24}/>
                                                    :
                                                    <Feather style={{color: "#e3c007"}} name="star" size={24}/>
                                                }
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Text style={styles.temperature}>{Math.round((item.item.weather.main.temp))}°</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
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
  
