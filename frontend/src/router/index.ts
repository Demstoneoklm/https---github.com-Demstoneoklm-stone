import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth'; // ✅ Utilisation de .js si le fichier est JS

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // ✅ Utilisation correcte du BASE_URL
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Auth.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: { requiresAuth: true } // ✅ Exemple avec protection
        }
        // 🔧 Ajoute d'autres routes ici
    ]
});

// ✅ Middleware de protection
router.beforeEach((to) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.token) {
        return '/login';
    }
});

export default router;