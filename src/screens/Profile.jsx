import { StyleSheet, Text, View , SafeAreaView  , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import useGlobal from '../core/global'
import { launchCamera , launchImageLibrary } from 'react-native-image-picker'
import utilis from '../core/utilis'
import Thumbnail from '../common/Thumbnail'

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



function ProfileImage(){
  const uploadThumbnail = useGlobal(state=> state.uploadThumbnail)
  const user = useGlobal(state=> state.user)
  return (
    <TouchableOpacity
      style={{  marginBottom:20}}
      onPress={()=>{
        launchImageLibrary({includeBase64 : true},(response)=>{
          // utilis.log('lauchImageLibary',response)
          if(response.didCancel) return
          const file = response.assets[0]
          uploadThumbnail(file)
        
        })
      }}
    >
      <Thumbnail
        url={user.thumbnail}
        size={180}
      />
       {/* <Image source={require("../assests/profile.png")} style={{width:100 , height:100 , borderRadius:90 , backgroundColor:'#e0e0e0'}}/> */}
        <View
          style={{
            position:'absolute',
            bottom:0,
            right:0,
            backgroundColor:'#202020',
            height:40,
            width:40,
            borderRadius:20,
            alignItems:'center',
            justifyContent:'center',
            borderWidth:3,
            borderColor:'white',
          }}
        >
          <FontAwesomeIcon
          icon="pencil"
          size={15}
          color='#d0d0d0'
          />
        </View>
    </TouchableOpacity>
  )
}





const Profile = () => {
  const user = useGlobal(state=>state.user)
  return (
    <SafeAreaView>
        <View
          style={{
            flex:1,
            alignItems:'center',
            paddingTop:100,
          }}
        >
          
            <ProfileImage/>
      <Text
        style={{
          textAlign:'center',
          fontSize:20,
          fontWeight:'bold',
          marginTop:6,
          marginBottom:6,
          color:'#303030',

        }}
      >{user.name}</Text>
      <Text
       style={{
        textAlign:'center',
        fontSize:14,
        // fontWeight:'bold',
        // marginTop:6,
        color:'#606060',
        
      }}
      >@{user.username}</Text>
      <ProfileLogout/>
    </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})