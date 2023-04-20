import { createWebHistory, createRouter } from 'vue-router'
import { useUsers } from '@/stores/user'
import Welcome from '@/pages/Welcome.vue'
import PageNotFound from '@/pages/errors/404.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import RegisterAdmin from '@/pages/users/RegisterAdmin.vue'
import UserProfil from '@/pages/users/UserProfil.vue'
import ListUser from '@/pages/users/ListUser.vue'
import ShowUser from '@/pages/users/ShowUser.vue'
import ListEntreprise from '@/pages/entreprises/ListEntreprise.vue'
import ShowEntreprise from '@/pages/entreprises/ShowEntreprise.vue'
import ListInvit from '@/pages/invitations/ListInvit.vue'
import ShowInvit from '@/pages/invitations/ShowInvit.vue'
import AddEmploye from '@/pages/invitations/AddEmploye.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import ResetPassword from '@/pages/auth/ResetPassword.vue'
import VerifyEmail from '@/pages/auth/VerifyEmail.vue'

const APP_NAME = import.meta.env.VITE_APP_NAME

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome,
        meta: {
            title: 'Welcome',
            metaTags: [
                {
                    name: 'Welcome',
                    content:
                        'An application / authentication frontend in Vue.js 3 for Laravel Breeze.',
                },
                {
                    property: 'og:Welcome',
                    content:
                        'An application / authentication frontend in Vue.js 3 for Laravel Breeze.',
                },
            ],
        },
    },
    {
        path: '/home',
        redirect: '/dashboard',
        component: Dashboard,
        query: {
            verified: 'verified',
        },
        meta: {
            guard: 'auth',
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            guard: 'auth',
        },
    },
    {
        path: '/profil',
        name: 'profil',
        component: UserProfil,
        meta: {
            title: 'Mon profil',
            guard: 'auth',
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        query: {
            reset: 'reset',
        },
        meta: {
            title: 'Log in',
            guard: 'guest',
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: 'Register',
            guard: 'guest',
        },
    },
    {
        path: '/ajouter-admin',
        name: 'register-user',
        component: RegisterAdmin,
        meta: {
            title: 'Register admin user',
            guard: 'auth',
        },
        beforeEnter: [isAutorized],
    },
    {
        path: '/admins',
        name: 'admins',
        component: ListUser,
        meta: {
            title: 'Les admins',
            guard: 'auth',
        },
        beforeEnter: [isAutorized],
    },
    {
        path: '/utlisateurs',
        name: 'users',
        component: ListUser,
        meta: {
            title: 'Les utilisateurs',
            guard: 'auth',
        },
    },
    {
        path: '/info-utlisateur/:id',
        name: 'user-detail',
        component: ShowUser,
        meta: {
            title: 'Info utilisateur',
            guard: 'auth',
        },
    },
    {
        path: '/entreprises',
        name: 'entreprises',
        component: ListEntreprise,
        meta: {
            title: 'Liste des entreprises',
            guard: 'auth',
        },
        beforeEnter: [isAutorized],
    },
    {
        path: '/entreprises/:id',
        name: 'show-entreprise',
        component: ShowEntreprise,
        meta: {
            title: 'Info entreprise',
            guard: 'auth',
        },
        beforeEnter: [isAutorized],
    },
    {
        path: '/mon-entreprise',
        name: 'mon-entreprise',
        component: ShowEntreprise,
        meta: {
            title: 'Mon entreprise',
            guard: 'auth',
        },
    },
    {
        path: '/invitations',
        name: 'invitations',
        component: ListInvit,
        meta: {
            title: 'Les invitations',
            guard: 'auth',
        },
        beforeEnter: [isAutorized],
    },
    {
        path: '/invitations/:id',
        name: 'show-invitation',
        component: ShowInvit,
        meta: {
            title: 'Detail invitation',
            guard: 'auth',
        },
        beforeEnter: [isAutorized],
    },
    {
        path: '/creer-votre-compte/:token',
        name: 'add-employe',
        component: AddEmploye,
        meta: {
            title: 'Creation de compte',
            guard: 'guest',
        },
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: {
            title: 'Forget Password',
            guard: 'guest',
        },
    },
    {
        path: '/password-reset/:token',
        name: 'password-reset',
        component: ResetPassword,
        query: {
            email: 'email',
        },
        meta: {
            title: 'Reset Password',
            guard: 'guest',
        },
    },
    {
        path: '/verify-email',
        name: 'verify-email',
        component: VerifyEmail,
        query: {
            resend: 'resend',
        },
        meta: {
            title: 'Email Verification',
            guard: 'auth',
        },
    },
    {
        path: '/page-not-found',
        name: 'page-not-found',
        component: PageNotFound,
        meta: {
            title: 'Page Not Found',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/page-not-found',
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Navigation guard
function isAutorized(to, from, next) {
    const store = useUsers()
    const auth = store.authUser
    if (auth && store.userData.type !== 'admin') {
        next({ name: 'dashboard' })
    }else next()
}

router.beforeEach((to, from, next) => {
    const store = useUsers()

    const auth = store.authUser    

    if (to.matched.some(route => route.meta.guard === 'guest') && auth)
        next({ name: 'dashboard' })
    else if (to.matched.some(route => route.meta.guard === 'auth') && !auth)
        next({ name: 'login' })
    else next()
    
})

// Page Title and Metadata

router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.title)

    const nearestWithMeta = to.matched
        .slice()
        .reverse()
        .find(r => r.meta && r.meta.metaTags)

    if (nearestWithTitle) {
        document.title = nearestWithTitle.meta.title + ' - ' + APP_NAME
    } else {
        document.title = APP_NAME
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(
        el => el.parentNode.removeChild(el),
    )

    if (!nearestWithMeta) return next()

    nearestWithMeta.meta.metaTags
        .map(tagDef => {
            const tag = document.createElement('meta')

            Object.keys(tagDef).forEach(key => {
                tag.setAttribute(key, tagDef[key])
            })

            tag.setAttribute('data-vue-router-controlled', '')

            return tag
        })

        .forEach(tag => document.head.appendChild(tag))

    next()
})

export default router
