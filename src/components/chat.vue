<template>
    <div class="chat-wrapper">
      <!-- Messaggi -->
      <div class="chat-messages" ref="messagesContainer">
        <div
          v-for="(msg, index) in messaggi"
          :key="index"
          :class="['msg', msg.tipo === 'user' ? 'user' : 'bot']"
        >
          {{ msg.testo }}
        </div>
      </div>
  
      <!-- Campo input -->
      <div class="chat-input">
        <input
          type="text"
          v-model="testo"
          placeholder="Scrivi un messaggio..."
          @keydown.enter="invia"
        />
        <button @click="invia">Invia</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick } from 'vue'
  
  const testo = ref('')
  const messaggi = ref([
    { testo: 'Ciao! Come posso aiutarti?', tipo: 'bot' }
  ])
  
  const messagesContainer = ref(null)
  
  function invia() {
    const msg = testo.value.trim()
    if (!msg) return
  
    // Aggiungi il messaggio dell'utente
    messaggi.value.push({ testo: msg, tipo: 'user' })
  
    // Svuota l'input
    testo.value = ''
  
    // Scrolla in basso
    nextTick(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    })
  
    // Simula una risposta del bot dopo 500ms
    setTimeout(() => {
      messaggi.value.push({
        testo: 'Grazie per il tuo messaggio!',
        tipo: 'bot'
      })
      nextTick(() => {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      })
    }, 500)
  }
  </script>
  
  <style scoped>
  .chat-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fdf4ee;
  }
  
  .chat-messages {
    flex-grow: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .msg {
    padding: 0.6rem 1rem;
    border-radius: 16px;
    max-width: 80%;
    font-size: 0.9rem;
    line-height: 1.4;
    word-wrap: break-word;
  }
  
  .user {
    align-self: flex-end;
    background-color: var(--secondary);
    color: white;
  }
  
  .bot {
    align-self: flex-start;
    background-color: white;
    border: 1px solid #e2d6cc;
    color: var(--primary);
  }
  
  .chat-input {
    display: flex;
    border-top: 1px solid #e2d6cc;
    padding: 0.75rem;
    gap: 0.5rem;
    background-color: #fdf4ee;
  }
  
  .chat-input input {
    flex: 1;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    border: 1px solid var(--primary);
    outline: none;
    font-size: 0.9rem;
    background-color: transparent;
    color: var(--primary);
  }
  
  .chat-input button {
    background-color: var(--primary);
    color: white;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    font-size: 0.85rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .chat-input button:hover {
    background-color: var(--secondary);
  }
  </style>
  