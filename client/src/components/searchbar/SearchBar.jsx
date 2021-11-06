import React from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../../actions';
import { VscSearch } from "react-icons/vsc";
import style from "./searchBar.module.css";

const SearchBar =()=> {

    const dispatch = useDispatch();
    const [name, setName] = React.useState(" ");

    const typing = evt => {
        evt.preventDefault();
        setName(evt.target.value);
    };

    const submiting = evt => {
        evt.preventDefault();
        dispatch(getRecipesByName(name));
        setName(" ");
    };

    const enter = evt => {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          dispatch(getRecipesByName(name));
          setName(" ");
        };
    };

    return (
        <div>
            <input 
            type="text" 
            placeholder="Search a recipe..." 
            onKeyDown = { enter }
            onChange={evt => typing(evt)}
            className={style.input} />
            <button type="submit" onClick={evt => submiting(evt)} className={style.btn}><VscSearch/></button>
        </div>
    );
};

export default SearchBar;
