<script setup>

import { computed, ref } from 'vue'
import { useEntrepriseStore } from '@/stores/entrepriseStore';
import { useInvitStore } from '@/stores/invitEmployeStore';
import TextInput from '@/components/TextInput.vue'
import InputLabel from '@/components/InputLabel.vue'
import ValidationErrors from '@/components/ValidationErrors.vue'


const entrepriseStore= useEntrepriseStore();
const invitStore= useInvitStore();

entrepriseStore.getEntreprises()

const form = ref({
    societe_id: '',
    email: '',
})

const adding = ref(false)
const setErrors = ref()

const errors = computed(() => setErrors.value)

const submitInvitEmploye = () => {
    invitStore.addInvitation(form, setErrors, adding)
}
</script>

<template>
    <div>
        <div class="flex flex-col text-center" >
            <ValidationErrors class="mb-4" :errors="errors" />
        </div>        
        <div class="text-center text-white p-4 bg-teal-300" v-if="adding">En cours</div>

        <form @submit.prevent="submitInvitEmploye">
            <div class="mx-auto max-w-xl pt-10 ">
                <div>
                    
                    <InputLabel for="rs" value="Raison sociale" />
                    <select id="societe" v-model="form.societe_id" required
                        class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm mt-1 block w-full"
                    >
                        <option 
                            v-for="item in entrepriseStore.listEntreprises" 
                            :value="item.id">{{item.raison_sociale}}
                        </option>                        
                    </select>
                </div>
                <div class="mt-4">
                    <InputLabel for="email" value="Email" />
                    <TextInput id="email" v-model="form.email" type="email" class="mt-1 block w-full" required />
                </div>       

                <div class="flex items-center justify-end mt-4">
                    <button type="submit" class="inline-block bg-teal-500 px-6 pb-2 pt-2.5 text-white">
                        Inviter
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
