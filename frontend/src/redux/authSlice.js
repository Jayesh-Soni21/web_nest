import { createSlice } from "@reduxjs/toolkit";

const authSlice= createSlice({
    name:"auth",
    initialState:{
        loading:false,
        verifiedUser:null
    },
    reducers:{
        //actions
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
        setVerifiedUser:(state,action)=>{
            state.verifiedUser=action.payload;
        }
    }
});
export const {setLoading,setVerifiedUser}=authSlice.actions;
export default authSlice.reducer;