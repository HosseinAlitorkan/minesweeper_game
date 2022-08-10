import classes from './Timer.module.css';
import {useState,useEffect} from 'react';
function Timer(props){
    const [time,settime]=useState(0);
    
    useEffect(()=>{
        let id=null;
        if(props.timer)
        {
           
        id=setInterval(() => {
            settime((time) => { return time+10; });
        }, 10);
        }
        else{
            clearInterval(id);
        }
        return ()=>{ clearInterval(id);}
    },[props.timer])
    return (
        <div className={classes.timer}>
            
            {Math.floor(time/1000)}
        </div>
    );
}

export default Timer;