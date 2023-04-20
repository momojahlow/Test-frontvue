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
    prenom: '',
    nom: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: 'admin',
    terms: false,
})

const processing = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)

const submitRegister = () => {
    store.registerUser(form, setErrors, processing)
}
</script>

<template>
    <AuthenticatedLayout>
        <div class="overflow-hidden py-4 px-8 bg-white">
            <div class="mx-auto max-w-md"><ValidationErrors class="mb-4" :errors="errors" /></div>
            

            <form @submit.prevent="submitRegister">
                <div class="mx-auto max-w-md pt-10 ">
                    <div>
                        <InputLabel for="prenom" value="Prénom" />
                        <TextInput
                            id="prenom"
                            v-model="form.prenom"
                            type="text"
                            class="mt-1 block w-full"
                            required
                            autofocus/>
                    </div>
                    <div class="mt-4">
                        <InputLabel for="nom" value="Nom" />
                        <TextInput
                            id="nom"
                            v-model="form.nom"
                            type="text"
                            class="mt-1 block w-full"
                            required
                            autofocus/>
                    </div>

                    <div class="mt-4">
                        <InputLabel for="email" value="Email" />
                        <TextInput
                            id="email"
                            v-model="form.email"
                            type="email"
                            class="mt-1 block w-full"
                            required/>
                    </div>

                    <div class="mt-4">
                        <InputLabel for="password" value="Password" />
                        <TextInput
                            id="password"
                            v-model="form.password"
                            type="password"
                            class="mt-1 block w-full"
                            required
                            autocomplete="new-password" />
                    </div>

                    <div class="mt-4">
                        <InputLabel
                            for="password_confirmation"
                            value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            class="mt-1 block w-full"
                            required
                            autocomplete="new-password" />
                    </div>

                    <div class="flex items-center justify-end mt-4">
                        <PrimaryButton class="ml-4" :processing="processing">
                            Ajouter
                        </PrimaryButton>
                    </div>
                </div>
            </form>
        </div>
    </AuthenticatedLayout>
</template>
