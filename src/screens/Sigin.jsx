import { StyleSheet, Text, View , SafeAreaView , TextInput, TouchableOpacity , KeyboardAvoidingView,TouchableWithoutFeedback , Keyboard } from 'react-native'
import { useLayoutEffect } from 'react'
import { useState } from 'react'
import React from 'react'
import Tittle from '../common/Tittle'
import Input from '../common/Input'
import Button from '../common/Button'
import api from '../core/api'
import utilis from '../core/utilis'
import useGlobal from '../core/global'


const Sigin = ({navigation}) => {
     //to hide the header on the navigation tab
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])
    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')
    const [usernameError , setUsernameError] = useState('')
    const [passwordError , setPasswordError] = useState('')
    const login = useGlobal(state => state.login)
    function onSignIn(){
        console.log('onSignIn' , username , password)

        //check username 
        const failUsername = !username 
        if(failUsername){
            setUsernameError('Username not provided')
        }
        //check password
        const failpassword = !password 
        if(failpassword){
            setPasswordError('Password not provided')
        }
        //break out of this function if there were any issues
        if(failUsername || failpassword){

        }
        //make signin request
        api({
          method:'POST',
          url:'/chat/signin/',
          data:{
            username:username,
            password:password
          }
        })
        .then(response =>{
        utilis.log('Sign In',response.data)
          const credentials = {
            username:username,
            password:password
          }
          utilis.log('Sign In',response.data)
          login( credentials,response.data.user , response.data.tokens)
        })
        .catch(error => {
          // console.log(error)
          if(error.response){
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          }else if (error.request){
            console.log(error.request);
          }else{
            console.log('Error',error.message);
          }
          console.log(error.config);
        })
        //.....
    }
  return (
    <SafeAreaView  style={{flex:1}}>
  <KeyboardAvoidingView behavior='height' style={{flex:1}}>
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
       <View  style={{flex:1 , justifyContent:'center' , paddingHorizontal:20 }}>
        <Tittle text="Douggie"  color='#202020' />
        <Input
         title='Username'
         value={username}
         setValue={setUsername}
         error={usernameError}
         setError={setUsernameError}
        />
        <Input 
        title='Password'
        value={password}
        setValue={setPassword}
        error={passwordError}
        setError={setPasswordError}
        secureTextEntry={true}
        />
        {/* <Input/> */}
        <Button titile='Sign In' onPress={onSignIn} />

        <Text style={{textAlign:'center' , marginTop:40}}>Don't have an account?<Text style={{color:'blue'}} onPress={()=>navigation.navigate('signin')}>Sign Up</Text></Text>
    </View>
       </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Sigin

const styles = StyleSheet.create({})