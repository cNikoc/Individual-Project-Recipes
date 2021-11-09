const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { 
    showAllRecipes, 
    showRecipesById, 
    showDietTypes, 
    postRecipe, 
    // removeRecipesById
} = require('../controllers/controller');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", showAllRecipes); // todas y query
router.get("/recipes/:id", showRecipesById); 
router.get("/types", showDietTypes);
router.post("/recipe", postRecipe);
// router.delete("/home", removeRecipesById);

module.exports = router; 