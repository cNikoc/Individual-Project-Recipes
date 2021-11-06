import React from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../../actions';
import { VscSearch } from "react-icons/vsc";
import style from "./searchBar.module.css";

const SearchBar =()=> {

    const dispatch = useDispatch();
    const [search, setSearch] = React.useState("")

    const typing = evt => {
        evt.preventDefault();
        setSearch(evt.target.value);
    };

    const submiting = evt => {
        evt.preventDefault();
        dispatch(getRecipesByName(search))
        setSearch(" ");
        console.log(search)
    };

    const enter = evt => {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          dispatch(getRecipesByName(search));
          setSearch("");
        };
    };

    return (
        <div className={style.sb_cont}>
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
