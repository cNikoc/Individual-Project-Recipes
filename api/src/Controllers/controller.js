const axios = require('axios').default;
const { Recipe, DietTypes } = require('../db');
const { API_KEY } = process.env;

const getApiInfo = async () => {

    const apiLink = await axios(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const apiInfo = apiLink.data.results.map(obj => {
        return {
            id: obj.id,
            name: obj.title,
            resumePlate: obj.summary,
            puntuation: obj.spoonacularScore,
            healthyLevel: obj.healthScore,
            stepByStep: obj.analyzedInstructions
            .map(r => r.steps.map(s => s.step))
            .flat(1)
            .join(""),
            image: obj.image
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {

    return await Recipe.findAll({
        includes: {
            model: DietTypes,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
};

const getAllRecipes = async () => {

    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();

    return apiInfo.concat(dbInfo);
};

const showAllRecipes = async (req,res) => {

    const name = req.query.name;
    const allRecipes = await getAllRecipes();

    if (name) {
        let recipeName = await allRecipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()))
            if (recipeName.length > 0) res.status(200).send(recipeName)
            else res.status(404).json({message: "No recipes with that name."})
    } 
    else res.status(200).json(allRecipes);
};

const showRecipesById = async (req,res) => {

    const id = req.params.id.trim();
    const allRecipes = await getAllRecipes();

    if (id) {
        let recipeId = await allRecipes.filter(recipe => recipe.id.toString() === id.toString());
            if (recipeId.length > 0) res.status(200).send(recipeId)
            else res.status(404).json({message: "No recipes with that ID."})
    }
};

const diets = [
{name: "gluten free"},
{name: "dairy free"},
{name: "lacto ovo vegetarian"},
{name: "vegan"},
{name: "paleolithic"},
{name: "primal"},
{name: "pescatarian"},
{name: "fodmap friendly"},
{name: "whole 30"}
];

const showDietTypes = async (req,res) => {

    try {
        const response = await DietTypes.findAll();

        if (response.length > 0) return res.status(200).json(response);
        else try {
            const dietDb = await DietTypes.bulkCreate(diets)
        } catch (err) {
            console.log(err)
        }
    }
    catch (err) {
        console.log(err)
    }
};

const postRecipe = async (req,res) => {

    try {
        let dietType = req.body.dietType;

    const newRecipe = await Recipe.create({
        name: req.body.name, 
        resumePlate: req.body.resumePlate, 
        puntuation: req.body.puntuation, 
        healthyLevel: req.body.healthyLevel, 
        stepByStep: req.body.stepByStep, 
        image: req.body.image,
        createdInDB: req.body.createdInDB,
    })

    const dietTypeDB = await DietTypes.findAll({
        where: {name : dietType}
    });

    newRecipe.addDietTypes(dietTypeDB) // ?? DietType ?? plural singular DietTypess
    res.status(200).json({message: "Recipe created succesfully!"});
    }
    catch(err) {
        console.log(err)
    }
};

module.exports = { 
    showAllRecipes, 
    showRecipesById, 
    showDietTypes, 
    postRecipe
};