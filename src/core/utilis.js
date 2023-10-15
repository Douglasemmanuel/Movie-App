import { Platform } from "react-native"
import ProfileImage from "../assests/profile.png"
import { ADDRESS } from "./api"

function log(){
    //much better console.log function that formats/indents
    //objects for better redability
    for(let i = 0 ; i< arguments.length; i++){
        let arg = arguments[i]
        // stringify and indent object
        if(typeof arg === 'object' ){
            arg = JSON.stringify(arg , null , 2)
        }
        console.log(`[${Platform.OS}]`,arg)
    }
}


function thumbnail(url){
    if(!url){
        return ProfileImage
    }
    return {
        url:'http://' + ADDRESS + url
    }
}


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

export default{log , thumbnail , formatTime}