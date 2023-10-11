import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState , useEffect } from 'react';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Signup from './src/screens/Signup';
import Sigin from './src/screens/Sigin';
import Message from './src/screens/Message';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer , DefaultTheme } from '@react-navigation/native';
import  './src/core/fontawesome';
import useGlobal from './src/core/global';
const Stack = createStackNavigator();

//to change the backgroundcolour of all the screens in the App
const Lightheme = {
  ...DefaultTheme,
  colours:{
    ...DefaultTheme.colors,
    backgroundColor:'white'
  }
}
export default function App() {
  // const [initialized] = useState(true) //to check if the user has already onboarded
  // const [authenticated] = useState(false)  //to check if the user is authenticated
  const authenticated = useGlobal(state=>state.authenticated)
  const initialized = useGlobal(state=>state.initialized)
  const init = useGlobal(state=>state.init)
  useEffect(()=>{
    init()
  },[])
  return (
    <NavigationContainer theme={Lightheme}>
        <StatusBar barstyle='dark-content'/>
        <Stack.Navigator>
          {!initialized ?(
          <>
          <Stack.Screen name='splash' component={Splash} />
          </>

          ): !authenticated ?(
          <>
          <Stack.Screen name='signin' component={Sigin}/>
          <Stack.Screen name='signup' component={Signup}/>
          </>
          ):(
          <>
          <Stack.Screen name='home' component={Home}/>
          <Stack.Screen name='messages' component={Message}/>
          <Stack.Screen name='search' component={Search}/>
          </>
          ) }
        </Stack.Navigator>
    </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
