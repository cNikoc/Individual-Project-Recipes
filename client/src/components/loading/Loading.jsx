import React from 'react';
import style from './loading.module.css';

const Loading =()=> {
    return (
        <div>
            <div className={style.spinner}>
                <h4><span role="img" aria-label="spoon-cuchara">🥄</span></h4>
            </div>
            <h5 className={style.spinner_h5}>Loading...</h5>
        </div>
    );
};

export default Loading;
