import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import notFound from '../../../components/atoms/LottieAnimations/notfound.json';

const { width, height } = Dimensions.get("screen");

export default function ListCities(props: any) {
    const list = props.citiesContext;
    const [ refreshPage, setRefreshPage ] = useState(false);

    Array.prototype.move = function(from: any, to: any){
        this.splice(to,0,this.splice(from,1)[0]);
        return this;
    };
    //This function changes the currentValue (from) to the another position in array, in this case I want to set every city that has favorite as true to the 0 position


    function reload(indexCurrentElement: number, favoriteStatus: boolean) {
        if(favoriteStatus == false) {
            list.move(indexCurrentElement, 0)
            setRefreshPage(!refreshPage)
        } else {
            setRefreshPage(!refreshPage)
        }
    }

    function deleteCity(indexCurrentElement: number) {
        list.splice(indexCurrentElement, 1)
        setRefreshPage(!refreshPage)
    }


    return(
        <View>
            {list.length == 0 ?
                <View style={styles.mainView}>
                    <LottieView style={{height: 300, width:300}} source={notFound} autoPlay={true}/>
                    <Text style={styles.title}>Parece que você ainda não adicionou uma cidade</Text>
                    <Text style={styles.subtitle}>Tente adicionar uma cidade clicando na seta do topo para buscá-la</Text>
                </View>
            :
                <FlatList 
                    data={list}
                    keyExtractor={item => item.id}
                    renderItem={(item: any) => (
                        <TouchableOpacity onPress={() => props.nav.navigate('City', {
                            cityInfo: item,
                            stateCity: item.item.stateOfCity 
                        })}>
                            <View style={styles.citiesWeather}>
                                <View style={{flex:1, flexDirection:'row'}}>
                                    <View style={{flex:1, flexDirection:'column'}}>
                                        <Text style={styles.city}>{item.item.city}</Text>
                                        <Text style={styles.stateCity}>{item.item.stateOfCity}</Text>
                                        <Text style={styles.weatherInfo}>{item.item.weather.weather[0].description}</Text>
                                        <View style={{flexDirection:"row"}}>
                                            <Text style={styles.tempRange}>{item.item.weather.main.temp_min}° - {item.item.weather.main.temp_max}°</Text>
                                            <TouchableOpacity style={styles.favBox} onPress={() => [reload(list.indexOf(item.item), item.item.favorite), item.item.favorite = !item.item.favorite]}>
                                                {item.item.favorite == false ?
                                                    <Feather style={{color: "black"}} name="star" size={28}/>
                                                    :
                                                    <Feather style={{color: "#e3c007"}} name="star" size={28}/>
                                                }
                                            </TouchableOpacity>
                                            
                                            <TouchableOpacity style={styles.trashBox} onPress={() => deleteCity(list.indexOf(item.item))}>
                                                <Feather style={{color: "black"}} name="trash-2" size={28}/>
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
        </View>
    );
}

const styles = StyleSheet.create({
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
        color:'black', 
        fontSize:20, 
        fontWeight:"bold", 
        position:"absolute", 
        left: width/13
    },
    stateCity: {
        color:'black', 
        fontSize:14, 
        position:'absolute', 
        left: width/13, 
        top: height/28
    },
    weatherInfo: {
        position:'absolute', 
        left: width/13, 
        top: height/11, 
        color:'#5772FF', 
        textTransform: "capitalize"
    },
    tempRange: {
        position:'absolute', 
        left: width/13, 
        top: height/9, 
        color:'black'
    },
    favBox: {
        flex:1, 
        position:'absolute', 
        right: width/5, 
        top: height/9.9
    },
    trashBox: {
        flex:1, 
        position:'absolute', 
        right: width/12, 
        top: height/9.9
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
  