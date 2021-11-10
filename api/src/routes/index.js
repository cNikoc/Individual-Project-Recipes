const { Router } = require('express');
const { 
    showAllRecipes, 
    showRecipesById, 
    showDietTypes, 
    postRecipe, 
    // removeRecipesById
} = require('../controllers/controller');

const router = Router();

router.get("/recipes", showAllRecipes); // todas y query
router.get("/recipes/:id", showRecipesById); 
router.get("/types", showDietTypes);
router.post("/recipe", postRecipe);
// router.delete("/home", removeRecipesById);

module.exports = router; 