import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import notFound from '../../components/atoms/LottieAnimations/notfound.json';

//I'm using Dimensions instead useWindowDimensions hook because I need to call these screen propeties outside a functional component
const { width, height } = Dimensions.get("screen");

export default function Home() {
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.city}>Maceió, </Text>
                <Text style={styles.country}>Brasil</Text>
                <Feather name="chevron-down" size={20} style={styles.iconArrow}/>
            </View>

            <View style={styles.mainView}>
                <Text style={styles.title}>Parece que você ainda não adicionou uma cidade</Text>
                <LottieView style={{height: 300, width:300}} source={notFound} autoPlay={true}/>
                <Text style={styles.subtitle}>Tente adicionar uma cidade clicando na seta para buscá-la</Text>
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
      marginVertical: 10,
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
    subtitle: {
        textAlign:'center', 
        paddingHorizontal:30,
        color:'black'
    }
  });
  
