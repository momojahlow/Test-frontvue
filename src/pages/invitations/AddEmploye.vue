<script setup>

import { useInvitStore } from '@/stores/invitEmployeStore';
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import PrimaryButton from '@/components/PrimaryButton.vue'
import GuestLayout from '@/layouts/GuestLayout.vue'
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'
import { useRoute } from 'vue-router'
import axios from '@/lib/axios'


const invitStore= useInvitStore();
const route = useRoute()
invitStore.getInvitationByToken(route.params.token)

const form = ref({
    prenom: '',
    nom: '',
    email: '',
    password: '',
    password_confirmation: '',
    type: 'employe',
})

const processing = ref(false)
const added = ref(false)

const setErrors = ref()

const errors = computed(() => setErrors.value)


onMounted(async () => {
    axios
          .get(`/api/get-invit-by/${route.params.token}`)
          .then(response => {            
              const {data}=response
              form.value.email=data.data.email
          })
          .catch(error => {
              if (error.response.status !== 409) throw error
          })
})


const submitAddEmploye = () => {
    
    invitStore.addEmploye(form, setErrors, processing,added)
}
</script>

<template>
    <GuestLayout>
        <ValidationErrors class="mb-4" :errors="errors" />
        <div class="mb-4 rounded-none bg-success-100 px-6 py-2 text-base text-success-700 flex items-center" role="alert"  v-if="added">
            <i class="material-icons">done</i><span class=""> Compte créer!</span>
        </div>
        

        <form @submit.prevent="submitAddEmploye">
            <div class="mx-auto max-w-md pt-10">
                <div >
                    <InputLabel for="email" value="Email" />
                    <TextInput id="email" v-model="form.email" type="email" class="mt-1 block w-full"/>
                </div>
                <div class="mt-4">
                    <InputLabel for="prenom" value="Prénom" />
                    <TextInput id="prenom" v-model="form.prenom" type="text" class="mt-1 block w-full" required/>
                </div>
                <div class="mt-4">
                    <InputLabel for="nom" value="Nom" />
                    <TextInput id="nom" v-model="form.nom" type="text" class="mt-1 block w-full" required />
                </div>
                
                <div class="mt-4">
                    <InputLabel for="password" value="Password" />
                    <TextInput id="password" v-model="form.password" type="password" class="mt-1 block w-full" required autocomplete="new-password" />
                </div>
                <div class="mt-4">
                    <InputLabel for="password_confirmation" value="Confirm Password" />
                    <TextInput id="password_confirmation" v-model="form.password_confirmation" type="password" class="mt-1 block w-full" required utocomplete="new-password"/>
                </div>
                <div class="flex items-center justify-end mt-4">
                    <PrimaryButton class="ml-4" :processing="processing">Ajouter</PrimaryButton>
                </div>
            </div>
        </form>
    </GuestLayout>
</template>
