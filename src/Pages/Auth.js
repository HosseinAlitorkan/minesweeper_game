import classes from "./Auth.module.css";
import useInput from '../Hooks/useInput'
import {useNavigate} from 'react-router-dom'
import Result from "../Components/Result/Result";
import {useState,useContext} from "react";
import Game_Context from "../Context/Game_Context";

function Login(props) {
    const [con,setcon]=useContext(Game_Context);
    const [modal,setmodal]=useState(false);
    const navigate=useNavigate();    
    const {value:nameValue,
        haserror:nameHasError,
        reset:nameReset,
        changeHandler:nameChangeHandler,
        blurHandler:nameBlurHandler,
        isValid:nameIsValid} =useInput(namevalidate)

    const {value:passValue,
        haserror:passHasError,
        reset:passReset,
        isValid:passIsValid,
        changeHandler:passChangeHandler,
        blurHandler:passBlurHandler,
        }=useInput(passvalidate);    
    const formIsValid=passIsValid && nameIsValid; 
    const nameClass= !nameHasError? classes.input : classes.name_error; 
    const passClass= !passHasError? classes.input : classes.pass_error; 
    function namevalidate(value)
    {
        //console.log("function_name",value.trim());
        // if(value.trim() =="")
        // {return false;}
        return true;
    }
    function passvalidate(value)
    {
        //console.log("function_pass",value.trim().length);
        // if(value.trim().lenght<6 || value.trim()=="")
        // {
            
        //     return false;
        // }
        return true; 
    }
    function submitHandler(event) {
        event.preventDefault();
        if(!formIsValid){
            return;
        }
        
        
        
        const temp=localStorage.getItem(nameValue);
        if(temp!=null)
        {
            console.log(JSON.parse(temp),temp);
            let password=JSON.parse(temp).password
            let user_date=JSON.parse(temp);
            if(password==passValue)
            {
                //navigate('/level')
                //navigate('/game');
                setcon((last)=>{return {...last,user:{name:nameValue,...user_date}}})
                localStorage.setItem('context',JSON.stringify({...con,user:{name:nameValue,...user_date}}))
                setmodal("you are logged in!")

            }
            else{
                setmodal('incorrect information')
            }
            
        }
        else{
            setmodal('incorrect information')
        }
        // passReset();
        // nameReset();
        return;
    }   
    function modalHandler(event){

        if(modal == 'you are logged in!')
        {

            navigate('/game');
        }
        else{
            setmodal(false);
        }
    }

    return(
      
        <div className={classes.login}>
            <h2>Welcome to Mine Sweeper Game</h2>
            <h3 className={classes.login_text}>Log In</h3>
            <form className={`${classes.form}`}>

                <label  htmlFor="username">Enter your user name:</label>
                <input className={nameClass} id="username" 
                type="text" placeholder="your user name" 
                onChange={nameChangeHandler} onBlur={nameBlurHandler}  value={nameValue}
                title={nameHasError?"username is incorrect":undefined}/>

                <label   htmlFor="password">Enter your password:</label>
                <input  className={passClass} id="password"
                 type="password" placeholder="your password"
                 onChange={passChangeHandler} onBlur={passBlurHandler} 
                   value={passValue} title={passHasError?"password is incorrect":undefined}/>

                <input className={`${classes.submit} ${classes.input}`} type="submit" value="Submit" 
                onClick={submitHandler} onSubmit={submitHandler}/>
            </form>
            {modal && <Result message={modal} onClick={modalHandler}></Result>}
        </div>
    );
}

export default Login;