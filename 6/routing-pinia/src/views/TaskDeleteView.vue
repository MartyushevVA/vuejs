<template>
  <main class="page">
    <div class="card">
      <p class="icon">🗑️</p>
      <h1 class="heading">Task deleted</h1>
      <p class="muted">Task #{{ id }} has been removed.</p>
      <RouterLink to="/" class="btn-primary">Back to list</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTodosStore } from '../stores/todos.js'

const route = useRoute()
const store = useTodosStore()
const id    = route.params.id

onMounted(() => {
  store.load()
  store.removeTodo(Number(id))
})
</script>

<style scoped>
.page { min-height: calc(100vh - 42px); display: flex; justify-content: center; padding: 2rem 1rem; }
.card { width: 100%; max-width: 400px; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; text-align: center; padding-top: 2rem; }
.icon    { font-size: 2rem; }
.heading { font-size: 1.3rem; font-weight: 600; }
.muted   { font-size: 0.9rem; color: var(--muted); }
.btn-primary { margin-top: 0.5rem; display: flex; align-items: center; height: 40px; padding: 0 1.25rem; background: var(--accent); color: #fff; border-radius: var(--radius); font-size: 0.88rem; font-weight: 500; }
.btn-primary:hover { opacity: 0.9; }
</style>