import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get("screen");
//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component

import { API_KEY } from "@env"
//It is importing the apiKey

export default function ForeCastCity(props: any) {
    const [ weeklyWeather, setWeeklyWeather ] = useState<any | undefined>([]);

    useEffect(() => {
        const { cityInfo } = props;
        //This constant get all the city information

        async function fetchAPI() {
            await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${cityInfo.item.latitude}&lon=${cityInfo.item.longitude}&units=metric&lang=pt_br&appid=${API_KEY}`).then(js => js.json()).then(res => {
                var array7Days = [];

                for(var x = 0; x < res.list.length; x+=8) {
                    array7Days.push(res.list[x])
                    setWeeklyWeather(array7Days)
                }
            })
        }

        //I'm not using daily API because it's paid
        fetchAPI();
    },[])


    function convertUnixUTCToDate(UNIX_timestamp: number) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;

        return time;
    }

    
    function resposiveDays(dayParam: any) {
        //This function changes the days, if today is day 2 the function will show the message Today
       
        var a = new Date(dayParam * 1000);
        var date = Number(a.getDate());
        //Day from timestamp

        var today = new Date();
        var day = Number(today.getDate());
        //Current day

        if(date == day) {
            return (
                <View>
                    <Text style={{color:'black', fontSize:24, fontWeight:"bold", position:"absolute", left: width/13}}>Hoje</Text>
                    <Text style={{color:'black', fontSize:14, position:'absolute', left: width/13, top: height/28}}>{convertUnixUTCToDate(dayParam)}</Text>
                </View>
            );
        } else if(date > day && date - day == 1) {
            return (
                <View>
                    <Text style={{color:'black', fontSize:24, fontWeight:"bold", position:"absolute", left: width/13}}>Amanh??</Text>
                    <Text style={{color:'black', fontSize:14, position:'absolute', left: width/13, top: height/28}}>{convertUnixUTCToDate(dayParam)}</Text>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={{color:'black', fontSize:24, fontWeight:"bold", position:"absolute", left: width/13}}>{convertUnixUTCToDate(dayParam)}</Text>
                </View>
            );
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.cityTitle}>{props.city}</Text>
            <FlatList 
                data={weeklyWeather}
                keyExtractor={item => item.dt}
                renderItem={(item: any) => (
                    <View style={styles.citiesWeather}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:1, flexDirection:'column'}}>
                                {resposiveDays(item.item.dt)}
                                <Text style={{position:'absolute', left: width/13, top: height/11, color:'#5772FF', textTransform: "capitalize"}}>{item.item.weather[0].description}</Text>
                                
                                <View style={{flexDirection:"row"}}>
                                    <Text style={{position:'absolute', left: width/13, top: height/9, color:'black'}}>{item.item.main.temp_min}?? - {item.item.main.temp_max}??</Text>
                                </View>
                            </View>
                            <Text style={styles.temperature}>{Math.round((item.item.main.temp))}??</Text>
                        </View>
                    </View>
                )}/>
            <StatusBar translucent={true}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: width/20
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
    temperature: {
        fontSize: 49,
        position:'absolute',
        right: width/13,
        color:'black',
        fontWeight: 'bold'
    },
    iconArrow: {
        marginRight: 5
    },
    header: {
        flexDirection:'row'
    },
    searchView: {
        width: width/1.1,
        height: height/1.2,
        alignItems: 'center',
        margin: 20,
        paddingVertical:20,
        backgroundColor:'#121212',
        borderRadius: 30
    },
    city: {
        fontWeight:'bold',
        fontSize:16,
        marginRight:15
    },
    cityTitle: {
        fontWeight:'bold',
        fontSize:20,
        marginRight:15,
        padding:10,
        color: "#5959CA"
    },
    searchedCities: {
        backgroundColor:'#282A36',
        flexDirection:"row",
        justifyContent:'center',
        alignItems:"center",
        width: width/1.3,
        maxWidth: width/1.3,
        padding:10,
        borderRadius:10,
        margin:5
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