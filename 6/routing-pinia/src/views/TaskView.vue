<template>
  <main class="page">
    <div class="card">
      <template v-if="todo">
        <p class="meta">Task #{{ todo.id }}</p>
        <h1 class="title" :class="{ done: todo.completed }">{{ todo.title }}</h1>
        <p class="status">Status: <strong>{{ todo.completed ? 'Completed' : 'Pending' }}</strong></p>
        <div class="actions">
          <RouterLink :to="`/task/${todo.id}/complete`" class="btn-secondary">Toggle status</RouterLink>
          <RouterLink :to="`/task/${todo.id}/delete`"  class="btn-danger">Delete</RouterLink>
        </div>
        <RouterLink to="/" class="back">← Back to list</RouterLink>
      </template>
      <template v-else>
        <p class="not-found">Task not found.</p>
        <RouterLink to="/" class="back">← Back to list</RouterLink>
      </template>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTodosStore } from '../stores/todos.js'

const route = useRoute()
const store = useTodosStore()
onMounted(() => store.load())

const todo = computed(() => store.getById(route.params.id))
</script>

<style scoped>
.page { min-height: calc(100vh - 42px); display: flex; justify-content: center; padding: 2rem 1rem; }
.card { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 0.75rem; }
.meta   { font-size: 0.8rem; color: var(--muted); }
.title  { font-size: 1.2rem; font-weight: 600; }
.title.done { text-decoration: line-through; color: var(--muted); }
.status { font-size: 0.9rem; }
.actions { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.btn-secondary, .btn-danger { display: flex; align-items: center; height: 38px; padding: 0 1rem; border-radius: var(--radius); font-size: 0.88rem; font-weight: 500; }
.btn-secondary { background: var(--surface); border: 1px solid var(--border); color: var(--text); }
.btn-secondary:hover { background: var(--bg); }
.btn-danger { background: var(--danger); color: #fff; }
.btn-danger:hover { opacity: 0.9; }
.back { font-size: 0.84rem; color: var(--muted); }
.back:hover { color: var(--accent); }
.not-found { color: var(--muted); }
</style>