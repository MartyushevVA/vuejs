<template>
  <main class="page">
    <div class="card">
      <h1 class="heading">New Task</h1>
      <input
        v-model="title"
        class="inp"
        placeholder="Task title…"
        maxlength="200"
        @keydown.enter="submit"
        autofocus
      />
      <div class="row">
        <RouterLink to="/" class="btn-secondary">Cancel</RouterLink>
        <button class="btn-primary" :disabled="!title.trim()" @click="submit">Add task</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTodosStore } from '../stores/todos.js'

const store  = useTodosStore()
const router = useRouter()
const title  = ref('')

function submit() {
  const t = title.value.trim()
  if (!t) return
  store.addTodo(t)
  router.push('/')
}
</script>

<style scoped>
.page { min-height: calc(100vh - 42px); display: flex; justify-content: center; padding: 2rem 1rem; }
.card { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 1rem; }
.heading { font-size: 1.3rem; font-weight: 600; }
.inp { height: 40px; padding: 0 0.75rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.9rem; }
.inp:focus { border-color: var(--accent); }
.row { display: flex; gap: 0.5rem; }
.btn-primary { height: 40px; padding: 0 1rem; background: var(--accent); color: #fff; border-radius: var(--radius); font-size: 0.88rem; font-weight: 500; }
.btn-primary:hover:not(:disabled) { opacity: 0.9; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-secondary { display: flex; align-items: center; height: 40px; padding: 0 1rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.88rem; color: var(--text); }
.btn-secondary:hover { background: var(--bg); }
</style>