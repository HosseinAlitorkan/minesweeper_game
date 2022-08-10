import classes from "./Square.module.css";
import {useState,useEffect} from 'react';
import {set_style_arr} from '../../Features/Data'
function Square(props) {
    const [style,setstyle]=useState({flagged:false,clicked:false,number:null,bombed:false});
    
    useEffect(()=>{
        props.change(style,setstyle,props.i);
    },[style])
    function clickHandler(event) 
    {
        props.onClick(event,style,setstyle);
        
    }
    function contextMenuHandler(event) 
    {
        props.onContextMenu(event,style,setstyle);
        
    }
    return (
        <button key={props.key_} onClick={clickHandler} onContextMenu={contextMenuHandler} 
        className={`${classes.button} ${style.flagged?classes.flagged:""} ${!style.clicked?classes.unclicked:""} ${style.bombed?classes.bombed:""}`}>{style.number}
        </button>
    );
}

export default Square;