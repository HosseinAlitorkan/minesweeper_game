import { createSlice } from "@reduxjs/toolkit";

export const dataSlice=createSlice(
    {name:'data',
        initialState:{isLogedIn:false,gameState:'normal',style_arr:[]},
        reducers:
        {
            over:(state)=>{
            state.gameState="over";
            },
            win:(state)=>{state.gameState="win";},
            set_style_arr:(state,action)=>
            {state.style_arr[action.payload.i]=action.payload.object}
        }
    }
    );

export const {over,win,set_style_arr}= dataSlice.actions;
export default dataSlice.reducer;