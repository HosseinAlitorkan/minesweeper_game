import classes from './Home.module.css';
import { Link, Route, Routes,useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux';    

function Home (props) {
const location=useLocation();
const isLogedIn=useSelector((state)=>state.data.isLogedIn);
const menu=<div className={classes.home_menu}>
            <h1>Mine Sweeper Game</h1>
            <Link to={location.pathname+'/level'}>Start Game</Link>
            <Link to={location.pathname+'/scores'}>Scores</Link>
            <Link to="/">Log Out</Link> </div> 
const pre_menu=<div className={classes.home_inter}>
        <h1>Mine Sweeper Game</h1>
        <Link to='login'>Log In</Link>
        <Link to='signup'>Sign Up</Link>
    </div>            
const home=isLogedIn?menu:pre_menu;
return (
    <>
        {home}
    </>
); 
}

export default Home;