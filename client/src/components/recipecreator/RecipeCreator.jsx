import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { postRecipe, getDietTypes } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import style from "./recipeCreator.module.css";

const inputValidate = input => {
    const errors = {};

    if (!input.name) errors.name = "Recipe's name is required!";
    if (!input.resumePlate) errors.resumePlate = "Recipe's summary is required!";

    return errors;
};

const RecipeCreator =()=> {

    const dispatch = useDispatch();
    const dietTypes = useSelector(state => state.dietTypes);
    const history = useHistory();

    React.useEffect(()=>{ dispatch(getDietTypes()) }, [dispatch]);

    const [errors, setErrors] = React.useState({});
    const [habilitado, setHabilitado] = React.useState(false);

    const [input, setInput] = React.useState({
        name: "", 
        resumePlate: "", 
        puntuation: 0, 
        healthyLevel: 0, 
        stepByStep: "", 
        diets: [],
        image: ""
    });

    const typing = evt => {
        evt.preventDefault();
        setInput({
            ...input,
            [ evt.target.name ] : evt.target.value
        });
        setErrors(inputValidate({
            ...input,
            [ evt.target.name ] : evt.target.value
        }))
        Object.keys(errors) ? setHabilitado(true) : setHabilitado(false)
    };

    const submiting = evt => {
        evt.preventDefault();
        dispatch(postRecipe(input));
        alert("Recipe created succesfully!");
        setInput({
            name: "", 
            resumePlate: "", 
            puntuation: 0, 
            healthyLevel: 0, 
            stepByStep: "", 
            diets: [],
            image: ""
        });
        history.push("/home");
    };

    const selection = evt => {
        setInput({
            ...input,
            diets: [...input.diets, evt.target.value]
        });
    };

    return (
        <div>
            <NavLink to="/home" className={style.creator_link} activeClassName={style.creator_link_a}>Get back</NavLink>

            <form className={style.creator_container}>
                <div>
                    <input 
                    placeholder="Name of your recipe...*" 
                    value={input.name} 
                    name="name"
                    onChange={evt =>{ typing(evt) }}
                    autoComplete="off" 
                    className={style.creator_input} />
                    { errors.name && ( <div className={style.creator_err} >{errors.name}</div> ) }
                </div>
                <div>
                    <textarea 
                    placeholder="Summary of your recipe...*" 
                    value={input.resumePlate} 
                    name="resumePlate"
                    onChange={evt =>{ typing(evt) }}
                    className={style.creator_textarea} />
                     { errors.resumePlate && ( <div className={style.creator_err} >{errors.resumePlate}</div> ) }
                </div>
                <div>
                    <label>Score 1/100: </label>
                    <input 
                    type="range" 
                    min="1" max="100" 
                    value={input.puntuation} 
                    name="puntuation" 
                    onChange={evt =>{ typing(evt) }}
                    className={style.creator_range} />
                    <span>{input.puntuation ? input.puntuation : 0} points</span>
                </div>
                <div>
                    <label>Healthiness 1/100: </label>
                    <input 
                    type="range" 
                    min="1" max="100" 
                    value={input.healthyLevel} 
                    name="healthyLevel" 
                    onChange={evt =>{ typing(evt) }}
                    className={style.creator_range2} />
                     <span>{input.healthyLevel ? input.healthyLevel : 0} points</span>
                </div>
                <div>
                    <textarea 
                    placeholder="Step by step of your recipe..." 
                    value={input.stepByStep} 
                    name="stepByStep"
                    onChange={evt =>{ typing(evt) }}
                    className={style.creator_textarea} />
                </div>
                <div>
                    <input 
                    placeholder="Image URL of your recipe..." 
                    type="text" 
                    value={input.image} 
                    name="image"
                    onChange={evt =>{ typing(evt) }}
                    autocomplete="off" 
                    className={style.creator_input_i} />
                </div>
                <div>
                    <label>Diet-Types: </label>
                    <select name="dietType" onChange={evt =>{ selection(evt) }} className={style.creator_select}>
                        { dietTypes && dietTypes.map(diet => (
                            <option value = { diet.name }>{ diet.name }</option> ))
                        }
                    </select>
                </div> 
                <ul className={style.creator_ul}><li>{input.diets && input.diets.map(diet => `// ${diet} //`)}</li></ul>
                <div>
                    {<button 
                    type="submit" 
                    // disabled={!habilitado} 
                    onClick={evt => submiting(evt)} 
                    className={style.creator_btn}>Create!</button>}
                </div>
            </form>
        </div>
    );
};

export default RecipeCreator;