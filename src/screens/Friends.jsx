import { StyleSheet, Text, View , SafeAreaView } from 'react-native'
import React from 'react'
import Cell from '../common/Cell'
import { ActivityIndicator } from 'react-native'
import Empty from '../common/Empty'
import { FlatList } from 'react-native'
import useGlobal from '../core/global'
import Thumbnail from '../common/Thumbnail'
import { TouchableOpacity } from 'react-native'


function formatTime(date){
  if(date === null){
    return '-'
  }
  const now = new Date()
  const s = Math.abs(now - new Date(date)) / 1000   
  // seconds
  if(s < 60){
    return 'now'

  }
  //minutes
  if (s < 60*60) {
    const  m = Math.floor(s /60)
    return `${m}m ago`
  }
  //Hours
  if (s < 60*60*24){
    const  h = Math.floor(s /60*60)
    return `${h}hr ago`
  }
    //days
    if (s < 60*60*24*7){
      const  d = Math.floor(s /60*60*24)
      return `${d}d ago`
    }
    //Weeks
  if (s < 60*60*24*7*4){
    const  w = Math.floor(s /60*60*24*7)
    return `${w}wk ago`
  }
  //months
     if (s < 60*60*24*7*4*12){
      const  m = Math.floor(s /60*60*24*7*4)
      return `${m}months ago`
    }
  // years
  const y = Math.floor(s/ (60*60*24*365))
  return `${y}yr ago`
  // return '*'
}


function FriendRow({ navigation , item }){
  return(
    <TouchableOpacity onPress={()=>{
      navigation.navigate('messages' , item)
    }}>
    <Cell>
    <Thumbnail
      url={item.friend.thumbnail}
      size={76}
      />
      <View style={{
        marginHorizontal:16,
        flex:1
      }}>
        <Text
      style={{
        fontWeight:'bold',
        marginBottom:4,
        color:'#202020',
      }}
      >
        {item.friend.name}
      </Text>
      <Text
      style={{
        // fontWeight:'bold',
        // marginBottom:4,
        color:'#606060',
      }}
      >
        {item.preview}<Text style={{color:'#909090' , fontSize:13}}>{formatTime(item.updated)}</Text>
      </Text>
      </View>
   </Cell>
   </TouchableOpacity>
  )

}
const Friends = ({navigation}) => {
  const friendList = useGlobal(state=> state.friendList)
   //show loading indicator
   if(requestList === null){
    return (
      <ActivityIndicator style={{flex:1}}/>
    )
  }
  //show empty if no requests
  if(friendList.Length === 0){
    return (
      <Empty icon='inbox' message='No messages  yet'/>
    )
  }
  return (
  //  <SafeAreaView>
     <View 
     style={{flex:1}}>
     <FlatList
     data={friendList}
     renderItem={({item})=>{
      <FriendRow navigation={navigation} item={item}/>
     }}
     keyExtractor={item => item.id}
     />
    </View>
  //  </SafeAreaView>
  )
}

export default Friends

const styles = StyleSheet.create({})