<template>
    <div class="overlay-chat">
      <div class="chat-box">
        <button class="chiudi" @click="$emit('chiudi')">✕</button>
        <Chat />
      </div>
    </div>
</template>
  
<script setup>
  import Chat from './chat.vue'
</script>
  
<style scoped>
  .overlay-chat {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .chat-box {
    width: 500px;
    height: 500px;
    background-color: #fdf4ee;
    border-radius: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #fdf4ee;
    position: relative;  /* RICORDA: necessario per posizionare la X */
    padding:10px;
  }

  .chiudi {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--primary);
  z-index: 10;
  transition: color 0.2s ease;
}

.chiudi:hover {
  color: var(--secondary);
}

</style>
  