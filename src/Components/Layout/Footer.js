import classes from "./Footer.module.css";

function Footer(props) {

    return(
        <div className={classes.footer}>
            <div className={classes.Instructions}> alaki hhstshtsteshethth</div>
            <hr/>
            <div className={classes.email}>
                <p>Contact Us: </p>
                <a href="mailto:h.alitorkan1380@gmail.com?title=test">Email of Hossein</a></div>
        </div>
    )
}

export default Footer;