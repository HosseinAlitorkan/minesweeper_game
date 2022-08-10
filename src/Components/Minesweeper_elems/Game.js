import classes from './Game.module.css';
import Board from './Board'
import {useState,useReducer} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {over,win,setarray} from '../../Features/Data'
import Timer from '../Layout/Timer';
function reducer(state, action) {
    
    if(action.type ==='flag'){
        return {...state, flag_num:state.flag_num-1}
    }
    else if(action.type ==='unflag')
    {
        return {...state, flag_num:state.flag_num+1}
    }
    else if(action.type ==='bomb_unflagged'){
        return {...state, bomb_flaged:state.bomb_flagged-1}
    }
    else if(action.type ==='bomb_flagged'){ 
        return {...state,bomb_flagged:state.bomb_flagged+1} 
    }
    else if(action.type ==='start_game'){
         return {...state,game_start:true}
    }
    else if(action.type ==='lose'){
        return {...state,game_status:false}
    }
    else if(action.type ==='win'){
        return {...state,game_winner:true}
    }
}
const initgame={bomb_num:30,bomb_flagged:0,
    flag_num:30,game_start:false,game_status:true,game_winner:false}
function CreteGame(n_row,n_col,bomb_num) 
{   
    let table_size = (n_row* n_col);
    const table =Array(table_size).fill(null);
    let num=0;
    while(num!=bomb_num)
    {
        let bomb=Math.floor(Math.random()*(table_size)) ;
        if(table[bomb]!='B')
        {
            table[bomb] = 'B';
            num++;
            let indexes;
            if((bomb%n_row == 0)) 
            {
                indexes=[bomb+1,bomb+n_row,bomb+n_row+1,bomb-n_row,bomb-n_row+1]
            }
            else if(bomb%n_row == n_row-1){
                indexes=[bomb-1,bomb+n_row,bomb+n_row-1,bomb-n_row,bomb-n_row-1]
            }
            else{
                indexes=[bomb+1,bomb-1,bomb+n_row,bomb+n_row+1,bomb+n_row-1,
                    bomb-n_row+1,bomb-n_row-1,bomb-n_row]
            }
            //----------------------------------------------------------------
            for(let x of indexes) {
                if(x>-1 && x<n_col*n_row && table[x]!='B') 
                {
                    
                    table[x]+=1;
                }
            }

        }
    }
    return table;
}


function Game(props)
{   
    const n_col = 9,n_row = 9;
    const [show_arr,set_showarr]=useState([]);
    const [game,dispatch] = useReducer(reducer,initgame);
    const [table_arr,set_arr]=useState(CreteGame(9,9,30));
    
    console.log("flagged bomb: ",game.bomb_flagged);
    if(game.bomb_flaged==game.bomb_num)
    {
        dispatch({type:"lose"});
        dispatch({type:"win"});
        console.log("you win");
    }
    function clickHandler(i,event,style,setstyle)
    {
       if(game.game_status ===true)
       {
            if(game.game_start===false)
            {
                dispatch({type: 'start_game'});
            }
            if(style.clicked || style.flagged){
                return;
            }
            else
            {
                    
                if(table_arr[i]=='B' )
                {
                    setstyle((last)=>{return {...last,bombed:true}})
                    dispatch({type:'lose'});
                    
                }
                else{
                    console.log("logged");
                    check(i,table_arr,show_arr,0);
                }    
            }
       }
       
    }
    function contextMenuHandler(i,event,style,setstyle)
    {
        event.preventDefault();
        if(game.game_start===false)
        {
            dispatch({type: 'start_game'});
        }
        if(style.clicked)
        {
            console.log("cant flag this button because it's clicked");
            return;
        }
        else {
            if(style.flagged){
                setstyle((last)=>{return {...last,flagged:false}})
                dispatch({type:"unflag"});
                if(table_arr[i]=='B'){
                    dispatch({type:"bomb_unflagged"});
                }
            }
            else{
                setstyle((last)=>{return {...last,flagged:true}})
                dispatch({type:"flag"});
                console.log(table_arr[i]);
                if(table_arr[i]=='B'){
                    dispatch({type:"bomb_flagged"});
                }
            }
        }
        
    }
    function set_changer(style,setstyle,i){
        set_showarr((state)=>{
            const new_arr=[...state];
            new_arr[i]={style,setstyle};
            return new_arr;
        })
    }
    function check(i,table_arr,show_arr,m)
    {
        
        if(table_arr[i]!='B' && show_arr[i].style.flagged==false &&
         show_arr[i].style.clicked==false)
        { 
            if(table_arr[i]!=null)
            {
                 show_arr[i].setstyle((last)=>{return {...last,number:table_arr[i]}})
            }
            else{
                show_arr[i].setstyle((last)=>{return {...last,number:0}})
            }
            show_arr[i].setstyle((last)=>{return {...last,clicked:true}})
            
            if(m<4)
            {
                
                const indexes=[i-1,i+1,i-n_row,i+n_row];
                for( let x of indexes )
                {
                    
                    if(x>-1 && x<=n_row*n_col && x%n_row!=0 && x%n_row!=n_row-1) 
                    {
                        check(x,table_arr,show_arr,m+1);
                    }
                }
            }
        }   
        return;
        
    }
    
    console.log(table_arr);
    return (
    <div className={classes.game}>
        <div className={classes.game_info}>
            
            <div className={classes.flag_num}>
                <p className={classes.flag_num_header}>Flags: {game.flag_num}</p>
                
            </div>
            <div className={classes.status}>{game.game_status?'🙂':'😵'}</div>
            <Timer timer={game.game_start && game.game_status}/>
        </div>
        <Board level='easy' 
         onContextMenu={contextMenuHandler} onClick={clickHandler}  change={set_changer}/>
           
         
    </div>
    );
}

export default Game;