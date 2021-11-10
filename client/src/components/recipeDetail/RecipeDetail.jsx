import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRecipeDetail } from '../../actions';
import notfound from './notfound.jpg';
import Loading from '../loading/Loading.jsx';
import style from "./recipeDetail.module.css";

const RecipeDetail = props => {

    const dispatch = useDispatch();
    const recipe = useSelector(state => state.detail); 

    React.useEffect(()=>{ dispatch(getRecipeDetail(props.match.params.id)) }, [dispatch, props.match.params.id]);

    return (
        <div className={style.detail_form}>
            <NavLink to="/home" className={style.detail_link} activeClassName={style.detail_link_a}>Get Back</NavLink>
            {   recipe.length >= 1 
                ?
                <div className={style.detail_container}>
                    
                    <h2 className={style.detail_title}>{recipe[0].name}.</h2>
                    <hr/>
                    <h4 className={style.detail_score}> Score: {recipe[0].puntuation} points. </h4> <br/>
                    <h4 className={style.detail_health}> Healthiness: {recipe[0].healthyLevel} points. </h4>
                    <hr/>
                    {
                        <div>
                            <label>Diet-types:</label>
                            {
                                recipe[0].diets && recipe[0].diets.length 
                                ? 
                                recipe[0].diets.map(diet => ` ${diet}. `) 
                                : 
                                recipe[0].diets 
                                ? 
                                " No diet-type specified for this recipe, sorry..." 
                                :
                                recipe[0].dietTypes && recipe[0].dietTypes.length 
                                ? 
                                recipe[0].dietTypes.map(diet => ` ${diet.name}. `) 
                                :
                                " No diet-type specified for this recipe, sorry..."
                            }
                        </div>
                    }
                    <hr/>
                    <p className={style.detail_resume}> Summary: {recipe[0].resumePlate.replace(/<[^>]*>?/g, '')}. </p>
                    <img height="300px" alt="imag-det" src={ recipe[0].image ? recipe[0].image : notfound } className={style.detail_img}/>
                    <hr/>
                    <p className={style.detail_sbs}> Step by step: {recipe[0].stepByStep ? recipe[0].stepByStep : " No step-by-step specified for this recipe, sorry..."}. </p> 
                </div>
                :
                <div>
                    <h4><Loading /></h4>
                    <NavLink to="/home" className={style.detail_link} activeClassName={style.detail_link_a}>Get Back</NavLink>
                </div>
            }
        </div>
    );
};

export default RecipeDetail;
