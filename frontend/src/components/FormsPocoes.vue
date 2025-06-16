<!-- src/components/FormsPocoes.vue -->
<template>
  <v-dialog v-model="visible" max-width="600px" persistent>
    <v-card class="form-card pa-4">
      <!-- Título -->
      <v-card-title class="form-title">
        {{ isEdit ? '✏️ Editar Poção' : '✨ Criar Nova Poção' }}
      </v-card-title>

      <!-- Campos do Formulário -->
      <v-card-text>
        <v-row dense>
          <!-- Nome -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.nome"
              label="Nome da Poção"
              outlined
              dense
              color="orange"
            />
          </v-col>

          <!-- Preço -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model.number="form.preco"
              label="Preço (moedas)"
              type="number"
              outlined
              dense
              color="orange"
            />
          </v-col>

          <!-- Cor -->
          <v-col cols="12" md="6">
            <v-select
              v-model="form.cor"
              :items="cores"
              label="Cor da Poção"
              outlined
              dense
              color="orange"
            />
          </v-col>

          <!-- Frasco -->
          <v-col cols="12" md="6">
            <v-select
              v-model="form.frasco"
              :items="frascos"
              label="Formato do Frasco"
              outlined
              dense
              color="orange"
            />
          </v-col>

          <!-- Descrição -->
          <v-col cols="12">
            <v-textarea
              v-model="form.descricao"
              label="Descrição Mágica"
              outlined
              rows="3"
              color="orange"
            />
          </v-col>

          <!-- Efeitos Mágicos -->
          <v-col cols="12">
            <v-text-field
              v-model="newEffect"
              label="Adicionar Efeito Mágico"
              outlined
              dense
              color="orange"
              append-icon="mdi-plus"
              @click:append="addEffect"
            />
            <v-chip-group column>
              <v-chip
                v-for="(ef, idx) in form.efeitos"
                :key="idx"
                class="ma-1"
                outlined
                color="orange"
                closable
                close-icon="mdi-close"
                @click:close="removeEffect(idx)"
              >
                {{ ef }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Ações -->
      <v-card-actions class="justify-end">
        <v-btn class="cancel-btn mr-2" text @click="visible = false">
          Cancelar
        </v-btn>
        <v-btn class="submit-btn" @click="onSubmit">
          {{ isEdit ? 'Salvar Alterações' : 'Criar Poção' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import api from '@/services/api.js'

const props = defineProps({
  modelValue: Boolean,
  initial: Object
})
const emit = defineEmits(['update:modelValue', 'saved'])

const visible = ref(false)
watch(() => props.modelValue, v => (visible.value = v))
watch(visible, v => emit('update:modelValue', v))

// opções de enums
const cores = ['Verde','Azul','Roxa','Vermelha','Dourada','Transparente']
const frascos = ['Redondo','Triangular','Espiralado','Quadrado','Piramidal']

// estado do formulário
const form = ref({
  nome: '',
  preco: 0,
  cor: 'Verde',
  frasco: 'Redondo',
  descricao: '',
  efeitos: []
})
const newEffect = ref('')

const isEdit = computed(() => !!props.initial && !!props.initial.id)

// popula ou reseta o form quando inicial muda
watch(() => props.initial, (val) => {
  if (val) {
    form.value = { ...val, efeitos: val.efeitos || [] }
  } else {
    form.value = { nome:'', preco:0, cor:'Verde', frasco:'Redondo', descricao:'', efeitos: [] }
  }
})

// adiciona um efeito ao array
function addEffect() {
  const ef = newEffect.value && newEffect.value.trim()
  if (ef && !form.value.efeitos.includes(ef)) {
    form.value.efeitos.push(ef)
    newEffect.value = ''
  }
}

// remove efeito pelo índice
function removeEffect(idx) {
  form.value.efeitos.splice(idx, 1)
}

// submete ao backend e emite evento de sucesso
async function onSubmit() {
  try {
    if (isEdit.value) {
      await api.put(`/pocoes/${form.value.id}`, form.value)
    } else {
      await api.post('/pocoes', form.value)
    }
    emit('saved')
    visible.value = false
  } catch (err) {
    console.error('Erro ao salvar poção:', err)
  }
}
</script>

<style scoped>
.form-card {
  background: linear-gradient(180deg, #4b2c12 0%, #1e1e1e 100%);
  border: 1px solid #ff9500 !important;
  border-radius: 0.5rem !important;
  color: #f7ddb0 !important;
}

/* Título */
.form-title {
  color: #f7ddb0 !important;
  font-weight: bold;
  font-size: 1.25rem;
  justify-content: center;
}

/* Botões */
.cancel-btn {
  color: #ff9500 !important;
  text-transform: none !important;
}
.submit-btn {
  background: linear-gradient(90deg, #832ebb, #ec008c) !important;
  color: #fff !important;
  text-transform: none !important;
  border-radius: 9999px !important;
  padding: 0.5rem 1.25rem !important;
}

/* Estilo dos chips de efeitos */
.v-chip {
  font-size: 0.875rem;
}
</style>
