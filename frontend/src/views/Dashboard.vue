<template>
  <div class="dashboard">
    <v-container fluid class="py-12">
      <!-- cabeçalho -->
      <div class="dashboard-header text-center mb-8">
        <h1>🧙‍♂️ Loja Mágica de Poções</h1>
        <p>"Onde cada gota é uma gota de magia"</p>
        <v-btn class="create-btn" @click="openForm()">
          <v-icon left>mdi-plus</v-icon>
          ✨ Criar Nova Poção
        </v-btn>
      </div>

      <!-- lista de poções -->
      <v-row dense>
        <v-col
          v-for="p in pocoes"
          :key="p.id"
          cols="12"
          md="4"
        >
          <v-card class="potion-card pa-4" elevation="4">
            <v-card-title class="d-flex align-center">
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

    <!-- modal de criação/edição -->
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
import FormsPocoes from '@/components/FormsPocoes.vue' // ← import do componente

const pocoes   = ref([])
const showForm = ref(false)
const current  = ref(null)

async function fetchPocoes() {
  try {
    const { data } = await api.get('/pocoes')
    pocoes.value = data
  } catch (err) {
    console.error('Erro ao carregar poções:', err)
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
  background: linear-gradient(180deg, #4b2c12 0%, #1e1e1e 100%);
  min-height: 100vh;
}

.dashboard-header h1 {
  color: #f7ddb0;
  font-size: 3rem;
  margin-bottom: 0.5rem;
}
.dashboard-header p {
  color: #f8d77e;
  font-style: italic;
  margin-bottom: 1rem;
}

.create-btn {
  background: linear-gradient(90deg, #832ebb, #ec008c);
  color: #fff !important;
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  text-transform: none !important;
}

.potion-card {
  background: #1e1e1e !important;
  border: 1px solid #ff9500 !important;
  border-radius: 0.5rem !important;
}

.potion-card .v-card-title {
  color: #f7ddb0 !important;
  font-weight: bold;
}

.price-chip {
  background-color: #ff9500 !important;
  color: #fff !important;
}
</style>
