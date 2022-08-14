import classes from './Game.module.css';
import Board from './Board'
import {useState,useReducer,useEffect,useContext} from 'react';
import GameContext from "../../Context/Game_Context";
import {over,win,setarray} from '../../Features/Data';
import {useNavigate,Link} from 'react-router-dom';
import Timer from '../Layout/Timer';
import Result from '../Result/Result';
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
    else if(action.type ==='close'){
        return {...state,game_winner:false}
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
    const [con,setcon]=useContext(GameContext);
    //console.log("context: ",con)
    // if(con.user==null)
    // {
    //     console.log("hi",JSON.parse(localStorage.getItem('context')))
    //     setcon(()=>JSON.parse(localStorage.getItem('context')))//it caused some problems with rendeing the app component
    //     //localStorage.removeItem('context')
    // }
    const navigate=useNavigate();
    const n_col = 9,n_row = 9;
    const [show_arr,set_showarr]=useState([]);
    const [game,dispatch] = useReducer(reducer,initgame);
    const [table_arr,set_arr]=useState(CreteGame(9,9,30));
    const [game_end,setgame_end]=useState(false);
    //console.log("flagged bomb: ",game.bomb_flagged,game.bomb_num);
    useEffect(()=>{
        //console.log("check winning");
        if(game.bomb_flagged==game.bomb_num && !game_end)
        {
            //dispatch({type:"lose"});
            dispatch({type:"win"});
            setgame_end(true);
            console.log("you win");
            navigate('login');
        }
    },[game])
    
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
                    //setstyle((last)=>{return {...last,number:'B'}})
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
    function modalHandler(event){
        dispatch({type:"close"});
    }
    function restart(){
        console.log("restart");
        localStorage.setItem('context',JSON.stringify(con));
        window.location.reload(true);
        

    }
    //console.log(table_arr);
    console.log("context2: ",con)
    let score="no score"
    if(con.user!=null)
    {
        if(con.user.score!=null  )
        {
            score=con.user.score
        }
        console.log('score',score)
    }
    
    useEffect(()=>{
    if(con.use==null)    
    { 
        console.log("hi",JSON.parse(localStorage.getItem('context')))
        setcon(()=>JSON.parse(localStorage.getItem('context')))//it caused some problems with rendeing the app component
        //localStorage.removeItem('context')
    }    
    },[])
        
    

    return (
    <div className={classes.game}>
        <p className={classes.score}>your last score: {score} </p>
        <div className={classes.game_info}>
            
            <div className={classes.flag_num}>
                <p className={classes.flag_num_header}>Flags: {game.flag_num}</p>
                
            </div>
            <div className={classes.status}>{game.game_status?'🙂':'😵'}</div>
            <Timer timer={game.game_start && game.game_status}/>
        </div>
        <Board level='easy' 
         onContextMenu={contextMenuHandler} onClick={clickHandler}  change={set_changer}/>
        {game.game_winner && <Result message='You Win😁' onClick={modalHandler} />  } 
        {!game.game_status &&<button className={classes.restart} onClick={restart} >ReStart</button>}
         
    </div>
    );
}

export default Game;