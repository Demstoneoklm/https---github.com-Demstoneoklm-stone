<template>
  <!-- Le template reste identique à votre version originale -->
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  department: '',
  role: '',
  acceptedTerms: false
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordStrength = reactive({
  width: 0,
  color: '#e74c3c'
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const checkPasswordStrength = () => {
  const password = form.password;
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  const width = strength * 25;
  let color = '#e74c3c';

  if (strength >= 3) color = '#f39c12';
  if (strength >= 5) color = '#27ae60';

  passwordStrength.width = width;
  passwordStrength.color = color;
};

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }

  if (
    form.password.length < 8 ||
    !/[A-Z]/.test(form.password) ||
    !/[0-9]/.test(form.password)
  ) {
    alert('Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre');
    return;
  }

  try {
    await authStore.register(form);
    router.push('/login');
  } catch (error) {
    console.error('Registration error:', error);
    alert("Erreur lors de l'inscription. Veuillez réessayer.");
  }
};

defineEmits(['switch-to-login']);
</script>

<style scoped>
/* Vos styles CSS existants */
</style>
