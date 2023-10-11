import { StyleSheet, Text, View , SafeAreaView , TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useState } from 'react'
import Empty from '../common/Empty'
import { FlatList } from 'react-native'
import Thumbnail from '../common/Thumbnail'
import useGlobal from '../core/global'


function SearchButton({user}){
  //Add tick if a user is  alreadyconnected
  if (user.status === 'connected'){
    return(
      <FontAwesomeIcon
        icon='circle-check'
        size={38}
        color='#20d080'
        style={{
          marginRight:20
        }}
      />
    )
  }
  const requestConnect = useGlobal(state => state.requestConnect)
  const data ={}
  switch(user.stataus){
    case 'no-connection':
      data.text = 'Connect'
      data.disabled = false
      data.onPress = ()=> requestConnect(user.username)
      break
    case 'pending-then':
        data.text = 'Pending'
        data.disabled = true
        data.onPress = ()=>{}
        break
    case 'pending-me':
          data.text = 'Accept'
          data.disabled = false
          data.onPress = ()=>{}
          break
    default:break
  }
 return (
  <TouchableOpacity
  style={{
    backgroundColor:data.disabled ? '#50505055' :'#202020',
    paddingHorizontal:14,
    height:36,
    alignItems:'center',
    borderRadius:18,
    justifyContent:'center'
  }}
  disabled={data.disabled}
  onPress={data.onPress}
  >
    <Text
      style={{
        color:data.disabled ? '#000000' : 'white',
        fontWeight:'bold'
      }}
    >
      {data.text}
    </Text>
  </TouchableOpacity>
 )
}




 function SearchRow({user}){
  return (
    <View
    style={{
      paddingHorizontal:20,
      flexDirection:'row',
      alignItems:'center',
      borderBottomWidth:1,
      borderColor:'#f0f0f0',
      height:106
    }}>
      <Thumbnail
      url={user.thumbnail}
      size={76}
      />
     <View
     style={{
      flex:1,
      paddingHorizontal:16
     }}
     >
     <Text
      style={{
        fontWeight:'bold',
        marginBottom:4,
        color:'#202020',
      }}
      >
        {user.name}
      </Text>
      <Text
      style={{
        // fontWeight:'bold',
        // marginBottom:4,
        color:'#606060',
      }}
      >
        {user.username}
      </Text>
     </View>
     <SearchButton user={user}/>
    </View>
  )
 }

const Search = () => {
  const [query , setQuery] = useState('')

  const searchList = useGlobal(state=> state.searchList)
  const searchUsers = useGlobal(state=> state.searchUsers)
  useEffect(()=>{
    searchUsers(query)
  ,[query]})
  // const searchList = [
  //   {
  //     thumbnail:null,
  //     name:"john Doe",
  //     username:"john d",
  //     status:"pending-then",
  //   },
  //   {
  //     thumbnail:null,
  //     name:"john Doe ",
  //     username:"john o",
  //     status:"pending-me",
  //   },
  //   {
  //     thumbnail:null,
  //     name:"john Doe",
  //     username:"john g",
  //     status:"connected",
  //   },
  //   {
  //     thumbnail:null,
  //     name:"john Doe",
  //     username:"john y",
  //     status:"not-connection",
  //   },

  // ]
  return (
    <SafeAreaView style={{flex:1}}>
        <View
          style={{
            padding:16,
            borderBottomWidth:1,
            borderColor:'#f0f0f0'
          }}
        >
          <View>
          <TextInput
            style={{
              backgroundColor:'#e1e2e4',
              height:52,
              borderRadius:26,
              padding:16,
              fontSize:16,
              paddingLeft:50
            }}
            value={query}
            onChangeText={setQuery}
            placeholder='Search....'
            placeholderTextColor='#b0b0b0'
          />
          <FontAwesomeIcon
            icon='magnifying-glass'
            size={20}
            color='#505050'
            style={{
              position:'absolute',
              left:10,
              top:17
            }}
          />
          </View>
    </View>
    {searchList === null ? (
       <Empty
       icon='magnifying-glass'
       message="Search for friends"
       centered={false}
       />
     
    ): searchList.length === 0?(
      <Empty
      icon='triangle-exclamation'
      message={'No Users found for "' + query + ""}
      centered={false}
      />
    
    ):(
      <FlatList
        data={searchList}
        renderItem={({item})=>(
          <SearchRow user={item}/>
        )}
        keyExtractor={item => item.username}
      />
    )}
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({})