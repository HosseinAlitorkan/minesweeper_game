import  classes from "./Sign.module.css";
import useInput from "../Hooks/useInput";
import {useNavigate} from 'react-router-dom';
import Result from "../Components/Result/Result";
import {useState} from "react";
function namevalidate(name) {
    if(name.trim()=='')
    {
        return false;
    }
    return true;
}
function passvalidate(pass){
    if(pass.trim()=='')
    {return false;}
        
    return true;
}
function Sign(props) {
    const navigate=useNavigate();
    const [modal,setmodal]=useState(false);
    const {value:nameValue,
        haserror:nameHasError,
        reset:nameReset,
        changeHandler:nameChangeHandler,
        blurHandler:nameBlurHandler,
        isValid:nameIsValid}=useInput(namevalidate);
    const {value:passValue,
        haserror:passHasError,
        reset:passReset,
        changeHandler:passChangeHandler,
        blurHandler:passBlurHandler,
        isValid:passIsValid}=useInput(passvalidate);
    const {value:cpassValue,
        haserror:cpassHasError,
        reset:cpassReset,
        changeHandler:cpassChangeHandler,
        blurHandler:cpassBlurHandler,
        isValid:cpassIsValid}=useInput(passvalidate);
    const confirm=passValue===cpassValue?true:false;    
    const formIsValid = nameIsValid&&passIsValid&&cpassIsValid && confirm;  
    
    function submitHandler(event){
        console.log('signed in');
        event.preventDefault();
        if(!formIsValid)
        {
            return ;
        }
        if(localStorage.getItem(nameValue)==null)
        {
            localStorage.setItem(nameValue,JSON.stringify({password:passValue,score:null}));

            //navigate('/', { replace: true });
            setmodal("sign up was successful");
        }
        else{
            setmodal("this user name already exist");
        }

    }
    function modalClickHandler(event){
        if(modal=='sign up was successful')
        {
            navigate('/', { replace: true });
        }
        else {
            setmodal(false);
        }
    }
    const user_class =!nameHasError? classes.input:classes.name_error;
    const pass_class=!passHasError? classes.input:classes.pass_error;
    const cpass_class = !cpassHasError? classes.input:classes.pass_error;

    return (
        <div className={classes.signup}>
            <h2 className={classes.header}>Mine Sweeper Game</h2>
            <h3 className={classes.header}>Sign In</h3>
            <form className={classes.form}>
                <label htmlFor="username">Username</label>
                <input className={user_class} id="username" type="text" placeholder="enter username"
                value={nameValue} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
                <label htmlFor="password">Password</label>
                <input className={pass_class} id="password" type="password" placeholder="enter password"
                value={passValue} onChange={passChangeHandler} onBlur={passBlurHandler}/>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input className={cpass_class}  id="passwordConfirm" type="password" placeholder="enter password again"
                value={cpassValue} onChange={cpassChangeHandler} onBlur={cpassBlurHandler}/>
                
                <input className={`${classes.submit} ${classes.input}`}
                 onSubmit={submitHandler} onClick={submitHandler} type='submit' value='Submit' />
                
            </form>
            {modal && <Result message={modal} onClick={modalClickHandler}></Result>}
        </div>
    )
}

export default Sign;