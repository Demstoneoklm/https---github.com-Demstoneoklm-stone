<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '@/interfaces/User.interface';

const form = ref({
  email: '',
  password: ''
});

const emit = defineEmits<{
  (e: 'submit', payload: { email: string; password: string }): void;
}>();

const onSubmit = () => {
  emit('submit', form.value);
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <input 
      v-model="form.email" 
      type="email" 
      placeholder="Email" 
      class="input input-bordered w-full"
      required
    >
    <input
      v-model="form.password"
      type="password"
      placeholder="Mot de passe"
      class="input input-bordered w-full"
      required
    >
    <button type="submit" class="btn btn-primary w-full">
      Connexion
    </button>
  </form>
</template>