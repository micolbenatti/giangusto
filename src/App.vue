<template>
  <div>
    <header class="header">
      <router-link to="/menu" class="link">Menù</router-link>

      <router-link to="/" class="logo"><img src="/logo.png" alt="Logo GianGusto" class="logo-img"></router-link>

      <router-link to="/contatti" class="link">Contatti</router-link>
    </header>

    <main>
      <router-view @apri-chat="chatVisibile = true" />
    </main>

    <Embed v-if="chatVisibile" @chiudi="chatVisibile = false" />

    <footer class="footer">
        <div class="footer-left">
          <h3>Consulta il manuale</h3>
          <a class="manuale-btn" href="/manuale.pdf">CLICCA QUI</a>
        </div>

        <img src="/gian.png" alt="Mascotte GianGusto" class="footer-img"/>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import Embed from './components/embed.vue'

const chatVisibile = ref(false)
</script>

<style scoped>

.header {
  width:100%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  box-shadow: 0 2px 6px rgba(62, 32, 14, 0.2);
  top: 0;
  z-index: 50;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-img {
  height: 3rem;
  object-fit: contain;
}

.footer {
  background-color: #fffbf8;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  margin-bottom: 0;
  padding-bottom: 0;
  height: 10rem;
}

.footer-left h3 {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.manuale-btn {
  background-color: var(--secondary);
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  padding: 0.75rem 2rem;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
  text-transform: uppercase;
}

.manuale-btn:hover {
  background-color: var(--primary);
}

.footer-img {
  width: 18rem;
  height: auto;
  display: block; 
}

</style>
