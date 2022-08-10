import classes from "./Board.module.css";
import Square from './Square'
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {set_show_table} from "../../Features/Data"
function Board(props) {
        
            
            const table_=Array(n_col)
            let show_t_=[]
            if(props.level==="easy"){
            var n_row=9,n_col=9,bomb_num=20;
            }
            else{
                var n_row=16,n_col=9,bomb_num=50;
            }
            
            for(let i=0;i<n_col;++i)
            {
                let temp=Array(n_row)
                for(let j=0;j<n_row;++j){
                    let number=n_row*i+j
                    temp[j] =(<Square   key={number}  i={number}  //start of square:)
                    onContextMenu={(event,style,setstyle) => 
                        {props.onContextMenu(number,event,style,setstyle);}}
                    onClick={(event,style,setstyle)=>
                        {props.onClick(number,event,style,setstyle);}}
                        change={props.change} />
                            )
                        //end of square :)
                }
                table_[i] = <div className={classes.teble_row} key={i}>{temp}</div>
                show_t_=show_t_.concat(temp);
                
            }
              
        
        
    
    return (
        <div className={classes.board}>
            {table_}
        </div>
    );
}

export default Board;