import {create} from 'zustand'
import secure from './secure'
import api, { ADDRESS } from './api'
import utilis from './utilis'



   //----------------------
    // socket receive message handlers
    //--------------------------


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
        }
        socket.onmessage =(event)=>{
            // utilis.log('socket.onmessage')
            // convert data to js obj
            const parsed = JSON.parse(event.data)
            utilis.log('onmessage:', parsed)

            const response = {
                'thumbnail': responseThumbnail,
                'search':responseSearch
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
     // Requests
    //--------------------------
    
    requestsList :null,
    
    requestConnect:(username)=>{
        const socket = get().socket
        socket.send(JSON.stringify({
            source:request.connect,
            username:username
        }))
        
    },
    
    
    
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