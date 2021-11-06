import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Feather } from '@expo/vector-icons';
import { DataContext } from '../../../stores/providers';

const { width, height } = Dimensions.get("screen");
//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component

import { API_KEY, GOOGLE_KEY } from "@env"
//It is importing the apiKey

export default function GoogleAutoCompleteInput(props: any) {
    const [ cities, setCities ] = useState<any | undefined>([]);
    const { globalArrayCities, setGlobalArrayCities } = React.useContext(DataContext);
    
    function handleSaveCities() {
        setGlobalArrayCities([...globalArrayCities, ...cities])
        props.nav.navigate('Home')
    }

    return(
        <View style={styles.searchView}>
                <GooglePlacesAutocomplete
                    placeholder='Pesquise a Cidade...'
                    styles={{
                        container: {
                            flex:1,
                            width:width/1.2,
                        },
                        textInput: {
                            borderRadius:20,
                            margin: 12,
                            padding: 10,
                            backgroundColor:'#fff',
                            color:'#121212',
                            fontSize: 18,
                            fontWeight:'bold'
                        },
                        listView: {
                            width:width/1.2,
                            height:100,
                            borderRadius: 20
                        }
                    }}
                    onPress={(data, details = null) => {
                        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${details?.geometry.location.lat}&lon=${details?.geometry.location.lng}&units=metric&lang=pt_br&appid=${API_KEY}`).then(js => js.json()).then(res => {
                        setCities([...cities, {
                            id: data.place_id,
                            city: details?.address_components[1].long_name || details?.address_components[0].long_name, //Usually, the position 0 and 1 has the same city, so I did it as a precaution
                            stateOfCity: details?.address_components[2].long_name,
                            latitude: details?.geometry.location.lat,
                            longitude: details?.geometry.location.lng,
                            weather: res,
                            favorite: false
                        }])
                    })
                    }}
                    query={{
                        key: GOOGLE_KEY,
                        language: 'pt-BR',
                    }}
                    fetchDetails={true}
                />

                {cities.length > 0 &&
                    <TouchableOpacity onPress={() => handleSaveCities()} style={{flexDirection:'row', alignItems:'center', backgroundColor:'#FFD700', padding:10, width: width/4.5, marginBottom: 20, borderRadius:10}}>
                        <Feather name="upload-cloud" size={20}/>
                        <Text style={{marginLeft:5}}>Salvar</Text>
                    </TouchableOpacity>
                }

                {cities.map((item:any) => (
                    <View style={styles.searchedCities} key={item.id}>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:15}}>{item.city}, </Text>
                        <Text style={{color:'white', fontSize:15}}>{item.stateOfCity}</Text>
                    </View>
                ))}
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: width/8
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
        fontSize:18
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
  
