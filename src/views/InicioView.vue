<script setup>
    import Recipe from '@/components/Recipe.vue';
    import { useBebidasStore } from '@/stores/bebidas';

    const drinks = useBebidasStore()
</script>

<template>
    <h1 class="text-6xl font-extrabold">Drink Recipes</h1>

    <p v-if="drinks.noRecipies" class="my-10 text-center text-2xl">There are not favorites</p>
    <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-10 gap-10">
        <Recipe 
            v-for="recipe in drinks.recipies"
            :recipe="recipe"
            :key="recipe.idDrink"
        />
    </div>
</template>

