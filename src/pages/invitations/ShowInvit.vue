<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="font-semibold text-lg text-gray-800 leading-tight uppercase ">
                Informations invitation
            </div>
        </template>
        <div class="flex flex-col">            
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
                    <div class="overflow-hidden py-4 px-8 bg-white">
                        <div class="py-1.5 bg-green-400 text-center" v-if="load">Chargement en cours</div>
                        <div class="flex space-x-2">
                            <ul class="w-96 pt-10" v-if="!load">
                                <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                    Raison sociale: {{invitStore.invitation.societe.raison_sociale}}
                                </li>
                                <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                    Date: {{invitStore.invitation.date}}
                                </li>
                                <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                                    Email: {{invitStore.invitation.email}}
                                </li> 
                                <li class="w-full py-4">
                                    Etat: 
                                    <span class="text-gray-500 p-2 bg-red-100" v-if="invitStore.invitation.token ==='annuller'">Annuler</span>
                                    <span class="text-gray-500 p-2 bg-gray-100" v-if="invitStore.invitation.token ==='inactif'">Inctif</span>
                                    <span class="text-teal-500 p-2 bg-green-100" v-if="invitStore.invitation.token !=='annuller' && invitStore.invitation.token !='inactif'">Actif</span>
                                    
                                </li> 
                            </ul>  
                            <div class="flex-1">
                                <div class="text-2xl text-gray-600 pt-10"><i class="material-icons after:mr-1">timeline</i>TimeLine:</div>
                                <ol class="border-l border-neutral-300 dark:border-neutral-500">
                                    <li v-for="note in dataNotes">
                                        <div class="flex-start flex items-center pt-3">
                                            <div class="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                                            <p class="text-sm text-neutral-500 dark:text-neutral-300">
                                                {{note}}
                                            </p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>                 
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { ref, computed } from 'vue'
import { useInvitStore } from '@/stores/invitEmployeStore';
import { useRoute } from 'vue-router'

const route = useRoute()
const invitStore= useInvitStore();
const load = ref(true)

invitStore.getInvitation(route.params.id,load)

const dataNotes = computed(() => {
    if (invitStore.invitation?.notes) {
        return JSON.parse(invitStore.invitation?.notes)
    }
})






</script>
