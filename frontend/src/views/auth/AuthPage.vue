<template>
  <div class="auth-container">
    <div class="auth-illustration">
      <img src="https://cdn-icons-png.flaticon.com/512/3142/3142027.png" alt="Administration Illustration">
      <h2>Système de Gestion Administrative</h2>
      <p>Une plateforme complète pour gérer efficacement votre administration et vos équipes.</p>
    </div>

    <div class="auth-form-container">
      <div class="auth-tabs">
        <div class="auth-tab" :class="{ 'active': activeTab === 'login' }" @click="activeTab = 'login'" data-tab="login">Connexion</div>
        <div class="auth-tab" :class="{ 'active': activeTab === 'register' }" @click="activeTab = 'register'" data-tab="register">Inscription</div>
      </div>

      <!-- Formulaire de connexion -->
      <div id="login" class="auth-content" :class="{ 'active': activeTab === 'login' }">
        <div class="auth-header">
          <h2>Connectez-vous</h2>
          <p>Entrez vos identifiants pour accéder à votre espace administratif</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="login-email">Email</label>
            <input type="email" id="login-email" class="form-control" placeholder="votre @email.com" v-model="loginForm.email" required>
          </div>

          <div class="form-group">
            <label for="login-password">Mot de passe</label>
            <div class="input-with-icon">
              <input :type="loginPasswordType" id="login-password" class="form-control" placeholder="Votre mot de passe" v-model="loginForm.password" required>
              <span class="material-icons" @click="toggleLoginPasswordVisibility">{{ loginPasswordType === 'password' ? 'visibility_off' : 'visibility' }}</span>
            </div>
            <div class="auth-footer">
              <a href="#" @click.prevent="forgotPassword">Mot de passe oublié ?</a>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Se connecter</button>

          <div class="auth-divider">ou</div>

          <button type="button" class="btn btn-google">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png" alt="Google" width="20">
            Se connecter avec Google
          </button>
        </form>

        <div class="auth-footer">
          Vous n'avez pas de compte ? <a href="#" @click.prevent="activeTab = 'register'">S'inscrire</a>
        </div>
      </div>

      <!-- Formulaire d'inscription -->
      <div id="register" class="auth-content" :class="{ 'active': activeTab === 'register' }">
        <div class="auth-header">
          <h2>Créez un compte</h2>
          <p>Remplissez le formulaire pour créer un compte administrateur</p>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="form-row" style="display: flex; gap: 15px;">
            <div class="form-group" style="flex: 1;">
              <label for="register-firstname">Prénom</label>
              <input type="text" id="register-firstname" class="form-control" placeholder="Votre prénom" v-model="registerForm.firstName" required>
            </div>
            <div class="form-group" style="flex: 1;">
              <label for="register-lastname">Nom</label>
              <input type="text" id="register-lastname" class="form-control" placeholder="Votre nom" v-model="registerForm.lastName" required>
            </div>
          </div>

          <div class="form-group">
            <label for="register-email">Email professionnel</label>
            <input type="email" id="register-email" class="form-control" placeholder="votre @email.com" v-model="registerForm.email" required>
          </div>

          <div class="form-group">
            <label for="register-password">Mot de passe</label>
            <div class="input-with-icon">
              <input :type="registerPasswordType" id="register-password" class="form-control" placeholder="Créez un mot de passe" v-model="registerForm.password" @input="checkPasswordStrength" required>
              <span class="material-icons" @click="toggleRegisterPasswordVisibility">{{ registerPasswordType === 'password' ? 'visibility_off' : 'visibility' }}</span>
            </div>
            <div class="password-strength">
              <div class="password-strength-bar" :style="{ width: passwordStrengthWidth, backgroundColor: passwordStrengthColor }"></div>
            </div>
            <small style="color: #7f8c8d; display: block; margin-top: 5px;">
              Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.
            </small>
          </div>

          <div class="form-group">
            <label for="register-confirm-password">Confirmez le mot de passe</label>
            <div class="input-with-icon">
              <input :type="confirmPasswordType" id="register-confirm-password" class="form-control" placeholder="Confirmez votre mot de passe" v-model="registerForm.confirmPassword" required>
              <span class="material-icons" @click="toggleConfirmPasswordVisibility">{{ confirmPasswordType === 'password' ? 'visibility_off' : 'visibility' }}</span>
            </div>
          </div>

          

          <!-- Suppression du champ Rôle -->

          <div class="form-group" style="margin-top: 20px;">
            <input type="checkbox" id="register-terms" v-model="registerForm.termsAccepted" required>
            <label for="register-terms" style="display: inline; font-weight: normal;">
              J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de
                confidentialité</a>
            </label>
          </div>

          <button type="submit" class="btn btn-primary">S'inscrire</button>
        </form>

        <div class="auth-footer">
          Vous avez déjà un compte ? <a href="#" @click.prevent="activeTab = 'login'">Se connecter</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const activeTab = ref('login'); // 'login' or 'register'
