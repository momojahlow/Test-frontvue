import { defineStore } from 'pinia'
import axios from '@/lib/axios'

const csrf = () => axios.get('/sanctum/csrf-cookie')

export const useInvitStore = defineStore('invitStore',  {

  state: () => ({
    invitations:[],
    invitation:null,
    loading:false,
    newInvit:false
  }),
  

  actions:{
    async getInvitations() {
        this.loading=true
        axios
            .get('/api/invits')
            .then(response => {
                const {data }=response
                this.invitations = data.data
                this.loading=false
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            })
    },
    async getInvitationByToken(token) { 
        
      axios
          .get(`/api/get-invit-by/${token}`)
          .then(response => {            
              const {data}=response
              this.invitation = data.data
              if (this.invitation.length === 0) {                
                this.router.push('/page-not-found')
              }
          })
          .catch(error => {
            if (error.response.status === 500) {                
                this.router.push('/page-not-found')
              }
          })
    },
    async getInvitation(id,load) { 
        axios
            .get(`/api/invits/${id}`)
            .then(response => {            
                const {data}=response                
                this.invitation = data.data
                //console.log(data)
                if (data.status ==='request OK') {
                    load.value=false
                }
                
                if (this.invitation.length === 0) {                
                  this.router.push('/page-not-found')
                }
            })
            .catch(error => {
                if (error.response.status !== 403){
                    this.router.push('/page-not-found')
                }  
            })
      },
    async addInvitation(form, setErrors, adding) {
        await csrf()        
        axios
            .post('/api/invits', form.value)
            .then(response => {
                const result =response.data              
                this.invitations.push(result.data)
                adding.value = false
                this.newInvit = false      
                         
            })
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors.value = Object.values(
                    error.response.data.errors,
                ).flat()
            })
    },
    async addEmploye(form, setErrors, processing,added) {
      await csrf()        
      axios
          .post('/api/store-new-employe', form.value)
          .then(response => {
              const {data} =response          
              this.invitation = data.data
              processing.value=false
              added.value=true
              setTimeout(() => {
                added.value=false
                this.router.push('/login')
            }, 2000);  
                       
          })
          .catch(error => {
              if (error.response.status !== 422) throw error

              setErrors.value = Object.values(
                  error.response.data.errors,
              ).flat()
          })
    },
    async removeInvitation(id,message) {
        await csrf() 
        const url = `/api/invits/${id}`       
        axios
            .put(url, id)
            .then(response => {
                const result =response.data
                console.log(result)
                message.value= 'success'               
            })
            .catch(error => {
                console.log(error)
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
    async deleteInvitation(id,message) {
        await csrf() 
        const url = `/api/invits/${id}`       
        axios
            .delete(url, id)
            .then(response => {
                const result =response.data
                message.value= 'success'
                this.invitations=this.invitations.filter(invitation => invitation.id !== id)               
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