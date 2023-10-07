import { StyleSheet, Text, View , SafeAreaView , Animated } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useEffect } from 'react'
// import { SafeAreaView } from 'react-native'
import Tittle from '../common/Tittle'
const Splash = ({navigation}) => {
    //to hide the header on the navigation tab
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])
    const translateY = new Animated.Value(0)
    const duration = 800
    useEffect(()=>{
        Animated.loop(
        Animated.sequence([
            Animated.timing(translateY,{
                toValue:20,
                duration:duration,
                useNativeDriver:true
            }),
            Animated.timing(translateY,{
                toValue:0,
                duration:duration,
                useNativeDriver:true
            })
        ])
        ).start()
       
    },[])
  return (
   <SafeAreaView
    style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black'
    }}
   >
    <StatusBar barstyle='light-content'/>
    <Animated.View style={[{transform:[{translateY}]}]}>
     <Tittle text="Douggie"  color='white' />
    </Animated.View>
   </SafeAreaView>

  )
}

export default Splash

const styles = StyleSheet.create({})