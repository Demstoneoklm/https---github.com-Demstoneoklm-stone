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
        // You can redirect to an access denied page or the dashboard
        return '/admin'; // Or another appropriate page
    }
});

export default router;
