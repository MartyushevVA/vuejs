<template>
  <div class="item" :class="{ completed: todo.completed, busy: busy }">
    <input type="checkbox" :checked="todo.completed" :disabled="busy" @change="$emit('toggle', todo.id)" />
    <span class="title">{{ todo.title }}</span>
    <button class="del" :disabled="busy" @click="$emit('delete', todo.id)">✕</button>
  </div>
</template>

<script setup>
defineProps({ todo: Object, busy: Boolean })
defineEmits(['toggle', 'delete'])
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: opacity 0.15s;
}
.item.busy { opacity: 0.5; pointer-events: none; }
input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; accent-color: var(--success); flex-shrink: 0; }
.title { flex: 1; font-size: 0.9rem; word-break: break-word; }
.item.completed .title { text-decoration: line-through; color: var(--muted); }
.del { background: none; color: var(--muted); font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; transition: color 0.15s, background 0.15s; }
.del:hover { color: var(--danger); background: #fee2e2; }
</style>
