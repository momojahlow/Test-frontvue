<script setup>

import { computed, ref } from 'vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore';
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'


const entrepriseStore= useEntrepriseStore();

const form = ref({
    raison_sociale: '',
    ice: '',
    email: '',
    telephone: '',
    adresse: '',
    ville: '',
})

const adding = ref(false)
const setErrors = ref()

const errors = computed(() => setErrors.value)

const submitAddEntreprise = () => {
    adding.value=true  
    entrepriseStore.addEntreprise(form, setErrors, adding)
}
</script>

<template>
    <div>
        <div class="flex flex-col text-center" >
            <ValidationErrors class="mb-4" :errors="errors" />
        </div>        
        <div class="text-center text-white p-4 bg-teal-300" v-if="adding">En cours</div>

        <form @submit.prevent="submitAddEntreprise">
            <div class="mx-auto max-w-xl pt-10 ">
                <div>
                    <InputLabel for="rs" value="Raison sociale" />
                    <TextInput
                        id="rs"
                        v-model="form.raison_sociale"
                        type="text"
                        class="mt-1 block w-full"
                        required
                    />
                </div>
                <div class="mt-4">
                    <InputLabel for="ice" value="ICE" />
                    <TextInput
                        id="ice"
                        v-model="form.ice"
                        type="text"
                        class="mt-1 block w-full"
                        required
                    />
                </div>

                <div class="mt-4">
                    <InputLabel for="email" value="Email" />
                    <TextInput
                        id="email"
                        v-model="form.email"
                        type="email"
                        class="mt-1 block w-full"
                        required
                    />
                </div>

                <div class="mt-4">
                    <InputLabel for="telephone" value="Téléphone" />
                    <TextInput
                        id="telephone"
                        v-model="form.telephone"
                        type="text"
                        class="mt-1 block w-full"
                        required 
                    />
                </div>
                

                <div class="mt-4">
                    <InputLabel for="adresse" value="Adresse" />
                    <TextInput id="adresse" v-model="form.adresse"
                        type="text"
                        class="mt-1 block w-full"
                        required />
                </div>
                <div class="mt-4">
                    <InputLabel for="ville" value="Ville" />
                    <TextInput
                        id="ville"
                        v-model="form.ville"
                        type="text"
                        class="mt-1 block w-full"
                        required 
                    />
                </div>

                <div class="flex items-center justify-end mt-4">
                    <button type="submit" class="inline-block bg-teal-500 px-6 pb-2 pt-2.5 text-white">
                        Ajouter
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
