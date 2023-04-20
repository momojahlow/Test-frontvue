<script setup>

import { useUsers } from '@/stores/user'
import { computed, ref } from 'vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'

const store = useUsers()

const form = ref({
    prenom: store.userData.prenom,
    nom: store.userData.nom,
    email: store.userData.email,
})

const processing = ref(false)
const update = ref(false)
const updated = ref(false)
const setErrors = ref()

const errors = computed(() => setErrors.value)

const submitProfilUpdate = () => {
    store.updateUserProfil(form, setErrors,processing,updated)
}
</script>

<template>
    <AuthenticatedLayout>
        <div class="bg-white p-4 flex space-x-2">
            <ul class="w-96 pt-10">
                <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                    Prénom: {{form.prenom}}
                </li>
                <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                    Nom: {{form.nom}}
                </li>
                <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
                    Email: {{form.email}}
                </li>
                <li class="w-full py-4">
                    <button type="button" class="bg-teal-300 px-6 pb-2 pt-2.5 text-white hover:bg-teal-600" 
                        @click="update = !update" v-if="!update">Modifier</button>
                    <button type="button" class="inline-block bg-red-400 px-6 pb-2 pt-2.5 text-white hover:bg-red-600"
                        @click="update = !update" v-if="update">Fermer</button>
                </li>
            </ul>
            <div class="w-96" v-if="update">
                <div class="mb-4 rounded-none bg-success-100 px-6 py-2 text-base text-success-700 flex items-center" role="alert"  v-if="updated">
                    <i class="material-icons">done</i><span class=""> Votre profil a été mis à jour!</span>
                </div>
                <ValidationErrors class="mb-4" :errors="errors" />

                <form @submit.prevent="submitProfilUpdate">
                    <div class="mx-auto max-w-md pt-10">
                        <div>
                            <InputLabel for="prenom" value="Prénom" />
                            <TextInput id="prenom" v-model="form.prenom" type="text" class="mt-1 block w-full" required />
                        </div>
                        <div class="mt-4">
                            <InputLabel for="name" value="Nom" />
                            <TextInput id="nom" v-model="form.nom" type="text" class="mt-1 block w-full" required/>
                        </div>

                        <div class="mt-4">
                            <InputLabel for="email" value="Email" />
                            <TextInput
                                id="email"
                                v-model="form.email"
                                type="email"
                                class="mt-1 block w-full"
                                disabled/>
                        </div>
                        <div class="flex items-center justify-end mt-4">
                            <PrimaryButton class="ml-4" :processing="processing">
                                Modifier
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>            
        </div>
        
    </AuthenticatedLayout>
</template>
