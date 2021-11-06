import React from 'react';
import { NavLink } from 'react-router-dom';
import style from "./cards.module.css";

const Cards =({name, image, dietType, id})=> {
    return (
        <div>
            <div className = { style.card_card }>
                <NavLink to={'/recipes/' + id} className={style.card_name} activeClassName={style.card_name_i}>{ name }</NavLink>
                <NavLink to={'/recipes/' + id}><img 
                alt="card imgn" 
                src={ image }
                className={style.card_img}/></NavLink>
                <h5 className={style.card_dt}>Diet-types:</h5>
                <h6 className={style.card_dts}>{ dietType ? dietType : "none"}</h6>
            </div>
        </div>
    )
};

export default Cards;
