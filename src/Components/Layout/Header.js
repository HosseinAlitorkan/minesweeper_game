import React from "react";
import headerimage from '../../assets/images.jpg';
import classes from './Headerstyle.module.css';
import {Link} from 'react-router-dom'

function Header(props)
{

    return (
        <div className={classes.header}>
            <img src={headerimage} alt="picture not found"/>
            <nav className={classes.nav}>
                <div className={classes.nav_div}>
                    <Link to="home">Home</Link>
                    <Link to="home">Scores</Link>
                    <Link to="home">Contact Us</Link>
                    <Link to="home">Instruction</Link>
                    

                </div>
            </nav>
        </div>
    )
}

export default Header;