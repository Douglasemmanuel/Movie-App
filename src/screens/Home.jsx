import { StyleSheet, Text, View, SafeAreaView , Image} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Requests from './Requests'
import Profile from './Profile'
import Friends from './Friends'
import { useLayoutEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity } from 'react-native'
import useGlobal from '../core/global'
import { useEffect } from 'react'
import Thumbnail from '../common/Thumbnail'
const Tab = createBottomTabNavigator()
const Home = ({navigation}) => {
    const socketConnect = useGlobal(state => state.socketConnect)
    const socketClose = useGlobal(state => state.socketClose)
    const user = useGlobal(state => state.user)
     //to hide the header on the navigation tab
     useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])
    useEffect(()=>{
        socketConnect()
        return ()=>{
            socketClose()
        }
    },[])

    function onSearch(){
        navigation.navigate('search')
    }
  return (
   <Tab.Navigator
    screenOptions={({route , navigation})=>({
        headerLeft:()=>(
            <View style={{marginLeft:16}}>
                        <Thumbnail
                url={user.thumbnail}
                size={28}
            />
                {/* <Image source={require("../assests/profile.png")} style={{width:28 , height:28 , borderRadius:14 , backgroundColor:'#e0e0e0'}}/> */}
            </View>
        ),
        headerRight:()=>(
            <TouchableOpacity
            onpress={onSearch}
            >
                <FontAwesomeIcon icon='magnifying-glass' size={22} color='#404040' style={{marginRight:16}}/>
            </TouchableOpacity>
        ),
        tabBarIcon:({focused , color , size}) =>{
            const icons = {
                request:'bell',
                friends:'inbox',
                profile:'user'
            }
            const icon = icons[route.name]
            return (
                <FontAwesomeIcon icon={icon} size={28} color={color}/>
            )
        },
        tabBarActiveTintColor:'#202020',
        tabBarShowLabel:false
    })}
   >
     <Tab.Screen name='request' component={Requests}/>
     <Tab.Screen name='friends' component={Friends}/>  
     <Tab.Screen name='profile' component={Profile}/>
   </Tab.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})