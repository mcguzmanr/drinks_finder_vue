import api from "../lib/axios"

export default {
    obtenerCategorias() {
        return api.get('/list.php?c=list')
    },
    getIngredients() {
        return api.get('/list.php?i=list')
    },
    getGlasses() {
        return api.get('/list.php?g=list')
    },
    seachRecipiesByIngredient({name}) {
        return api(`/filter.php?i=${name}`)
    },
    seachRecipiesByCategories({ctgName}) {
        return api(`/filter.php?c=${ctgName}`)
    },
    seachRecipiesByGlasses({glsName}) {
        return api(`/filter.php?g=${glsName}`)
    },
    searchRecipe(id) {
        return api(`/lookup.php?i=${id}`)
    }

}