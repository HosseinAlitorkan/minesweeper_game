import classes from './Result.module.css';

function Result(props) {
    return (
        <div className={classes.centered}>
            <div className={classes.dark}></div>
            <div className={classes.modal}>
                <div className={classes.header}>
                    Game ennousement
                </div>
                <div className={classes.body}>
                        {props.message}
                </div>
                <div className={classes.footer}>
                    <button onClick={props.onClick} className={classes.button} >Close</button>
                </div>
            </div>
        </div>
    );

}

export default Result;