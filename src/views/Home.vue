<template>
  <div class="home">
    <div class="contenuto">
      <h1 class="titolo">
        Ciao, come posso aiutarti?
      </h1>

        <button class="bottone" @click="apriChat">Apri la chat</button>
    </div>
  </div>
</template>

<script setup>
  const emit = defineEmits(['apri-chat'])

  function apriChat() {
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
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
}
.bottone {
  background-color: var(--primary);
  color: white;
  font-weight: 600;
  letter-spacing: 0.5px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  text-transform: uppercase;
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
