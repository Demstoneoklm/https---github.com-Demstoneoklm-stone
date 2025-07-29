import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Layout from '@/components/layout/Layout.vue'; // Import the Layout component

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Auth.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: Layout, // Use the Layout for all admin routes
            meta: { requiresAuth: true, isAdmin: true },
            children: [
                {
                    path: '', // Default route for /admin
                    name: 'admin-dashboard',
                    component: () => import('../views/admin/Dashboard.vue'),
                },
                {
                    path: 'users',
                    name: 'admin-users',
                    component: () => import('../views/admin/Users.vue'),
                },
                {
                    path: 'inventory',
                    name: 'admin-inventory',
                    component: () => import('../views/admin/Inventory.vue'),
                },
                {
                    path: 'leave',
                    name: 'admin-leave',
                    component: () => import('../views/admin/LeaveManagement.vue'),
                },
                {
                    path: 'documents',
                    name: 'admin-documents',
                    component: () => import('../views/admin/Documents.vue'),
                },
                {
                    path: 'add-employee',
                    name: 'admin-add-employee',
                    component: () => import('../views/admin/AddEmployee.vue'),
                },
                {
                    path: 'documents/new',
                    name: 'admin-documents-new',
                    component: () => import('../views/admin/DocumentsNew.vue'),
                },
                // Add other admin routes here
            ],
        },
        {
            path: '/user-dashboard',
            name: 'user-dashboard',
            component: () => import('../views/UserDashboardView.vue'),
            meta: { requiresAuth: true, isUser: true }, // Nouvelle méta pour les utilisateurs standards
        },
        // Fallback route for 404
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('../views/NotFound.vue'), // Ensure you have a NotFound.vue component
        },
    ]
});

// Protection middleware
router.beforeEach((to) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.token) {
        return '/login';
    }
    // Redirect non-admins if the route requires isAdmin
    if (to.meta.isAdmin && auth.user?.role !== 'admin') {
        // Si l'utilisateur n'est pas admin et essaie d'accéder à une page admin, rediriger vers le tableau de bord utilisateur
        return '/user-dashboard'; 
    }
    // Redirect non-users if the route requires isUser (and not admin)
    if (to.meta.isUser && auth.user?.role === 'admin') {
        // Si l'utilisateur est admin et essaie d'accéder à une page utilisateur, rediriger vers le tableau de bord admin
        return '/admin';
    }
});

export default router;