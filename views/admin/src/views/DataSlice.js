import {createSlice} from '@reduxjs/toolkit'


export const DataSlice = createSlice({
    name:"Data",
    initialState:{
        
        "Login":false,
        'user':null,
        'identify':null

    },
    reducers:{
        setLogin:(state,actions)=>{
            var data = actions.payload
            state.identify = data.identify
            state.user = data.user
            state.Login = true
          

        },
        setLogout:(state,actions)=>{
            // console.log(state)
            
            state.Login = actions.payload
            alert("登出成功 !")

        }
        
        
    }
})


export const {setLogin,setLogout} = DataSlice.actions
export default DataSlice.reducer