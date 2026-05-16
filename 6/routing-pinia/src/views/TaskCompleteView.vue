<template>
  <main class="page">
    <div class="card">
      <p class="icon">✅</p>
      <h1 class="heading">Task status has been changed</h1>
      <p class="muted">Task #{{ id }} is now <strong>{{ newStatus }}</strong>.</p>
      <RouterLink :to="`/task/${id}`" class="btn-secondary">View task</RouterLink>
      <RouterLink to="/" class="back">← Back to list</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTodosStore } from '../stores/todos.js'

const route     = useRoute()
const store     = useTodosStore()
const id        = route.params.id
const newStatus = ref('')

onMounted(() => {
  store.load()
  store.toggleTodo(Number(id))
  const todo = store.getById(id)
  newStatus.value = todo ? (todo.completed ? 'completed' : 'pending') : 'unknown'
})
</script>

<style scoped>
.page { min-height: calc(100vh - 42px); display: flex; justify-content: center; padding: 2rem 1rem; }
.card { width: 100%; max-width: 400px; display: flex; flex-direction: column; align-items: center; gap: 0.6rem; text-align: center; padding-top: 2rem; }
.icon    { font-size: 2rem; }
.heading { font-size: 1.3rem; font-weight: 600; }
.muted   { font-size: 0.9rem; color: var(--muted); }
.btn-secondary { margin-top: 0.5rem; display: flex; align-items: center; height: 38px; padding: 0 1.25rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.88rem; color: var(--text); }
.btn-secondary:hover { background: var(--bg); }
.back { font-size: 0.84rem; color: var(--muted); }
.back:hover { color: var(--accent); }
</style>