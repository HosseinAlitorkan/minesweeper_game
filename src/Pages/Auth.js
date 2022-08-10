import classes from "./Auth.module.css";
import useInput from '../Hooks/useInput'
import {useNavigate} from 'react-router-dom'
function namevalidate(value){
    //console.log("function_name",value);
    if(value.trim() =="")
    {return false;}
    return true;
}
function passvalidate(value){
    //console.log("function_pass",value.length);
    if(value.trim().lenght<6 || value.trim()=="")
    {
        
        return false;
    }
     return true; 
}
function Login(props) {
    
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
    function submitHandler(event) {
        event.preventDefault();
        if(!formIsValid){
            return;
        }
        const values={username:nameValue,password:passValue}
        passReset();
        nameReset();
        console.log("submited!",values)
        const temp=localStorage.getItem(nameValue);
        if(temp!=null && temp==passValue)
        {
            //navigate('/level')
            navigate('/game');
        }
        else{

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
        </div>
    );
}

export default Login;