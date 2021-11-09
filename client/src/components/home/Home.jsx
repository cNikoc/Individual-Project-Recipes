import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Cards from '../cards/Cards';
import Paged from '../paged/Paged';
import SearchBar from '../searchbar/SearchBar.jsx';
import Loading from '../loading/Loading.jsx';
import { 
getAllRecipes, 
filterByOrder,
filterByOrderAlphabetical,  
filterByDietTypes, 
filterByCreation } from '../../actions/index';
import style from "./home.module.css";

const Home =()=> {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [recipesPerPage] = React.useState(9);
    const lastIndexRecipe = currentPage * recipesPerPage;
    const firstIndexRecipe = lastIndexRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(firstIndexRecipe, lastIndexRecipe);
    // eslint-disable-next-line
    const [order, setOrder] = React.useState('');  // desabilité ésta linea porque no uso 'order', solo necesito la funcion seteadora y me estaba tirando un warning molesto en la consola.

    const paged = pageNumber => {
        setCurrentPage(pageNumber);
    };

    React.useEffect(() => { dispatch(getAllRecipes()) }, [dispatch]); // le aclaro que quiero que se vuelva a renderizar cada vez que se haga dispatch

    const handleClick = evt => {
        evt.preventDefault();
        dispatch(getAllRecipes());
    };

    const filterOrder = evt => {
        evt.preventDefault();
        dispatch(filterByOrder(evt.target.value));
        setCurrentPage(1);
        setOrder(`ordered ${evt.target.value}`); // setea el estado local order, declarado más arriba y renderice de nuevo.
    };

    const filterOrderAlphabetical = evt => {
        evt.preventDefault();
        dispatch(filterByOrderAlphabetical(evt.target.value));
        setCurrentPage(1);
        setOrder(`ordered ${evt.target.value}`); // setea el estado local order, declarado más arriba y renderice de nuevo.
    };

    const filterDiets = evt => {
        evt.preventDefault();
        dispatch(filterByDietTypes(evt.target.value));
        setCurrentPage(1);
    };

    const filterCreation = evt => {
        evt.preventDefault();
        dispatch(filterByCreation(evt.target.value));
        setCurrentPage(1);
    };

    return (
        <div>
            <button onClick={evt => handleClick(evt) } className={style.btnrecipes}>Bring all recipes</button>
            <NavLink to="/recipe"><button className={style.btncreate}>Create my own recipe!</button></NavLink>

            <SearchBar />
            
            <div>
                <label className={style.homelabel}> Filter:</label>
                <select onChange={ evt => filterOrder(evt) } className={style.homeselect}>
                    <option value="-">'AS SCORE'</option>
                    <option value="asc">ascendient</option>
                    <option value="desc">descendient</option>
                </select>

                <label className={style.homelabel}> Filter:</label>
                <select onChange={ evt => filterOrderAlphabetical(evt) } className={style.homeselect}>
                    <option value="-">'ALPHABETICALLY'</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            
                <label className={style.homelabel}> Filter:</label>
                <select onChange={ evt => filterDiets(evt) } className={style.homeselect}>
                    <option value="-">'AS DIET TYPE'</option>
                    <option value="gluten free">gluten free</option>
                    <option value="dairy free">dairy free</option>
                    <option value="lacto ovo vegetarian">lacto ovo vegetarian</option>
                    <option value="vegan">vegan</option>
                    <option value="paleolithic">paleolithic</option>
                    <option value="primal">primal</option>
                    <option value="pescatarian">pescatarian</option>
                    <option value="fodmap friendly">fodmap friendly</option>
                    <option value="whole 30">whole 30</option>
                </select>

                <label className={style.homelabel}> Filter:</label>
                <select onChange={ evt => filterCreation(evt) } className={style.homeselect}>
                    <option value="-">'AS CREATED BY'</option>
                    <option value="created">created</option>
                    <option value="existent">already existent</option>
                </select>
            </div>
        
            <Paged 
            recipesPerPage = { recipesPerPage }
            recipesLength = { recipes.length }
            paged = { paged }
            />
            
            <div className={style.home_cardflexcontainer}>
                { currentRecipes.length >= 1
                    ? 
                    currentRecipes.map(recipe => (
                        <Cards
                        key = { recipe.id }
                        name = { recipe.name } 
                        image = { recipe.image } 
                        dietType = { recipe.diets ? recipe.diets : recipe.dietTypes && recipe.dietTypes.map((e) => e.name)}
                        id = { recipe.id }
                        />
                    ))
                    :
                    <h4><Loading /></h4>
                }
            </div>
        </div>
    );
}; 

export default Home;
