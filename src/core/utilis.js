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


export default{log , thumbnail}