const authStore = useAuthStore();
const router = useRouter();

// Form data for login
const loginForm = ref({
  email: '',
  password: '',
});

// Form data for registration
const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  department: '',
  // role: '', // Suppression du champ rôle
  termsAccepted: false,
});

// Password visibility toggles
const loginPasswordType = ref('password');
const registerPasswordType = ref('password');
const confirmPasswordType = ref('password');

const toggleLoginPasswordVisibility = () => {
  loginPasswordType.value = loginPasswordType.value === 'password' ? 'text' : 'password';
};
const toggleRegisterPasswordVisibility = () => {
  registerPasswordType.value = registerPasswordType.value === 'password' ? 'text' : 'password';
};
const toggleConfirmPasswordVisibility = () => {
  confirmPasswordType.value = confirmPasswordType.value === 'password' ? 'text' : 'password';
};

// Password strength
const passwordStrength = ref(0);
const passwordStrengthWidth = computed(() => `${passwordStrength.value * 20}%`);
const passwordStrengthColor = computed(() => {
  if (passwordStrength.value <= 1) return '#e74c3c'; // Red
  if (passwordStrength.value <= 3) return '#f39c12'; // Orange
  return '#27ae60'; // Green
});

const checkPasswordStrength = () => {
  const password = registerForm.value.password;
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  passwordStrength.value = strength;
};

// Form submission handlers
const handleLogin = async () => {
  console.log('handleLogin function triggered.');
  try {
    await authStore.login(loginForm.value.email, loginForm.value.password);
    console.log('AuthPage: User after login:', authStore.user);
    console.log('AuthPage: isAuthenticated after login:', authStore.isAuthenticated);
    // Rediriger en fonction du rôle de l'utilisateur
    if (authStore.user && authStore.user.role === 'admin') {
      router.push('/admin/dashboard');
    } else if (authStore.user) {
      router.push('/user/dashboard');
    } else {
      // Fallback si le rôle n'est pas défini (ne devrait pas arriver)
      router.push('/');
    }
  } catch (error) {
    alert(error.message || 'Échec de la connexion');
  }
};

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }
  if (!registerForm.value.termsAccepted) {
    alert("Veuillez accepter les conditions d'utilisation.");
    return;
  }

  try {
    await authStore.register(
      registerForm.value.firstName,
      registerForm.value.lastName,
      registerForm.value.email,
      registerForm.value.password
    );
    alert('Inscription réussie ! Veuillez vérifier votre email pour activer votre compte.');
    activeTab.value = 'login'; // Switch to login tab after successful registration
  } catch (error) {
    alert(error.message || 'Échec de l\'inscription');
  }
};

const forgotPassword = () => {
  alert('Fonctionnalité de mot de passe oublié non implémentée.');
  // Ici, vous intégreriez la logique pour la réinitialisation du mot de passe
};
</script>

<style scoped>
/* Reset et styles de base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f5f5f5;
    color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Conteneur principal */
.auth-container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

/* Partie illustration */
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

/* Partie formulaire */
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

.auth-content {
    display: none;
}

.auth-content.active {
    display: block;
}

.auth-header {
    margin-bottom: 30px;
}

.auth-header h2 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin-bottom: 10px;
}

.auth-header p {
    color: #7f8c8d;
    font-size: 0.95rem;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #2c3e50;
    font-size: 0.95rem;
}

.form-control {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
    transition: all 0.3s;
}

.form-control:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.input-with-icon {
    position: relative;
}

.input-with-icon .material-icons {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #7f8c8d;
    cursor: pointer;
}

.btn {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 10px;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
}

.btn-google {
    background-color: white;
    color: #2c3e50;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btn-google:hover {
    background-color: #f9f9f9;
}

.auth-divider {
    display: flex;
    align-items: center;
    margin: 20px 0;
    color: #7f8c8d;
    font-size: 0.9rem;
}

.auth-divider::before,
.auth-divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #eee;
}

.auth-divider::before {
    margin-right: 15px;
}

.auth-divider::after {
    margin-left: 15px;
}

.auth-footer {
    margin-top: 30px;
    text-align: center;
    font-size: 0.9rem;
    color: #7f8c8d;
}

.auth-footer a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
}

.auth-footer a:hover {
    text-decoration: underline;
}

.password-strength {
    margin-top: 5px;
    height: 4px;
    background-color: #eee;
    border-radius: 2px;
    overflow: hidden;
}

.password-strength-bar {
    height: 100%;
    width: 0%;
    background-color: #e74c3c;
    transition: width 0.3s, background-color 0.3s;
}

/* Responsive */
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