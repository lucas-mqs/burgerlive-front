import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import OrderView from '../views/OrderView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import { useAuthStore } from '../stores/auth.store';
import HomeView from "../views/HomeView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: LoginView },
        { path: '/home', component: HomeView, meta: { requiresAuth: true } },
        { path: '/login', component: LoginView },
        {
            path: '/order',
            component: OrderView,
            meta: { requiresAuth: true }
        },
        {
            path: '/checkout',
            component: CheckoutView,
            meta: { requiresAuth: true }
        },
    ],
});

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login');
    }
    else if (to.path === '/' && authStore.isAuthenticated) {
        next('/home');
    }
    else {
        next();
    }
});

export default router;