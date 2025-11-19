<script setup lang="ts">
import { ref } from 'vue'
import TabMenu from './components/TabMenu.vue'
import EncryptTab from './components/EncryptTab.vue'
import DecryptTab from './components/DecryptTab.vue'

type Tab = 'encrypt' | 'decrypt'
const activeTab = ref<Tab>('encrypt')
</script>

<template>
  <div class="w-full h-full flex flex-col bg-linear-to-br from-slate-50 to-slate-100">
    <!-- Header -->
    <div class="px-6 py-4 bg-white shadow-sm">
      <h1 class="text-2xl font-bold text-slate-800">Shamir Secret Sharing</h1>
      <p class="text-sm text-slate-500 mt-1">Secure secret splitting and reconstruction</p>
    </div>

    <!-- Menu -->
    <TabMenu :active-tab="activeTab" @update:active-tab="activeTab = $event" />

    <!-- Contenu qui change selon le tab -->
    <div class="flex-1 px-6 py-6">
      <EncryptTab v-if="activeTab === 'encrypt'" />
      <DecryptTab v-else-if="activeTab === 'decrypt'" />
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 bg-white shadow-sm w-full flex justify-center">
      <a href="https://www.virgill-e.com/" target="_blank"
        class="text-sm text-blue-500 hover:text-blue-700 mx-auto">Virgill_e</a>
    </div>
  </div>
</template>
