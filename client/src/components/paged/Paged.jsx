import React from 'react';
import style from "./paged.module.css";

const Paged = ({recipesPerPage, recipesLength, paged}) => {

    const pageNumber = [];

    for (let i = 0; i < Math.ceil(recipesLength/recipesPerPage); i++) {
        pageNumber.push(i + 1);
    };

    return (
        <nav className={style.paged_cont}>
            <ul>
                {
                    pageNumber && pageNumber.map(num => (
                        <button onClick={()=> paged(num)} key={num} className={style.boton_paged}>
                            {num}
                        </button>
                    ))
                }
            </ul>
        </nav>
    )
};

export default Paged;
