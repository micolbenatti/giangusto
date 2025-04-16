<template>
  <div class="home">
    <div class="contenuto">
      <h1 class="titolo">
        Ciao, come posso aiutarti?
      </h1>

      <div class="form">
        <input
          type="text"
          placeholder="Scrivi qui"
          v-model="messaggio"
          class="campo"
        />
        <button class="bottone" @click="inviaMessaggio">Invia</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const messaggio = ref('')
const emit = defineEmits(['apri-chat'])

function inviaMessaggio() {
  if (!messaggio.value.trim()) return
  emit('apri-chat') 
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 15rem); /* altezza piena meno header(5rem) e footer(10rem) */
  padding: 3rem 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contenuto {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
}

.titolo {
  font-size: 1.7rem;
  font-weight: 700;
  text-transform: uppercase;
}

.form {
  display: flex;
  border: 1px solid var(--primary);
  border-radius: 100px;
  overflow: hidden;
  width: 100%;
  max-width: 320px;
}

.form:hover {
  border: 1px solid var(--secondary);
}

.campo {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  background-color: transparent;
  color: #2c1b13;
  font-size: 0.875rem;
}

.bottone {
  background-color: var(--primary);
  color: white;
  font-weight: 600;
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  border: none;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.bottone:hover {
  background-color: var(--secondary);
}

@media (max-width: 639px) {
  .home {
    padding: 2rem 1rem;
  }
  .titolo {
    font-size: 1.3rem;
    line-height: 1.9rem;
  }

  .bottone {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }

  .campo {
    font-size: 0.8rem;
  }
}
</style>
