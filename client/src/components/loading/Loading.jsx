import React from 'react';
import style from './loading.module.css';

const Loading =()=> {
    return (
        <div>
            <div className={style.spinner}>
                <h4>🥄</h4>
            </div>
            <h5 className={style.spinner_h5}>Loading...</h5>
        </div>
    );
};

export default Loading;
