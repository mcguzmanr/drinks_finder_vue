<script setup>
    import { computed, ref, watch } from 'vue'
    import { RouterLink, useRoute } from 'vue-router';
    import FormIngredient from './FormIngredient.vue'
    import FormCategory from './FormCategory.vue';
    import FormGlasses from './FormGlasses.vue'
    import {
        RadioGroup,
        RadioGroupLabel,
        RadioGroupOption,
    } from '@headlessui/vue'

    const route = useRoute()
    const showIngredient = ref(true)
    const showCategory = ref(false)
    const showGlasses = ref(false)

    const choices = ['ingredient','category', 'glass']
    const choice = ref(choices[0])

    watch(choice, () => {
        if(choice.value === 'ingredient') {
            showIngredient.value = true
            showCategory.value = false
            showGlasses.value = false
        }
        if(choice.value === 'category'){
            showIngredient.value = false
            showCategory.value = true
            showGlasses.value = false
        }
        if(choice.value === 'glass'){
            showIngredient.value = false
            showCategory.value = false
            showGlasses.value = true
        }
    })

    const paginaInicio = computed(() => route.name === 'home')

    // const handleSubmit = () => {
    //     // TODO: Validar

    //     store.obtenerRecetas()
    // }
</script>

<template>
    <header
        class="bg-slate-800"
        :class="{header : paginaInicio}"
    >
        <div class="mx-auto container px-5 py-10">
            <div class="flex justify-between items-center">
                <div>
                    <RouterLink 
                        :to="{name: 'home'}" 
                    >
                        <img  class="w-32" src="/img/logo.svg" alt="Logo" />
                    </RouterLink>
                </div>

                <nav class="flex gap-4 text-white "> 
                    <RouterLink
                        :to="{name: 'home'}"
                        class="uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        Home
                    </RouterLink>

                    <RouterLink
                        :to="{name: 'favorites'}"
                        class="uppercase font-bold"
                        active-class="text-orange-500"
                    >
                        Favorites
                    </RouterLink>
                </nav>
            </div>
            <div 
                v-if="paginaInicio"
                class="w-full py-16"
            >
                <RadioGroup v-model="choice">
                    <RadioGroupLabel 
                        class="text-2xl text-white uppercase font-bold"
                    >Search recipe by : 
                    </RadioGroupLabel>
                    <div class="text-center md:flex flex-row justify-around my-8 bg-slate-200 text-slate-600 uppercase font-extrabold text-lg">
                        <RadioGroupOption v-slot="{ checked }" v-for="choice in choices" :key="choice" :value="choice">
                            <span :class="checked ? 'text-orange-500' : ''">{{ choice }}</span>
                        </RadioGroupOption>
                    </div>
                </RadioGroup>
            </div>

            <FormIngredient 
                v-if="showIngredient"
            />
            <FormCategory 
                v-if="showCategory"
            />
            <FormGlasses 
                v-if="showGlasses"
            />
        </div>
    </header>
</template>

<style>
    .header {
        background-image: url('/img/bg.jpg');
        background-size: cover;
        background-position: center;
    }
</style>