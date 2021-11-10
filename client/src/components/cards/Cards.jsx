import React from 'react';
import { NavLink } from 'react-router-dom';
import notfound from './notfound.jpg';
import style from "./cards.module.css";

const Cards =({name, image, dietType, id})=> {
    return (
        <div>
            <div className = { style.card_card }>
                <NavLink 
                to={'/recipes/' + id} 
                className={style.card_name} 
                activeClassName={style.card_name_i} 
                target="_BLANK">
                    { name }</NavLink>

                <NavLink 
                to={'/recipes/' + id} 
                target="_BLANK">
                    <img 
                    alt="card imgn" 
                    src={ image ? image : notfound }
                    className={style.card_img}/></NavLink>

                <h5 className={style.card_dt}>Diet-types:</h5>
                <h6 className={style.card_dts}>
                    { dietType.length ? `  • ${dietType}  ` : "• No diet-type specified for this recipe, sorry..." }</h6>
            </div>
        </div>
    );
};

export default Cards;














// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { removeRecipe } from "../../actions";
// import style from "./cards.module.css";

// const Cards =({name, image, dietType, id})=> {

//     const dispatch = useDispatch();
    
//     const close = id => {
//         dispatch(removeRecipe(id));
//     };

//     return (
//         <div>
//             <div className = { style.card_card }>
//                 <button className = { style.btn_delete } onClick={() => close(id)}>X</button>
//                 <NavLink to={'/recipes/' + id} className={style.card_name} activeClassName={style.card_name_i}>{ name }</NavLink>
//                 <NavLink to={'/recipes/' + id}><img 
//                 alt="card imgn" 
//                 src={ image }
//                 className={style.card_img}/></NavLink>
//                 <h5 className={style.card_dt}>Diet-types:</h5>
//                 <h6 className={style.card_dts}>{ dietType ? dietType : "none"}</h6>
//             </div>
//         </div>
//     )
// };

// export default Cards;

