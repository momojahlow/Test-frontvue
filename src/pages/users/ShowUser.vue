<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="font-semibold text-lg text-gray-800 leading-tight uppercase ">
                Informations user
            </div>
        </template>
        <div class="flex flex-col">            
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
                    <div class="overflow-hidden py-4 px-8 bg-white">
                        <div class="py-1.5 bg-green-400 text-center" v-if="load">Chargement en cours</div>
                        <ul class="w-96 pt-10" v-if="!load">
                            <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                Prénom: {{userStore.user.prenom}}
                            </li>
                            <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                Nom: {{userStore.user.nom}}
                            </li>
                            <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                Email: {{userStore.user.email}}
                            </li>
                            <li class="w-full py-4">
                                Email: {{userStore.user.email}}
                            </li>
                        </ul>                   
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore';
import { useRoute } from 'vue-router'

const route = useRoute()

const load = ref(true)

const userStore= useUserStore();

userStore.getUser(route.params.id,load)

</script>
