import React from 'react';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import LandingPage from '../src/components/landingpage/LandingPage';
import Home from '../src/components/home/Home';
import RecipeCreator from "../src/components/recipecreator/RecipeCreator";
import RecipeDetail from "../src/components/recipeDetail/RecipeDetail";
import './App.css';

const App =()=> {
  return (
    <BrowserRouter>
     <div className="App">
       <Switch>
         <Route exact path="/" component = { LandingPage }/>
         <Route path="/home" component = { Home }/>
         <Route path="/recipe" component = { RecipeCreator }/>
         <Route path="/recipes/:id" component = { RecipeDetail }/>
       </Switch>
     </div>
    </BrowserRouter>
  );
};

export default App;
