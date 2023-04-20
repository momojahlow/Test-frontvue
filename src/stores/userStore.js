import { defineStore } from 'pinia'
import axios from '@/lib/axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useUserStore = defineStore('userStore',  {

  state: () => ({
    listUsers:[],
    user:null,
  }),  

  actions:{
    async getUsers(type,loading) {
        loading.value=true
        let url='/api/users'
        if (type === 'admins') {
          url='/api/users/admin'
        } 
        axios
            .get(url)
            .then(response => {
                const {data }=response
                this.listUsers = data.data
                loading.value=false
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    },
    async getUser(id,load) {
      axios
          .get(`/api/users/${id}`)
          .then(response => {
              const {data }=response
              this.user = data.data
              load.value=false              
          })
          .catch(error => {
            if (error.response.status !== 409) this.router.push('/utlisateurs')           
          })
    },
    async deleteUser(id) {
      await csrf()        
      axios
          .delete(`/api/users/${id}`, id)
          .then(response => {
              const result =response.data
              this.listUsers=this.listUsers.filter(societe => societe.id !== id)               
          })
          .catch(error => {
              console.log(error)
              if (error.response.status !== 422) throw error
          })
    },
  }

})