<template>
    <div class="auth-container">
        <h2>Inscription Citoyen</h2>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="firstName">Prénom:</label>
                <input type="text" id="firstName" v-model="firstName" required>
            </div>
            <div class="form-group">
                <label for="lastName">Nom:</label>
                <input type="text" id="lastName" v-model="lastName" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary">S'inscrire</button>
        </form>
        <p>Déjà un compte ? <router-link to="/citizen/login">Connectez-vous ici</router-link></p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/citizen/register', {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
        });
        console.log('Inscription réussie:', response.data);
        // Rediriger vers la page de connexion ou le tableau de bord
        router.push('/citizen/login');
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error.response ? error.response.data : error.message);
        alert('Erreur lors de l\'inscription: ' + (error.response ? error.response.data.message : error.message));
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

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.form-group.checkbox-group {
    display: flex;
    align-items: center;
    margin-top: 15px;
}

.form-group.checkbox-group input[type="checkbox"] {
    width: auto;
    margin-right: 10px;
}

.form-group.checkbox-group label {
    margin-bottom: 0;
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