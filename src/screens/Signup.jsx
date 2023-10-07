import { StyleSheet, Text, View , SafeAreaView  , TextInput , TouchableOpacity , Keyboard , TouchableWithoutFeedback , KeyboardAvoidingView} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useLayoutEffect } from 'react'
import Input from '../common/Input'
import Button from '../common/Button'
const Signup = ({navigation}) => {
     //to hide the header on the navigation tab
     useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

    const [firstname , setFirstname] = useState('')
    const [lastname , setLastname] = useState('')
    const [username , setUsername] = useState('')
    const [password1 , setPassword1] = useState('')
    const [password2 , setPassword2] = useState('')

    const [firstnameError , setFirstnameError] = useState('')
    const [lastnameError , setLastnameError] = useState('')
    const [usernameError , setUsernameError] = useState('')
    const [password1Error , setPassword1Error] = useState('')
    const [password2Error , setPassword2Error] = useState('')
   
    function OnSignUp(){

        //check username
        const failusername = !username || username.length < 5
        if (failusername){
            setUsernameError('Username must be  >= 5 characters')
        }
        //check firstname
        const failfirstname = !firstname 
        if (failfirstname){
            setFirstnameError('Firstname was not provided')
        }
        //check lastname
        const faillastname = !lastname 
        if (faillastname){
            setLastnameError('Lastname was not provided')
        }
        //check password1
        const failpassword1 = !password1  || password1.length < 8
        if (failpassword1){
            setPassword1Error('Password is too short')
        }
        //check password2
        const failpassword2 = password1  !== password2
        if (failpassword2){
            setPassword2Error('Passwors don\'t match')
        }

        //Break out of the function if there were any issues
        if(failusername ||
            failfirstname ||
            faillastname ||
            failpassword1 ||
            failpassword2 
            ){
            return
        }
        console.log(username , firstname , lastname , password1 ,password2 )
    }
  return (
    <SafeAreaView style={{flex:1}}>
         <KeyboardAvoidingView behavior='height' style={{flex:1}}>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View style={{flex:1 , justifyContent:'center' , paddingHorizontal:16}}>
            <Text style={{textAlign:'center' , marginBottom:24 , fontSize:36 , fomntWeight:'bold'}}>Sign Up</Text>
           
            <Input
             title='Username'
             value={username}
             setValue={setUsername}
             error={usernameError}
             setError={setUsernameError}
            />
            <Input
             title='First Name'
             value={firstname}
             setValue={setFirstname}
             error={firstnameError}
             setError={setFirstnameError}
             />
            <Input
             title='Last Name'
             value={lastname}
             setValue={setLastname}
             error={lastnameError}
             setError={setLastnameError}
             />
            <Input 
            title='Password'
            value={password1}
            setValue={setPassword1}
            error={password1Error}
            setError={setPassword1Error}
            secureTextEntry={true}
            />
            <Input 
            title=' Confirm Password'
            value={password2}
            setValue={setPassword2}
            error={password2Error}
            setError={setPassword2Error}
            secureTextEntry={true}
            />

            <Button title='Sign Up' onPress={OnSignUp}/>

            <Text style={{textAlign:'center' , marginTop:40}}>Already have an account?<Text style={{color:'blue'}} onPress={()=>navigation.goBack()}>Sign In</Text></Text>
        </View>
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Signup

const styles = StyleSheet.create({})