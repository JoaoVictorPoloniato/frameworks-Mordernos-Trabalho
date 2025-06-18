<template>
  <div class="dashboard">
    <v-container fluid class="py-12">
      <!-- cabeçalho -->
      <div class="dashboard-header text-center mb-8">
        <h1>🧙‍♂️ Magic Potion Store</h1>
        <p>"Onde cada gota é uma gota de magia"</p>
        <v-btn class="create-btn" @click="openForm()">
          <v-icon left>mdi-plus</v-icon>
          ✨ Criar Nova Poção
        </v-btn>
        
        <v-btn class="exit-btn" @click="logout">
          <v-icon left>mdi-exit-run</v-icon>
            Sair
        </v-btn>
      </div>

      <v-row dense>
        <v-col
          v-for="p in pocoes"
          :key="p.id"
          cols="12"
          md="4"
        >
          <v-card class="potion-card pa-4" elevation="4">
            <v-card-title class="d-flex">
              <v-icon left>mdi-flask</v-icon>{{ p.nome }}
            </v-card-title>
            <v-chip small class="price-chip">{{ p.preco }} moedas</v-chip>
            <v-card-text class="mt-2">
              {{ p.descricao }}
            </v-card-text>
            <v-card-actions class="justify-space-between mt-4">
              <v-btn small color="blue lighten-2" @click="openForm(p)">
                <v-icon left>mdi-pencil</v-icon>
                Modificar
              </v-btn>
              <v-btn small color="red darken-1" @click="remove(p.id)">
                <v-icon left>mdi-fire</v-icon>
                Destruir
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <FormsPocoes
      v-model="showForm"
      :initial="current"
      @saved="fetchPocoes"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api.js'
import FormsPocoes from '@/components/FormsPocoes.vue'
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from 'vue-router'

const pocoes   = ref([])
const showForm = ref(false)
const current  = ref(null)
const auth = getAuth()
const router = useRouter()

async function fetchPocoes() {
  try {
    const { data } = await api.get('/pocoes')
    pocoes.value = data
  } catch (err) {
    console.error('Erro ao carregar poções:', err)
  }
}
async function logout() {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error("Erro ao sair:", error)
  }
}

function openForm(p = null) {
  current.value = p ? { ...p } : null
  showForm.value = true
}

async function remove(id) {
  if (!confirm('Deseja mesmo destruir esta poção?')) return
  try {
    await api.delete(`/pocoes/${id}`)
    fetchPocoes()
  } catch (err) {
    console.error('Erro ao deletar poção:', err)
  }
}

onMounted(fetchPocoes)
</script>

<style scoped>

.dashboard {
  background: linear-gradient(180deg, #06294b 0%, #000000 100%);
  min-height: 100vh;
}

.dashboard-header h1 {
  color: #ffffff;
  font-size: 3rem;
  margin-bottom: 0.5rem;
}
.dashboard-header p {
  color: #e9c76a;
  font-style: italic;
  margin-bottom: 1rem;
}
.exit-btn{
  background: linear-gradient(90deg, #bb2e2e, #d11414);
  color: #fff !important;
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  text-transform: none !important;
}

.create-btn {
  background: linear-gradient(90deg, #832ebb, #cf0c81);
  color: #fff !important;
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  text-transform: none !important;
}

.potion-card {
  background: linear-gradient(180deg, #4b2c12 0%, #1e1e1e 100%);
  border: 1px solid #ff9500 !important;
  border-radius: 0.5rem !important;
  color: #f7ddb0 !important;
}

.potion-card .v-card-title {
  color: #f7ddb0 !important;
  font-weight: bold;
}

.price-chip {
  background-color: #ff9500 !important;
  color: #fff !important;
  font-weight: bold;  
}
</style>
