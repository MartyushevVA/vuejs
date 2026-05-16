<template>
  <main class="page">
    <div class="card">
      <h1 class="heading">All Tasks</h1>

      <div class="list">
        <p v-if="store.todos.length === 0" class="empty">No tasks yet. <RouterLink to="/add">Add one →</RouterLink></p>
        <div
          v-for="todo in store.todos"
          :key="todo.id"
          class="item"
          :class="{ completed: todo.completed }"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="store.toggleTodo(todo.id)"
          />
          <RouterLink :to="`/task/${todo.id}`" class="item-title">{{ todo.title }}</RouterLink>
          <RouterLink :to="`/task/${todo.id}/delete`" class="del">✕</RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTodosStore } from '../stores/todos.js'
const store = useTodosStore()
onMounted(() => store.load())
</script>

<style scoped>
.page { min-height: calc(100vh - 42px); display: flex; justify-content: center; padding: 2rem 1rem; }
.card { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 1rem; }
.heading { font-size: 1.3rem; font-weight: 600; }
.list { display: flex; flex-direction: column; gap: 0.4rem; }
.empty { font-size: 0.9rem; color: var(--muted); }
.empty a { color: var(--accent); }

.item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.item input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; accent-color: var(--success); flex-shrink: 0; }
.item-title { flex: 1; font-size: 0.9rem; color: var(--text); }
.item.completed .item-title { text-decoration: line-through; color: var(--muted); }
.del { background: none; color: var(--muted); font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; transition: color 0.15s; }
.del:hover { color: var(--danger); }
</style>