import {useReducer} from 'react'
const initSatete={inputValue:"",isTouched:false}
function reducer(state,action){
    if(action.type="Change")
    {   
        return {inputValue:action.value,isTouched:true};
    }
    else if(action.type="Blur")
    {
        
        return {isTouched:true,inputValue:action.value};
    }
    else if(action.type="Reset")
    {
        return {inputValue:"",isTouched:false};
    }
    else {
        return;
    }
}

function useInput(validatevalue){
   const [inputState,dispatch] =useReducer(reducer,initSatete);
   const valueIsvalid =validatevalue(inputState.inputValue);
   const haserror=!valueIsvalid && inputState.isTouched
    
   function changeHandler(event){
        dispatch({type:"Change",value:event.target.value});
   }
   function blurHandler(event){
    dispatch({type:"Blur",value:event.target.value});
   }
   function reset(){
    dispatch({type:"Reset"})
   }
   
   return {
    value:inputState.inputValue,
    changeHandler:changeHandler,
    blurHandler,
    haserror,isValid:valueIsvalid,
    reset

   }
}

export default useInput;