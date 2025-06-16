<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const loginWithGoogle = async () => {
  try {
    await userStore.login()
    router.push('/dashboard')
  } catch (err) {
    console.error('Erro ao logar:', err)
  }
}
</script>

<template>
  <div>
    <div class="login-header text-center mb-8">
        <h1>🧙‍♂️ Magic Potion Store</h1>
        <p>"Onde cada gota é uma gota de magia"</p>
  </div>
  </div>
  <div class="login-container">
    <div class="login-card">
      <h1>Bem-vindo</h1>
      <p>Faça login para acessar o dashboard</p>
      <button class="google-button" @click="loginWithGoogle">
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
        Entrar com Google
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(180deg, #06294b 0%, #000000 100%);
}

.login-card {
  background-color: rgb(255, 255, 255);
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  width: 320px;
}

.login-card h1 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #111827;
}

.login-card p {
  margin-bottom: 1.5rem;
  color: #2b354a;
}

.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #39006e;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.google-button img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.google-button:hover {
  background-color: #8d2ce2;
}

.simulated-login {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.login{
    background: linear-gradient(180deg, #06294b 0%, #000000 100%);
  min-height: 100vh;
}

.login-header h1 {
  color: #000000;
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #000000;
  font-style: italic;
  margin-bottom: 1rem;
}
</style>