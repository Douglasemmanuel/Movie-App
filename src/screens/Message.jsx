import { StyleSheet, Text, View , SafeAreaView , TextInput, TouchableOpacity, TouchableWithoutFeedback, Platform } from 'react-native'
import React from 'react'
import { useLayoutEffect } from 'react'
import Thumbnail from '../common/Thumbnail'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Keyboard } from 'react-native'
import { InputAccessoryView } from 'react-native'




function MessageInput({message , setMessage , onSend}){
  return (
    <View
      style={{
        paddingHorizontal:10 , 
        paddingBottom:10,
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center'
      }}
    >
      <TextInput
        placeholder='Message....'
        placeholderTextColor='#909090'
        style={{
          flex:1,
          paddingHorizontal:18 , 
          borderWidth:1,
          borderRadius:25,
          borderColor:'#d0d0d0',
          backgroundColor:'white',
          height:50
        }}
      />
      <TouchableOpacity>
        <FontAwesomeIcon
          icon='paper-plane'
          size={22}
          color={'#303040'}
          style={{
            marginHorizontal:12
          }}
        />
      </TouchableOpacity>
    </View>
  )
}


function MessageHeader({friend}){
  return (
      <View
      style={{
        flex:1, flexDirection:'row' , alignItems:'center'
      }}>
        <Thumbnail
        url={friend.thumbnail}
        size={30}
        />
        <Text
        style={{
          marginLeft:10 , fontSize:18 , fontWeight:'bold' , color:'#202020'
        }}
        >
          {friend.name}
        </Text>
      </View>
  )
}



const Message = ({navigation , route}) => {
  const [message , setMessage] = useSate('')
  const friend =  route.params.friend
  //update the header
  useLayoutEffect(()=>{
    navigation.setOptions({
      headerTitle:()=>(
        <MessageHeader friend={friend}/>
      )
    })
  })
  function onSend(){
    console.log(message)
  }
  return (
   <SafeAreaView style={{flex:1}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <View
     style={{
      flex:1,
      borderWidth:6,
      borderColor:'red' ,
      marginBottom:Platform.OS === 'ios ' ? 60: 0
     }}
     > 
    </View>
   
    </TouchableWithoutFeedback>
    {Platform.OS === 'ios'? (
      <InputAccessoryView>
       <MessageInput 
        message={message}
        setMessage={Message}
        onSend={onSend}
       />
      </InputAccessoryView>
    ):(
      <MessageInput 
      message={message}
      setMessage={Message}
      onSend={onSend}
      />
    )}
   </SafeAreaView>
  )
}


export default Message

const styles = StyleSheet.create({})