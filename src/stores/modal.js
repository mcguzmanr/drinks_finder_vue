import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFavoritesStore } from './favorites'
import { useBebidasStore } from './bebidas'

export const useModalStore = defineStore('modal', () => {

    const favorites = useFavoritesStore()
    const drinks = useBebidasStore()
    const modal = ref(false)

    function handleClickModal(){
        modal.value = !modal.value
    }

    const buttonText = computed(() => {
        return favorites.favoriteExists(drinks.recipe.idDrink) ? 'Remove from favorites' : 'Add to favorites'
    })

    return {
        modal,
        handleClickModal,
        buttonText
    }
})