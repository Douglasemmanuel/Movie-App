import {create} from 'zustand'
import secure from './secure'
import api from './api'
import utilis from './utilis'
const useGlobal = create((set)=>({
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
                      password:credentials.password
                    }
                  })
                if(response.status !== 200){
                    throw 'Authentication error'
                }
                  const user = response.data.user
                set((state)=>({
                    authenticated:true,
                    user:user
                }))
            }catch(error){
                console.log('userGlobal.init:',error)
            }
           
        }
    },
    
    //----------------------
    //Authentication
    //--------------------------
    authenticated : false , 
    user:{},
    login:(credentials,user)=>{
        secure.set('credentials', credentials)
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
    }
    // bears:0,
    // increasePopulations:()=>set((state)=>({bears:state.bears + 1})),
    // removeAllBears:()=> set({bears:0}),
}))


export default useGlobal;