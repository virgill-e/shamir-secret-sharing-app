<script setup lang="ts">
import { ref, watch } from 'vue'

const shareCount = ref(3)
const shares = ref<string[]>(Array(3).fill(''))
const reconstructedSecret = ref('')
const error = ref('')
const loading = ref(false)

watch(shareCount, (newCount) => {
  const currentLength = shares.value.length
  if (newCount > currentLength) {
    shares.value.push(...Array(newCount - currentLength).fill(''))
  } else if (newCount < currentLength) {
    shares.value = shares.value.slice(0, newCount)
  }
})

const addShare = (): void => {
  shareCount.value++
}

const removeShare = (index: number): void => {
  if (shareCount.value > 2) {
    shares.value.splice(index, 1)
    shareCount.value--
  }
}

const reconstructSecret = async (): Promise<void> => {
  const filledShares = shares.value.filter((s) => s.trim() !== '')

  if (filledShares.length < 2) {
    error.value = 'Please enter at least 2 shares'
    return
  }

  loading.value = true
  error.value = ''
  reconstructedSecret.value = ''

  try {
    const result = await window.api.shamir.combine(filledShares)

    if (result.success && result.secret) {
      reconstructedSecret.value = result.secret
    } else {
      error.value = result.error || 'Failed to reconstruct secret'
    }
  } catch (err) {
    error.value = 'An error occurred'
  } finally {
    loading.value = false
  }
}

const copySecret = async (): Promise<void> => {
  await navigator.clipboard.writeText(reconstructedSecret.value)
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-slate-800 mb-4">Reconstruct Your Secret</h2>
      <p class="text-slate-600 mb-6">
        Enter the minimum required number of shares to reconstruct the original secret.
      </p>
      <div class="space-y-4">
        <!-- Number of shares selector -->
        <div class="flex items-center gap-4 pb-4 border-b border-slate-200">
          <label class="text-sm font-medium text-slate-700">Number of shares:</label>
          <div class="flex items-center gap-2">
            <button type="button" :disabled="shareCount <= 2" :class="[
              'w-8 h-8 flex items-center justify-center rounded-lg border transition-colors',
              shareCount <= 2
                ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
            ]" @click="shareCount--">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="w-12 text-center font-semibold text-slate-800">{{ shareCount }}</span>
            <button type="button"
              class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
              @click="addShare">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Dynamic share inputs -->
        <div v-for="(share, index) in shares" :key="index" class="relative">
          <div class="flex items-start gap-2">
            <div class="flex-1">
              <label class="block text-sm font-medium text-slate-700 mb-2">
                Share {{ index + 1 }}
              </label>
              <textarea v-model="shares[index]"
                class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                rows="2" :placeholder="`Enter share ${index + 1}...`"></textarea>
            </div>
            <button v-if="shareCount > 2" type="button"
              class="mt-8 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" @click="removeShare(index)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ error }}
        </div>

        <button @click="reconstructSecret" :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
          {{ loading ? 'Reconstructing...' : 'Reconstruct Secret' }}
        </button>
      </div>

      <div v-if="reconstructedSecret" class="mt-6 pt-6 border-t border-slate-200">
        <h3 class="text-lg font-semibold text-slate-800 mb-4">Reconstructed Secret</h3>
        <div class="flex items-start gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
          <div class="flex-1">
            <div class="text-slate-800 break-all">{{ reconstructedSecret }}</div>
          </div>
          <button @click="copySecret"
            class="p-2 text-green-700 hover:bg-green-100 rounded transition-colors" title="Copy to clipboard">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
