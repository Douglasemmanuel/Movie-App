import {create} from 'zustand'
import secure from './secure'
import api, { ADDRESS } from './api'
import utilis from './utilis'
import { text } from '@fortawesome/fontawesome-svg-core'



   //----------------------
    // socket receive message handlers
    //--------------------------


    function  responseFriendList(set ,get , friendList){
        set(state =>({
            friendList:friendList
        }))
    }




    //function to eable users connect together

    function responseRequestConnect(set , get , connection){
        const  user = get().user
        // if i was the one that made the connect request, update the searcch List row
        if(user.username === connection.sender.username){
            //...
            const searchList = [...get().searchList]
            const searchIndex = searchList.findIndex(
                request => request.username === connection.receiver.username
            )
            if(searchIndex >= 0){
                searchIndex[searchIndex].status = 'pending-then'
                set(state =>({
                    searchList:searchList
                }))
            }
            // if they were the one that sent the connect request add request to request list
        }else{
            const requestList = [...get().requestList]
            const requestIndex = requestList.findIndex(
                request => request.username === connection.receiver.username
            )
            if(requestIndex === -1){
               requestList.unshift(connection)
               set(state =>({
                requestList:requestList
            }))
            }
        }
    }

    //function to eable users accept request

    function responseRequestAccept(set, get ,connection){
        const user = get().user
        // if i was the one taht accepted the request , remove request from th requestlist
        if(user.username === connection.sener.username){
            const requestList = [...get().requestList]
            const requestIndex = requestList.findIndex(
                request => request.id === connection.id
            )
            if(requestIndex >= 0){
                requestList.splice(requestIndex , 1)
                set(state =>({
                    requestList:requestList
                }))
            }
            
        }
        //If the corresponding user is connected within the search for the acceptor or the acceptee , update the state of the searchlist item
        const sl = get().searchList
        if(sl === null){
            return 

        }
        const searchList = [...sl]
        let searchIndex = -1
        // if this user accepted
        if(user.username === connection.receiver.username){
            searchIndex = searchList.findIndex(
                user => user.username === connection.sender.username
            )
            // if the other user accepted
        }else{
            searchIndex = searchList.findIndex(
                user => user.username === connection.receiver.username
            )
        }
        if(searchIndex >= 0){
            searchList[searchIndex].status = 'connected'
            set(state =>({
                searchList:searchList
            }))
        }
    }


    function responseRequestList(set , get , requestList ){
        set(state =>({
            requestList:requestList
        }))
    }




   function responseThumbnail(set, get , data){
        set(state =>({
            user:data
        }))
    }

    function responseSearch(set, get , data){
        set(state =>({
            searchList:data
        }))
    }

    function responseMessageList(set, get , data){
        set(state =>({
            messagesList:[...get().messageList , ...data.messages],
            messagesNext:data.next,
            messagesUsername:data.friend.username
        }))
    }

    
    function responseMessageType(set , get , data){
        if(data.username != get().messagesUsername)return 
        set((state)=>({
            messagesTyping:new Date()
        }))
    }

    function responseMessageSend(set , get , data){
        const username = data.friend.username
        // move friendList item for this friend to the start of list , update the preview text and update the time stamp
        const friendList = [...get().friendList]
        const friendIndex = friendList.findIndex(
            item => item.friend.username === username
        )
        if(friendIndex >= 0){
            const item = friendList[friendIndex]
            item.preview = data.message.text
            item.updated = data.message.created
            friendList.splice(friendIndex , 1)
            friendList.unshift(item)
            set((state)=>({
                friendList:friendList
            }))

        }
        // if the message data does not belong to thus friend then dont update the  message list , as a fresh messagelist will be loaded the next time the user opens the correct chat window
        if (username != get().messageUsername){
            return
        }
        const messageList = [...data.message , ...get().messageList]
        set((state)=>({
            messageList:messageList,
            messageTyping:null
        }))
    }



