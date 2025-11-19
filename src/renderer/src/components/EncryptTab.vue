<script setup lang="ts">
import { ref } from 'vue'

const secret = ref('')
const totalShares = ref(5)
const threshold = ref(3)
const generatedShares = ref<string[]>([])
const error = ref('')
const loading = ref(false)

const generateShares = async (): Promise<void> => {
  if (!secret.value.trim()) {
    error.value = 'Please enter a secret'
    return
  }

  if (threshold.value > totalShares.value) {
    error.value = 'Threshold cannot be greater than total shares'
    return
  }

  if (threshold.value < 2 || totalShares.value < 2) {
    error.value = 'Minimum 2 shares and threshold required'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const result = await window.api.shamir.split(secret.value, totalShares.value, threshold.value)

    if (result.success && result.shares) {
      generatedShares.value = result.shares
    } else {
      error.value = result.error || 'Failed to generate shares'
    }
  } catch (err) {
    error.value = 'An error occurred'
  } finally {
    loading.value = false
  }
}

const copyShare = async (share: string): Promise<void> => {
  await navigator.clipboard.writeText(share)
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-slate-800 mb-4">Split Your Secret</h2>
      <p class="text-slate-600 mb-6">
        Enter your secret and specify how many shares to create and how many are required to
        reconstruct it.
      </p>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Secret</label>
          <textarea v-model="secret"
            class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="4" placeholder="Enter your secret here..."></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Total Shares</label>
            <input v-model.number="totalShares" type="number"
              class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="5" min="2" />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Threshold</label>
            <input v-model.number="threshold" type="number"
              class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="3" min="2" />
          </div>
        </div>

        <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ error }}
        </div>

        <button @click="generateShares" :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
          {{ loading ? 'Generating...' : 'Generate Shares' }}
        </button>
      </div>

      <div v-if="generatedShares.length > 0" class="mt-6 pt-6 border-t border-slate-200">
        <h3 class="text-lg font-semibold text-slate-800 mb-4">Generated Shares</h3>
        <p class="text-sm text-slate-600 mb-4">
          Keep these shares secure. You need {{ threshold }} of {{ totalShares }} shares to
          reconstruct the secret.
        </p>
        <div class="space-y-3">
          <div v-for="(share, index) in generatedShares" :key="index"
            class="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
            <div class="flex-1">
              <div class="text-xs font-medium text-slate-500 mb-1">Share {{ index + 1 }}</div>
              <div class="font-mono text-sm text-slate-800 break-all">{{ share }}</div>
            </div>
            <button @click="copyShare(share)"
              class="p-2 text-slate-600 hover:bg-slate-200 rounded transition-colors"
              title="Copy to clipboard">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
