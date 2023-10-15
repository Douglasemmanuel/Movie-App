import { StyleSheet, Text, View , SafeAreaView, ActivityIndicator } from 'react-native'
import React from 'react'
import useGlobal from '../core/global'
import Empty from '../common/Empty'
import { FlatList } from 'react-native'
import Cell from '../common/Cell'
import Thumbnail from '../common/Thumbnail'
import { TouchableOpacity } from 'react-native'
import utilis from '../core/utilis'


function RequestAccept({item}){
  const requestAccept = useGlobal(state=> state.requestAccept)
  return (
    <TouchableOpacity
      style={{
        backgroundColor:'#202020',
        paddingHorizontal:14,
        height:36,
        borderRadius:18, 
        alignItems:'center',
        justifyContent:'center'
      }}
      onPress={()=>  requestAccept(item.sender.username)}
    >
      <Text
      style={{
        color:'white',
        fontWeight:'bold'
      }}
      >
        Accept
      </Text>
    </TouchableOpacity>
  )

}


function RequestRow({item}){
  const message = 'Request to connect with you'
  // const time = '7m ago'
  return (
   <Cell>
    <Thumbnail
      url={item.sender.thumbnail}
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
        {item.sender.name}
      </Text>
      <Text
      style={{
        // fontWeight:'bold',
        // marginBottom:4,
        color:'#606060',
      }}
      >
        {message}<Text style={{color:'#909090' , fontSize:13}}>{utilis.formatTime(item.created)}</Text>
      </Text>
      </View>
      <RequestAccept item={item}/>
   </Cell>
  )
}


const Requests = () => {
  const requestList = useGlobal(state => state.requestList)

  //show loading indicator
  if(requestList === null){
    return (
      <ActivityIndicator style={{flex:1}}/>
    )
  }
  //show empty if no requests
  if(requestList.Length === 0){
    return (
      <Empty icon='bell' message='No request'/>
    )
  }
  return (
  //  <SafeAreaView>
     <View 
     style={{flex:1}}>
     <FlatList
     data={requestList}
     renderItem={({item})=>{
      <RequestRow item={item}/>
     }}
     keyExtractor={item => item.sender.username}
     />
    </View>
  //  </SafeAreaView>
  )
}

export default Requests

const styles = StyleSheet.create({})