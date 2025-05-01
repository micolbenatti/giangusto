<template>
  <div class="px-6 py-10 min-h-[calc(100vh-15rem)]">

    <h1 class="text-3xl md:text-4xl font-extrabold text-[#2c1b13] mb-2 uppercase">Il Menù</h1>
    <p class="text-lg text-[#2c1b13] mb-8">Qui potrai consultare tutto il menù di GianGusto</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="categoria in categorie" :key="categoria.nome" class="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
        <img :src="categoria.img" :alt="categoria.nome" class="w-40 h-40 object-contain mb-4" />
        <p class="text-lg font-semibold text-[#2c1b13]">{{ categoria.nome }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const categorie = [
  { nome: 'Piadine', img: '/piadina.png' },
  { nome: 'PiadaBurger', img: '/piada-burger.png' },
  { nome: 'Rotolone XXL', img: '/rotolone.png' },
  { nome: 'Twist', img: '/twist.png' },
  { nome: 'Bowl', img: '/bowl.png' },
  { nome: 'Dolce', img: '/dolce.png' },
  { nome: 'Patatine', img: '/patatine.png' }
]
</script>