const useGlobal = create((set , get)=>({
    //----------------------
    // Initialization
    //--------------------------
    initialized :false,
    init: async ()=>{
        const credentials = await secure.get('credentials')
        if(credentials){
            
            try{
                const response = await  api({
                    method:'POST',
                    url:'/chat/signin/',
                    data:{
                      username:credentials.username,
                      password:credentials.password,
                    }
                  })
                if(response.status !== 200){
                    throw 'Authentication error'
                }
                  const user = response.data.user
                  const tokens = response.data.tokens
                  secure.set('tokens',tokens)
                set((state)=>({
                    initialized:true,
                    authenticated:true,
                    user:user
                }))
                return
            }catch(error){
                console.log('userGlobal.init:',error)
            }
           
        }
        set((state)=>({
            initialized:true,
        }))
    },
    
    //----------------------
    //Authentication
    //--------------------------
    authenticated : false , 
    user:{},
    login:(credentials,user , tokens)=>{
        secure.set('credentials', credentials)
        secure.set('tokens', tokens)
        set((state)=>({
            authenticated:true,
            user:user
        }))
    },
    logout:()=>{
        secure.wipe()
        set((state)=>({
            authenticated:false,
            user:{}
        }))
    },
     //----------------------
    //Websockets
    //--------------------------
    socket:null,
    socketConnect:async ()=>{
        const tokens = await secure.get('tokens')
        const url = `ws://${ADDRESS}/chat/?tokens=${tokens.access}`
        // utilis.log(url)
        const socket = new WebSocket( url )
        socket.onopen =()=>{
            utilis.log('socket.onopen')
            socket.send(JSON.stringify({
                source:'request.list'
            }))
            socket.send(JSON.stringify({
                source:'friend.list'
            }))
        }
        socket.onmessage =(event)=>{
            // utilis.log('socket.onmessage')
            // convert data to js obj
            const parsed = JSON.parse(event.data)
            utilis.log('onmessage:', parsed)

            const response = {
                'message.list':  responseMessageList,
                'message.send': responseMessageSend,
                'message.type': responseMessageType,
                'friend.new': responseFriendNew,
                'friend.list':  responseFriendList,
                'request.accept':  responseRequestAccept,
                'request.connect':  responseRequestConnect,
                'request.list':  responseRequestList,
                'thumbnail':        responseThumbnail,
                'search':          responseSearch
            }
            const resp = response[parsed.source]
            if(!resp){
                utilis.log('parsed source:'+ parsed.source + "not found")
                return
            }
            resp(set , get , parsed.data)
        }
        socket.onerror =(e)=>{
            utilis.log('socket.onerror',e.message)
        }
        socket.onclose =()=>{
            utilis.log('socket.onClose')
        }
        set((state)=>({
            socket:socket,
        }))
        utilis.log('TOKENS', tokens)
    },

    socketClose:()=>{
        const socket = get().socket
        if(socket){
            socket.close()
        }
        set((state)=>({
            socket:null,
        }))
    },
     //----------------------
    // search
    //--------------------------
    
    searchList :null,
    
    searchUsers:(query)=>{
        if(query){
            const socket = get().socket
        socket.send(JSON.stringify({
            source:'search',
           query:query
            
        }))
        }else{
            set((state)=>({
                searchList:null,
            }))
        }
        
    },

    //----------------------
    // Messages
    //--------------------------
    messagesList:[],
    messagesNext:null,
    messagesTyping:null,
    messagesUsername: null,

    messageList :(connectionId , page=0) => {
        if (page === 0){
            set((state)=>({
             messagaesList:[],
             messagesNext:null,
             messagesTyping:null,
             messagesUsername: null,
            }))
        }else{
            set((state)=>({
                messageNext:null
            }))
        }
        const socket = get().socket
        socket.send(JSON.stringify({
            source:'message.list',
            connecionId:connectionId,
            page:page
        }))
        
    },

    messageSend :(connectionId , message) => {
        const socket = get().socket
        socket.send(JSON.stringify({
            source:'message.send',
            connecionId:connectionId,
            message:message
        }))
        
    },

    messageType :(username) => {
        const socket = get().socket
        socket.send(JSON.stringify({
            source:'message.send',
           username:username
        }))
        
    },



     //----------------------
     // Requests
    //--------------------------
    
    requestList :null,

    requestAccept:(username)=>{
        const socket = get().socket
        socket.send(JSON.stringify({
            source:request.accept,
            username:username
        }))
        
    },

    
    requestConnect:(username)=>{
        const socket = get().socket
        socket.send(JSON.stringify({
            source:request.connect,
            username:username
        }))
        
    },
    
      
    //----------------------
    // Friends
    //--------------------------
    friendList : null,
    
    //----------------------
    // Thumbnail
    //--------------------------

    uploadThumbnail:(file)=>{
        const socket = get().socket
        socket.send(JSON.stringify({
            source:'thumbnail',
            base64:file.base64,
            filename:file.fileName,
        }))
    }
}))



export default useGlobal;