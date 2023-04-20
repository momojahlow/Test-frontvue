<template>
    <AuthenticatedLayout>
        <template #header>
            <div class="font-semibold text-lg text-gray-800 leading-tight uppercase ">
                {{ userStore.title}}
            </div>
        </template>
        <div class="flex flex-col">            
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <div class="py-1.5 bg-green-400 text-center" v-if="loading">Chargement en cours</div>
                    <table class="min-w-full text-left text-sm font-light">
                        <thead
                            class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                            <tr>
                            <th scope="col" class="px-6 py-4">Prénom</th>
                            <th scope="col" class="px-6 py-4">Nom</th>
                            <th scope="col" class="px-6 py-4">Email</th>
                            <th scope="col" class="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-for="(user, index) in userStore.listUsers">
                            <tr class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" v-if="index % 2 === 0">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{user.prenom}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{user.nom}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{user.email}}</td>
                                <td class="whitespace-nowrap px-6 py-4"> 
                                    <router-link  :to="`/info-utlisateur/${user.id}`">
                                        <i class="material-icons cursor-pointer hover:text-teal-700" >visibility</i>
                                    </router-link >
                                    <i class="material-icons cursor-pointer text-red-400 hover:text-red-700" v-if="store.userData.type === 'admin'"
                                        @click="userStore.deleteUser(user.id)">delete
                                    </i>
                                </td>
                            </tr>
                            <tr class="border-b bg-white dark:border-neutral-500 dark:bg-neutral-600" v-if="index % 2 !== 0">
                                <td class="whitespace-nowrap px-6 py-4 font-medium">{{user.prenom}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{user.nom}}</td>
                                <td class="whitespace-nowrap px-6 py-4">{{user.email}}</td>
                                <td class="whitespace-nowrap px-6 py-4"> 
                                    <router-link  :to="`/info-utlisateur/${user.id}`">
                                        <i class="material-icons cursor-pointer hover:text-teal-700" >visibility</i>
                                    </router-link >
                                    <i class="material-icons cursor-pointer text-red-400 hover:text-red-700" v-if="store.userData.type === 'admin'"
                                        @click="userStore.deleteUser(user.id)">delete
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

import { ref } from 'vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import { useUserStore } from '@/stores/userStore';
import { useUsers } from '@/stores/user'
import { useRoute } from 'vue-router'

const userStore= useUserStore();
const store = useUsers()
const route = useRoute()
const loading = ref(false)

userStore.getUsers(route.name,loading)
</script>
