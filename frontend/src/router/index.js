import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Import des vues
import AuthPage from '../views/auth/AuthPage.vue'; // Nouvelle page d'authentification
import AdminDashboard from '../views/admin/Dashboard.vue';
import Users from '../views/admin/Users.vue';
import Documents from '../views/admin/Documents.vue';
import Inventory from '../views/admin/Inventory.vue';
import LeaveManagement from '../views/admin/LeaveManagement.vue'; // Nouvelle importation
import AddEmployee from '../views/admin/AddEmployee.vue';
import UserDashboard from '../views/user/UserDashboard.vue';
import Profile from '../views/user/Profile.vue';
import Requests from '../views/user/Requests.vue';
import Layout from '../components/layout/Layout.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: AuthPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: AuthPage, // Utilise la même page pour l'inscription
  },
  {
    path: '/admin',
    component: Layout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
      },
      {
        path: 'documents',
        name: 'Documents',
        component: Documents,
      },
      {
        path: 'inventory',
        name: 'Inventory',
        component: Inventory,
      },
      {
        path: 'leave',
        name: 'LeaveManagement',
        component: LeaveManagement,
      },
      {
        path: 'add-employee',
        name: 'AddEmployee',
        component: AddEmployee,
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'UserDashboard',
        component: UserDashboard,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
      },
      {
        path: 'requests',
        name: 'Requests',
        component: Requests,
      },
    ],
  },
  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Tente de charger l'utilisateur depuis le localStorage si non déjà chargé
  if (!authStore.user && authStore.token) {
    await authStore.fetchUser();
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (requiresAdmin && authStore.user?.role !== 'admin') {
    next('/user/dashboard'); // Rediriger les non-admins vers leur dashboard
  } else {
    next();
  }
});

export default router;