const initialState = {
    recipes: [],
    recipesTotal: [],
    dietTypes: [],
    detail: []
};
 
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case "GET_RECIPES": 
            return {
                ...state,
                recipes: action.payload,
                recipesTotal: action.payload
            }; 

        case "GET_DIET_TYPES":
            return {
                ...state,
                dietTypes: action.payload
            };

        case "GET_RECIPES_BY_NAME": 
            return {
                ...state,
                recipes: action.payload
            };    

        case "GET_RECIPE_DETAIL": 
            return {
                ...state,
                detail: action.payload
            };

        case "FILTER_BY_ORDER":
            let filterO;

            if (action.payload === "asc") 
                filterO = state.recipesTotal.sort((a,b) => {
                    if (a.puntuation > b.puntuation) return 1;
                    else if (a.puntuation < b.puntuation) return -1;
                    else return 0;
                })

            else if (action.payload === "desc") 
                filterO = state.recipesTotal.sort((a,b) => {
                    if (a.puntuation > b.puntuation) return -1;
                    else if (a.puntuation < b.puntuation) return 1;
                    else return 0;
                });
            
            else filterO = state.recipesTotal;
            
            return {
                ...state,
                recipes: filterO
            };    

        case "FILTER_BY_ORDER_ALPHABETICAL":
            let filterAlp;

            if (action.payload === "asc") 
                filterAlp = state.recipesTotal.sort((a,b) => {
                    if (a.name > b.name) return 1;
                    else if (a.name < b.name) return -1;
                    else return 0;
                })

            else if (action.payload === "desc") 
                filterAlp = state.recipesTotal.sort((a,b) => {
                    if (a.name > b.name) return -1;
                    else if (a.name < b.name) return 1;
                    else return 0;
                });
            
            else filterAlp = state.recipesTotal;
            
            return {
                ...state,
                recipes: filterAlp
            };   

        case "FILTER_BY_DIET_TYPES":
            const recipesTotal = state.recipesTotal;
            const dietsApi = [];
            const dietsDB = [];
            console.log(recipesTotal)
            recipesTotal.forEach(diet => {
                if (diet.hasOwnProperty("diets") && diet.diets.includes(action.payload)) {dietsApi.push(diet)}
            })

            recipesTotal.forEach(diet => {
                if (diet.hasOwnProperty("diets") && diet.diets.find(diet => diet.name === action.payload)) {dietsDB.push(diet)}
            })
            console.log(dietsApi, dietsDB)
            const response = dietsApi.concat(dietsDB);

            if (response.length) {
                return {
                    ...state,
                    recipes: response
                };
            }
            break; 

        case "FILTER_BY_CREATION":
            let filterC;

            if (action.payload === "existent") 
                filterC = state.recipesTotal.filter(rcp => !rcp.createdInDB);

            else if (action.payload === "created") 
                filterC = state.recipesTotal.filter(rcp => rcp.createdInDB);

            else filterC = state.recipesTotal;

            return {
                ...state,
                recipes: filterC
            };           

        case "POST_RECIPE": 
            return {
                ...state
            }; 

        default: return state;
    };
};

export default reducer;