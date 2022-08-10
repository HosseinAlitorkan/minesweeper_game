import classes from './Lay.module.css';
import Header from "./Header"
import Footer from "./Footer"
import {Outlet} from 'react-router-dom'
import Auth from '../../Pages/Auth'

function Lay(props){

    return(
        <div className={classes.body}>
            <Header></Header>
            <Outlet/>
            <Footer></Footer>
            
        </div>
    );
}

export default Lay;