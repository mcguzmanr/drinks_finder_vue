import {ref, watch, onMounted, computed} from 'vue'
import { defineStore } from 'pinia'
import { useBebidasStore } from './bebidas'
import { useModalStore } from './modal'
import { useNotificationStore } from './notifications'

export const useFavoritesStore = defineStore('favorites', () => {
   
    const drinks = useBebidasStore()
    const modal = useModalStore()
    const notifications = useNotificationStore()

    const favorites = ref([])

    onMounted(() => {
        favorites.value = JSON.parse(localStorage.getItem('favorites')) ?? []
    })

    watch(favorites, () => {
        sycnLocalStorage()
    }, {
        deep: true
    })

    function sycnLocalStorage() {
        localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }

    function favoriteExists() {
        const favoritesLocalStorage = JSON.parse(localStorage.getItem('favorites')) ?? []
        return favoritesLocalStorage.some(favorite => favorite.idDrink === drinks.recipe.idDrink)
    }

    function removeFromFavorite() {
        favorites.value = favorites.value.filter( favorite => favorite.idDrink !== drinks.recipe.idDrink)
        
        notifications.show = true
        notifications.text = "It was removed from favorites"
    }

    function addToFavorite() {
        favorites.value.push(drinks.recipe)

        notifications.show = true
        notifications.text = "Added to favorites"
    }
    
    function handleClickFavorite() {
        if (favoriteExists()) {
            removeFromFavorite()
        } else {
            addToFavorite()   
        }
        modal.modal = false
    }

    const noFavorites = computed(() => favorites.value.length === 0)

    return {
        favorites,
        handleClickFavorite,
        favoriteExists,
        noFavorites
    }
})