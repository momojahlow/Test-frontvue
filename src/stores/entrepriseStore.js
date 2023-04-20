import { defineStore } from 'pinia'
import axios from '@/lib/axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useEntrepriseStore = defineStore('entrepriseStore',  {

  state: () => ({
    listEntreprises:[],
    entreprises:null,
    loading:false,
    addNew:false
  }),
  

  actions:{
    async getEntreprises() {
        this.loading=true
        axios
            .get('/api/societes')
            .then(response => {
                const {data }=response
                this.listEntreprises = data.data
                this.loading=false
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    },
    async getEntreprise(id,load) {
        axios
            .get(`/api/societes/${id}`)
            .then(response => {
                const {data }=response
                this.entreprise = data.data
                load.value=false
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    },
    async addEntreprise(form, setErrors, adding) {
        await csrf()        
        axios
            .post('/api/societes', form.value)
            .then(response => {
                const result =response.data
                
                this.listEntreprises.push(result.data)
                adding.value = false
                this.addNew = false                
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors.value = Object.values(
                    error.response.data.errors,
                ).flat()
            })
    },
    async deleteEntreprise(id,message) {
        await csrf() 
        const url = `/api/societes/${id}`       
        axios
            .delete(url, id)
            .then(response => {
                const result =response.data
                message.value= 'success'
                this.listEntreprises=this.listEntreprises.filter(societe => societe.id !== id)    
                setTimeout(() => {
                    message.value= ''
                }, 2000);          
            })
            .catch(error => {
                if (error.response.status === 403){
                    message.value= "warning";
                } else{
                    message.value= 'error';
                } 
                setTimeout(() => {
                    message.value= ''
                }, 2000);
            })
    },
  }

})