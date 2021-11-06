import React from 'react';
import { useWindowScroll } from 'react-use';
import { AiOutlineArrowUp } from "react-icons/ai";
import style from "./scrollToTop.module.css";

const ScrollToTop =()=> {

    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisibility] = React.useState(false);

    React.useEffect(()=>{
        if (pageYOffset > 600) setVisibility(true);
        else setVisibility(false);
    }, [pageYOffset]);

    if (!visible) return false;

    const sTT = ()=> {
        window.scrollTo({
            top: 0, 
            behavior: "smooth"
        })
    };

    return (
        <div>
            <button onClick={sTT} className={style.STT_btn}><AiOutlineArrowUp/></button>
        </div>
    );
};

export default ScrollToTop;
