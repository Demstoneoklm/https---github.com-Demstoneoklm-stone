<template>
  <div class="auth-container">
    <div class="auth-illustration" v-if="!isMobile">
      <img src="@/assets/admin-illustration.png" alt="Administration Illustration">
      <h2>Système de Gestion Administrative</h2>
      <p>Une plateforme complète pour gérer efficacement votre administration et vos équipes.</p>
    </div>

    <div class="auth-form-container">
      <div class="auth-tabs">
        <div 
          class="auth-tab" 
          :class="{ active: activeTab === 'login' }" 
          @click="switchTab('login')"
        >
          Connexion
        </div>
        <div 
          class="auth-tab" 
          :class="{ active: activeTab === 'register' }" 
          @click="switchTab('register')"
        >
          Inscription
        </div>
      </div>

      <LoginForm 
        v-show="activeTab === 'login'" 
        @switch-to-register="switchTab('register')"
      />
      
      <RegisterForm 
        v-show="activeTab === 'register'" 
        @switch-to-login="switchTab('login')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

const activeTab = ref<'login' | 'register'>('login');
const isMobile = ref(false);

const switchTab = (tab: 'login' | 'register') => {
  activeTab.value = tab;
};

onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth <= 768;
  });
});
</script>

<style scoped>
/* Styles identiques à votre CSS original */
.auth-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.auth-illustration {
  flex: 1;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.auth-illustration img {
  max-width: 80%;
  margin-bottom: 30px;
}

.auth-illustration h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  font-weight: 500;
}

.auth-illustration p {
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.6;
}

.auth-form-container {
  flex: 1;
  padding: 60px 40px;
  position: relative;
}

.auth-tabs {
  display: flex;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.auth-tab {
  padding: 12px 25px;
  cursor: pointer;
  font-weight: 500;
  color: #7f8c8d;
  position: relative;
  transition: all 0.3s;
}

.auth-tab.active {
  color: #3498db;
}

.auth-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #3498db;
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
  }

  .auth-illustration {
    display: none;
  }

  .auth-form-container {
    padding: 40px 20px;
  }
}
</style>