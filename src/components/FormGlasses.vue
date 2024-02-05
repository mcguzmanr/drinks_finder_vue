<script setup>
    import { computed } from 'vue'
    import { useRoute } from 'vue-router';
    import { useBebidasStore } from '../stores/bebidas'
    import { useNotificationStore } from '../stores/notifications'

    const route = useRoute()
    const store = useBebidasStore()
    const notifications = useNotificationStore()

    const paginaInicio = computed(() => route.name === 'home')

    const handleSubmit = () => {
        if(Object.values(store.glassesSearch).includes('')){
            notifications.text = 'Choice a glass is mandatory'
            notifications.show = true
            notifications.error = true

            return 
        }

        store.getRecipiesByGlasses()
    }
</script>
<template>
    <form
        v-if="paginaInicio" 
        class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-10 p-10 rounded-lg shadow space-y-6"
        @submit.prevent="handleSubmit"
    >
        <div class="space-y-4">
            <label 
                for="ingredient"
                class="block text-white uppercase font-extrabold text-lg"
            >Kind of glass</label>
            <select
                id="ingredient"
                class="p-3 w-full rounded-lg focus:outline-none"
                v-model="store.glassesSearch.glsName"
            >
                <option value="">-- Choose a glass --</option>
                <option
                    v-for="glass in store.glasses"
                    :key="glass.strGlass"
                    :value="glass.strGlass"
                >{{ glass.strGlass }}</option>
            </select>
        </div> 

        <input 
            type="submit"
            class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
            value="Search recipes by Glasses"
        >   
    </form>
</template>


