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

      <div v-if="loading" class="msg bot italic text-sm text-gray-500">
        Sta scrivendo...
      </div>
    </div>

    <!-- Campo input -->
    <div class="chat-input">
      <input
        type="text"
        v-model="input"
        placeholder="Scrivi un messaggio..."
        @keydown.enter="inviaMessaggio"
        :disabled="loading"
      />
      <button 
        @click="inviaMessaggio" 
        :disabled="loading || !input.trim()"
      >
        {{ loading ? '...' : 'Invia' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const messaggi = ref([])
  onMounted(() => {
    messaggi.value.push({
      testo: 'Ciao! Come posso aiutarti oggi?',
      tipo: 'bot'
    })
  })

const messagesContainer = ref(null)
const input = ref('')
const loading = ref(false)

async function inviaMessaggio() {
  if (!input.value.trim() || loading.value) return

  const domanda = input.value
  messaggi.value.push({ testo: domanda, tipo: 'user' })
  input.value = ''
  loading.value = true

  try {
    const risposta = await chiamataAssistente(domanda)
    messaggi.value.push({ testo: risposta, tipo: 'bot' })
  } catch (error) {
    console.error('Errore:', error)
    messaggi.value.push({ testo: '⚠️ Errore nella risposta.', tipo: 'bot' })
  } finally {
    loading.value = false
  }
}

async function chiamataAssistente(messaggioUtente) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY
  const assistantId = import.meta.env.VITE_OPENAI_ASSISTANT_ID

  if (!apiKey || !assistantId) {
    throw new Error('Chiavi mancanti. Controlla il file .env e Netlify.')
  }

  console.log('Creo nuova thread...')
  const threadResponse = await fetch('https://api.openai.com/v1/threads', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'OpenAI-Beta': 'assistants=v2'
  },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: messaggioUtente }
    ]
    })
  })

  if (!threadResponse.ok) {
    const err = await threadResponse.text()
    throw new Error('Errore nella creazione della thread: ' + err)
  }

  const threadData = await threadResponse.json()

  const threadId = threadData.id
  console.log('Thread ID:', threadId)

  console.log('Avvio run...')
  const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'OpenAI-Beta': 'assistants=v2'
    },
    body: JSON.stringify({
      assistant_id: assistantId
    })
  })
  const runData = await runResponse.json()
  const runId = runData.id
  console.log('Run ID:', runId)

  let status = 'queued'
  let tentativi = 0
  let risposta = ''

  while (status !== 'completed' && tentativi < 20) {
    const checkResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'OpenAI-Beta': 'assistants=v2'}
    })
    const checkData = await checkResponse.json()
    status = checkData.status
    console.log(`Tentativo ${tentativi + 1} → Stato:`, status)

    if (status === 'completed') {
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'OpenAI-Beta': 'assistants=v2'}
      })
      const messagesData = await messagesResponse.json()
      risposta = messagesData.data[0]?.content[0]?.text?.value?.trim() || '⚠️ Nessuna risposta trovata.'
      break
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
    tentativi++
  }

  if (!risposta) {
    risposta = '⚠️ Nessuna risposta ricevuta. Riprova più tardi.'
  }

  return risposta
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
  transition: background-color 0.2s ease;
}

.chat-input button:hover {
  background-color: var(--secondary);
}
</style>
