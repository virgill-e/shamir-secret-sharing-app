<script setup lang="ts">
type Tab = 'encrypt' | 'decrypt'

interface Props {
  activeTab: Tab
}

interface Emits {
  (e: 'update:activeTab', value: Tab): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const setActiveTab = (tab: Tab): void => {
  emit('update:activeTab', tab)
}
</script>

<template>
  <div class="px-6 pt-6">
    <div class="flex gap-2 border-b border-slate-200">
      <button :class="[
        'px-6 py-3 font-medium transition-all duration-200 border-b-2 -mb-px',
        activeTab === 'encrypt'
          ? 'text-blue-600 border-blue-600'
          : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
      ]" @click="setActiveTab('encrypt')">
        <span class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Encrypt
        </span>
      </button>
      <button :class="[
        'px-6 py-3 font-medium transition-all duration-200 border-b-2 -mb-px',
        activeTab === 'decrypt'
          ? 'text-blue-600 border-blue-600'
          : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
      ]" @click="setActiveTab('decrypt')">
        <span class="flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
          Decrypt
        </span>
      </button>
    </div>
  </div>
</template>
