import React from 'react';
import { NavLink } from "react-router-dom";
import kitchen from './kitchen.mp4';
import style from './landingPage.module.css';

const LandingPage =()=> {
    return (
        <div className={style.LP_container}>
            <video autoPlay loop muted className={style.LP_video} width="100vw" height="100%" >
                <source type="video/mp4" src={kitchen} />
            </video>
            <NavLink to="/home" className="link"><button className={style.LP_btn}>GET IN</button></NavLink>
        </div>
    );
};

export default LandingPage;