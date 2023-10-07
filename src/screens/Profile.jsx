import { StyleSheet, Text, View , SafeAreaView  , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import useGlobal from '../core/global'

function ProfileLogout(){
  const logout = useGlobal(state=>state.logout)
  return(
    <TouchableOpacity
    onPress={logout}
    style={{
      flexDirection:'row',
      height:52,
      borderRadius:26,
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:26,
      backgroundColor:'#202020'
    }}
    >
      <FontAwesomeIcon
      icon='right-font-bracket'
      size={20}
      color='#d0d0d0'
      style={{marginRight:12}}
      />
      <Text
      style={{
        fontWeight:'bold',
        color:'#d0d0d0',
        marginTop:40
      }}
      >
       Logout
      </Text>
    </TouchableOpacity>
  )
}

const Profile = () => {
  return (
    <SafeAreaView>
        <View
          style={{
            flex:1,
            alignItems:'center',
            paddingTop:100,
          }}
        >
           <Image source={require("../assests/profile.png")} style={{width:100 , height:100 , borderRadius:90 , backgroundColor:'#e0e0e0' , marginBottom:20}}/>
      <Text
        style={{
          textAlign:'center',
          fontSize:20,
          fontWeight:'bold',
          marginTop:6,
          color:'#303030',

        }}
      >Profile</Text>
      <Text
       style={{
        textAlign:'center',
        fontSize:14,
        // fontWeight:'bold',
        // marginTop:6,
        color:'#606060',
        
      }}
      >@Profile</Text>
      <ProfileLogout/>
    </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})