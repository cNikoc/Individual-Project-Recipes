const axios = require('axios').default;
const { Recipe, DietTypes } = require('../db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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
            image: obj.image,
            diets: obj.diets.map(diet => diet)
        };
    });
    return apiInfo;
};

const getDbInfo = async () => {

    return await Recipe.findAll({
        include: {
            model: DietTypes,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });
};

// const removeDbInfo = async () => {

//     return await Recipe.destroy({
//         include: {
//             model: DietTypes,
//             attributes: ['id'],
//             through: {
//                 attributes: []
//             }
//         }
//     });
// };

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
    };
};

// const removeRecipesById = async (req,res) => {

//     const id = req.params.id.trim();
//     const allRecipes = await removeDbInfo();

//     if (id) {
//         let recipeId = await allRecipes.filter(recipe => recipe.id.toString() === id.toString());
//             if (recipeId.length > 0) res.status(200).send(recipeId)
//             else res.status(404).json({message: "No recipes with that ID."})
//     }
// };

const showDietTypes = async (req,res) => {

    const response = await axios(`https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    const diet = response.data.results.map(res => res.diets);

    const dietTwo = [];

    diet.map(d2 => {
        for (let i = 0; i < d2.length; i++) {
            dietTwo.push(d2[i]);
        };
    });

    dietTwo.forEach(element => {
        if (element) {
            DietTypes.findOrCreate({
                where: { name: element }
            });
        };
    });

    const allDiet = await DietTypes.findAll();
    res.json(allDiet);
};

const postRecipe = async (req,res) => {

    try {
        let diets = req.body.diets;

        const newRecipe = await Recipe.create({
            name: req.body.name, 
            resumePlate: req.body.resumePlate, 
            puntuation: req.body.puntuation, 
            healthyLevel: req.body.healthyLevel, 
            stepByStep: req.body.stepByStep, 
            image: req.body.image,
            createdInDB: req.body.createdInDB,
        });

        let dietTypeDB = await DietTypes.findAll({
            where: {
                name: {
                    [Op.in] : diets
                }
            }
        });
   
        dietTypeDB.map(d => newRecipe.addDietTypes(d)); // 'add+Modelo' es una funcion que me da Sequelize.

        res.status(200).json({message: "Recipe created succesfully!"});
    }
    catch(err) { 
        console.log(err);
        res.status(404).json({message: "the data is not enough, -neededs: name*, resumePlate*, diets*, puntuation, healthyLevel, stepByStep and image."});
    };
};

module.exports = { 
    showAllRecipes, 
    showRecipesById, 
    showDietTypes, 
    postRecipe,
    // removeRecipesById
};