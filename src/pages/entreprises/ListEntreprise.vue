<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center mb-3">
                <div class="font-semibold text-lg text-gray-800 leading-tight uppercase ">Liste des entreprises</div>
                <button type="button" @click="toggleAddEntreprise"
                    class="inline-block bg-teal-500 px-6 pb-2 pt-2.5 text-xs text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-teal-600 
                ">
                    Ajouter
                </button>
            </div>
            <AddEntreprise v-if="entrepriseStore.addNew"/>
        </template>
        <div class="flex flex-col">            
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <div class="py-1.5 bg-green-400 text-center" v-if="entrepriseStore.loading">Chargement en cours</div>
                    <div class="mb-4 rounded-none bg-success-100 px-6 py-2 text-base text-success-700 flex items-center" role="alert"  v-if="message === 'success'">
                        <i class="material-icons">done</i><span class=""> L'entreprise est supprimée!</span>
                    </div>
                    <div class="mb-4 rounded-none bg-red-300 px-6 py-2 text-base text-white flex items-center" role="alert"  v-if="message === 'error'">
                        <i class="material-icons">error</i><span class=""> Erreur l'entreprise n'est pas supprimée!</span>
                    </div>
                    <div class="mb-4 rounded-none bg-amber-300 px-6 py-2 text-base text-white flex items-center" role="alert"  v-if="message === 'warning'">
                        <i class="material-icons">warning</i><span class=""> L'entreprise ne peut est supprimée!</span>
                    </div>
                    <table class="min-w-full text-left text-sm font-light">
                        <thead
                            class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                            <th scope="col" class="px-6 py-4">raison_sociale</th>
                            <th scope="col" class="px-6 py-4">Ice</th>
                            <th scope="col" class="px-6 py-4">Téléphone</th>
                            <th scope="col" class="px-6 py-4">Email</th>
                            <th scope="col" class="px-6 py-4">Ville</th>
                            <th scope="col" class="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-for="(entreprise, index) in entrepriseStore.listEntreprises">
                            <tr class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" v-if="index % 2 === 0">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{entreprise.raison_sociale}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{entreprise.ice}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{entreprise.telephone}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{entreprise.email}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{entreprise.ville}}</td>
                                <td class="whitespace-nowrap px-6 py-4"> 
                                    <router-link  :to="`/entreprises/${entreprise.id}`">
                                        <i class="material-icons cursor-pointer hover:text-teal-700" >visibility</i>
                                    </router-link >
                                    <i class="material-icons cursor-pointer text-red-400 hover:text-red-700"  @click="delEntreprise(entreprise.id)">delete </i>
                                </td>
                            </tr>
                            <tr class="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600" v-if="index % 2 !== 0">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{entreprise.raison_sociale}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{entreprise.ice}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{entreprise.telephone}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{entreprise.email}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{entreprise.ville}}</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <router-link  :to="`/entreprises/${entreprise.id}`">
                                        <i class="material-icons cursor-pointer hover:text-teal-700" >visibility</i>
                                    </router-link >
                                    <i class="material-icons cursor-pointer text-red-400 hover:text-red-700" @click="delEntreprise(entreprise.id)">delete</i>
                                </td>
                            </tr>
                        </tbody>
                    </table>                    
                </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script setup>

import AddEntreprise from '@/components/AddEntreprise.vue'

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore';
import { ref } from 'vue'

const message = ref('')
const entrepriseStore= useEntrepriseStore();

entrepriseStore.getEntreprises()

const toggleAddEntreprise = () => {
    entrepriseStore.addNew = !entrepriseStore.addNew
}

const delEntreprise = (id) => {
    entrepriseStore.deleteEntreprise(id,message)
}


</script>
