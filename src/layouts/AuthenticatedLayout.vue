<script setup>
import {Sidenav,initTE} from "tw-elements";
import { ref, onBeforeMount } from 'vue'
import { useUsers } from '@/stores/user'
import ApplicationLogo from '@/components/ApplicationLogo.vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownLink from '@/components/DropdownLink.vue'
import NavLink from '@/components/NavLink.vue'
import ResponsiveNavLink from '@/components/ResponsiveNavLink.vue'

initTE({ Sidenav });

const showingNavigationDropdown = ref(false)

const store = useUsers()

const auth = store.authUser

onBeforeMount(() => {
    if (!store.hasUserData) {
        store.getData()
    }
})

const submitLogout = () => {
    store.logout()
}
</script>

<template>
    <div v-if="auth">
        <div class="min-h-screen bg-gray-100">
            <nav class="bg-white border-b border-gray-100">
                <!-- Primary Navigation Menu -->
                <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <router-link to="/">
                                    <ApplicationLogo class="block h-9 w-auto" />
                                </router-link>
                            </div>

                            <!-- Navigation Links -->
                            <!-- <div
                                class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <router-link
                                    v-slot="{ href, isActive, navigate }"
                                    to="/dashboard"
                                    custom>
                                    <NavLink
                                        :href="href"
                                        :active="isActive"
                                        @click="navigate">
                                        Dashboard
                                    </NavLink>
                                </router-link>
                            </div> -->
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ml-6">
                            <!-- Settings Dropdown -->
                            <div class="ml-3 relative">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                                {{ store.userData.nom }}

                                                <svg
                                                    class="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor">
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <router-link to="/profil" >                                            
                                            <DropdownLink >Mon profil</DropdownLink>
                                        </router-link>
                                        <DropdownLink @click="submitLogout">
                                            Deconnexion
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <!-- <div class="-mr-2 flex items-center sm:hidden">
                            <button
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                @click="
                                    showingNavigationDropdown =
                                        !showingNavigationDropdown
                                ">
                                <svg
                                    class="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        :class="{
                                            hidden: showingNavigationDropdown,
                                            'inline-flex':
                                                !showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path
                                        :class="{
                                            hidden: !showingNavigationDropdown,
                                            'inline-flex':
                                                showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div> -->
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div
                    :class="{
                        block: showingNavigationDropdown,
                        hidden: !showingNavigationDropdown,
                    }"
                    class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <router-link
                            v-slot="{ href, isActive, navigate }"
                            to="/dashboard"
                            custom>
                            <ResponsiveNavLink
                                :href="href"
                                :active="isActive"
                                @click="navigate">
                                Dashboard
                            </ResponsiveNavLink>
                        </router-link>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="pt-4 pb-1 border-t border-gray-200">
                        <div class="px-4">
                            <div class="font-medium text-base text-gray-800">
                                {{ store.userData.nom }}
                            </div>
                            <div class="font-medium text-sm text-gray-500">
                                {{ store.userData.email }}
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <router-link
                                v-slot="{ href, navigate }"
                                to="/"
                                custom>
                                <ResponsiveNavLink
                                    :href="href"
                                    @click="navigate">
                                    Log Out
                                </ResponsiveNavLink>
                            </router-link>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="flex">
                <aside class="flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
                    <div class="flex flex-col justify-between flex-1 mt-6">
                        <nav class="-mx-3 space-y-6 ">
                            <div class="space-y-3 " v-if="store.userData.type ==='admin'">
                                <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Admin users</label>

                                <router-link  to="/ajouter-admin" 
                                    class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg 
                                        hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span class="mx-2 text-sm font-medium">Ajouter</span>
                                </router-link>
                                <router-link  to="/admins" 
                                    class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg 
                                        hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span class="mx-2 text-sm font-medium">Liste</span>
                                </router-link>
                            </div>

                            <div class="space-y-3 ">
                                <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400 flex items-center">
                                    <i class="material-icons orange600">domain</i><span class="before:ml-1">Entreprises</span>
                                </label>

                                <router-link  v-if="store.userData.type ==='admin'"
                                    to="/entreprises" 
                                    class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg 
                                        hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span class="mx-2 text-sm font-medium">Liste entreprises</span>
                                </router-link>
                                <router-link v-if="store.userData.type ==='employe'"
                                    to="/mon-entreprise" 
                                    class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg 
                                        hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span class="mx-2 text-sm font-medium">Mon entreprise</span>
                                </router-link>

                                <router-link  v-if="store.userData.type ==='admin'"
                                    to="/invitations" 
                                    class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg 
                                        hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span class="mx-2 text-sm font-medium">Liste invitations</span>
                                </router-link>

                                <router-link 
                                    to="/utlisateurs" 
                                    class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg 
                                        hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span class="mx-2 text-sm font-medium">Liste des employés</span>
                                </router-link>
                            </div>

                            <!-- <div class="space-y-3 ">
                                <label class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400">Customization</label>

                                <a class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                                    </svg>

                                    <span class="mx-2 text-sm font-medium">Themes</span>
                                </a>

                                <a class="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>

                                    <span class="mx-2 text-sm font-medium">Setting</span>
                                </a>
                            </div> -->
                        </nav>
                    </div>
                </aside>
                <div class="flex-1">
                    <!-- Page Heading -->
                    <header v-if="$slots.header" class="bg-white shadow">
                        <div class="w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            <slot name="header" />
                        </div>
                    </header>
                    <!-- Page Content -->
                    <main>
                        <slot />
                    </main>
                </div>
            </div>          

            
        </div>
    </div>
</template>
