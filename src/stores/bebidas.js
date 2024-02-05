import { ref, reactive, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import APIService from '@/services/APIService'
import { useModalStore } from './modal'


export const useBebidasStore = defineStore('bebidas', () => {

    const modal = useModalStore()
    const categorias = ref([])
    const recipies = ref([])
    const recipe = ref({})

    const categorySeach = reactive({
        ctgName: ''
    })

    const ingredients = ref([])
    const ingredientSearch = reactive({
        name: ''
    })

    const glasses = ref([])
    const glassesSearch = reactive({
        glsName: ''
    })

    onMounted(async function() {
        const {data: {drinks}} = await APIService.obtenerCategorias()
        categorias.value = drinks  
    })

    onMounted(async function() {
        const {data: {drinks}} = await APIService.getIngredients()
        ingredients.value = drinks  
    })

    onMounted(async function() {
        const {data: {drinks}} = await APIService.getGlasses()
        glasses.value = drinks  
    })

    async function getRecipiesByIngredient() {
        const {data: {drinks}} = await APIService.seachRecipiesByIngredient(ingredientSearch)
        recipies.value = drinks
    }

    async function getRecipiesByCategories() {
        const {data: {drinks}} = await APIService.seachRecipiesByCategories(categorySeach)
        recipies.value = drinks
    }

    async function getRecipiesByGlasses() {
        const {data: {drinks}} = await APIService.seachRecipiesByGlasses(glassesSearch)
        recipies.value = drinks
    }

    async function chooseDrink(id) {
        const {data: {drinks}} = await APIService.searchRecipe(id)
        recipe.value = drinks[0]

        modal.handleClickModal()
    }

    const noRecipies = computed(() => recipies.value.length === 0)

    return {
        categorias,
        recipies,
        ingredients,
        ingredientSearch,
        getRecipiesByIngredient,
        categorySeach,
        getRecipiesByCategories,
        glasses,
        glassesSearch,
        getRecipiesByGlasses,
        chooseDrink,
        recipe,
        noRecipies
    }
})