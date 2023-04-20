<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="flex justify-between items-center mb-3">
                <div class="font-semibold text-lg text-gray-800 leading-tight uppercase ">Liste des invitations</div>
                <button type="button" @click="toggleAddInvitation" v-if="!invitStore.newInvit"
                    class="inline-block bg-teal-500 px-6 pb-2 pt-2.5 text-xs text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-teal-600 
                ">
                    Ajouter +
                </button>
                <button type="button" @click="toggleAddInvitation" v-if="invitStore.newInvit"
                    class="inline-block bg-red-400 px-6 pb-2 pt-2.5 text-xs text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 
                ">
                    Annuler x
                </button>
            </div>
            <div class="" v-if="invitStore.newInvit">
                <AddInvit />
            </div>
            
        </template>
        <div class="flex flex-col">            
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <div class="py-1.5 bg-green-400 text-center" v-if="invitStore.loading">Chargement en cours</div>
                    <div class="mb-4 rounded-none bg-success-100 px-6 py-2 text-base text-success-700 flex items-center" role="alert"  v-if="message === 'success'">
                        <i class="material-icons">done</i><span class=""> L'invitation est supprimée!</span>
                    </div>
                    <div class="mb-4 rounded-none bg-red-300 px-6 py-2 text-base text-white flex items-center" role="alert"  v-if="message === 'error'">
                        <i class="material-icons">error</i><span class=""> Erreur l'invitation n'est pas supprimée!</span>
                    </div>
                    <div class="mb-4 rounded-none bg-amber-300 px-6 py-2 text-base text-white flex items-center" role="alert"  v-if="message === 'warning'">
                        <i class="material-icons">warning</i><span class=""> L'invitation ne peut est supprimée!</span>
                    </div>
                    <table class="min-w-full text-left text-sm font-light">
                        <thead
                            class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                            <th scope="col" class="px-6 py-4">raison_sociale</th>
                            <th scope="col" class="px-6 py-4">Email</th>
                            <th scope="col" class="px-6 py-4">Date</th>
                            <th scope="col" class="px-6 py-4">Etat</th>
                            <th scope="col" class="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in invitStore.invitations">
                            <tr class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" v-if="index % 2 === 0">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{item.societe.raison_sociale}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{item.email}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{item.date}}</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <span class="text-gray-500" v-if="item.token ==='annuller'">Annuler</span>
                                    <span class="text-teal-500" v-if="item.token !=='annuller' && item.token !=='inactif'">Actif</span>
                                    <span class="text-red-500" v-if="item.token ==='inactif'">Inctif</span>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4"> 
                                    <router-link  :to="`/invitations/${item.id}`" title="voir">
                                        <i class="material-icons cursor-pointer hover:text-teal-700" >visibility</i>
                                    </router-link >
                                    <i class="material-icons cursor-pointer text-amber-400 hover:amber-red-700" 
                                        @click="remInvitation(item)" title="Annuler">close
                                    </i>
                                    <i class="material-icons cursor-pointer text-red-400 hover:text-red-700" 
                                        @click="delInvitation(item)" title="Supprimer">delete
                                    </i>
                                </td>
                            </tr>
                            <tr class="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600" v-if="index % 2 !== 0">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{item.societe.raison_sociale}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{item.email}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{item.date}}</td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <span class="text-gray-500 p-2 bg-red-100" v-if="item.token ==='annuller'">Annuler</span>
                                    <span class="text-teal-500 p-2 bg-green-100" v-if="item.token !=='annuller' && item.token !=='inactif'">Actif</span>
                                    <span class="text-gray-500 p-2 bg-gray-100" v-if="item.token ==='inactif'">Inctif</span>
                                </td>
                                <td class="whitespace-nowrap px-6 py-4">
                                    <router-link  :to="`/invitations/${item.id}`" title="voir">
                                        <i class="material-icons cursor-pointer hover:text-teal-700" >visibility</i>
                                    </router-link >
                                    <i class="material-icons cursor-pointer text-amber-400 hover:amber-red-700" 
                                        @click="remInvitation(item)"  title="Annuler">close
                                    </i>
                                    <i class="material-icons cursor-pointer text-red-400 hover:text-red-700" 
                                        @click="delInvitation(item)" title="Supprimer">delete
                                    </i>
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

import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { useInvitStore } from '@/stores/invitEmployeStore';
import AddInvit from '@/components/AddInvit.vue';
import { ref } from 'vue'

const message = ref('')

const invitStore= useInvitStore();

invitStore.getInvitations()

const toggleAddInvitation = () => {
    invitStore.newInvit = !invitStore.newInvit
}

const delInvitation = (invit) => {
    if (invit.token !=='' || invit.token !==null) {
        invitStore.deleteInvitation(invit.id,message)
    } else {
        message.value= "warning";
        setTimeout(() => {
                    message.value= ''
                }, 2000);
    }
    
}

const remInvitation = (invit) => {
    if (invit.token !=='' || invit.token !==null) {
        invitStore.removeInvitation(invit.id,message)
    } else {
        message.value= "warning";
        setTimeout(() => {
                    message.value= ''
                }, 2000);
    }
    
}

</script>
