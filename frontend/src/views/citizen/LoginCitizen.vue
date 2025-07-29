<template>
    <div class="auth-container">
        <h2>Connexion Citoyen</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
        </form>
        <p>Pas encore de compte ? <router-link to="/citizen/register">Inscrivez-vous ici</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth.store'; // Assurez-vous que ce chemin est correct

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/citizen/login', {
            email: email.value,
            password: password.value,
        });
        console.log('Connexion réussie:', response.data);
        
        // Sauvegarder le token et les infos utilisateur dans le store Pinia
        authStore.setToken(response.data.token);
        authStore.setUser(response.data.user);

        // Rediriger vers le tableau de bord citoyen
        router.push('/citizen/dashboard');
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.response ? error.response.data : error.message);
        alert('Erreur lors de la connexion: ' + (error.response ? error.response.data.message : error.message));
    }
};
</script>

<style scoped>
.auth-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.auth-container h2 {
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.btn-primary {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-primary:hover {
    background-color: #0056b3;
}

p {
    margin-top: 20px;
    color: #666;
}

p a {
    color: #007bff;
    text-decoration: none;
}

p a:hover {
    text-decoration: underline;
}
</style>
