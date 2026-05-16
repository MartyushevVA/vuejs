<template>
  <main class="page">
    <div class="card">
      <h1 class="heading">ToDo List</h1>

      <div class="add-row">
        <input v-model="newTask" class="task-input" placeholder="New task…" :disabled="adding" @keydown.enter="addTodo" maxlength="200" />
        <button class="btn-primary" :disabled="!newTask.trim() || adding" @click="addTodo">
          {{ adding ? '…' : 'Add' }}
        </button>
      </div>

      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>

      <div class="list">
        <p v-if="todos.length === 0" class="empty">No tasks yet.</p>
        <TodoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
          :busy="busyIds.has(todo.id)"
          @toggle="toggleTodo"
          @delete="confirmDelete"
        />
      </div>

      <div v-if="todos.length" class="footer">
        <span class="muted">{{ remaining }} left</span>
        <button v-if="completedCount" class="btn-link" @click="clearCompleted">Clear done</button>
      </div>
    </div>
  </main>

  <Popup v-model="showPopup">
    <p class="popup-title">Delete this task?</p>
    <p class="muted" style="margin-top:0.25rem;font-size:0.85rem">This cannot be undone.</p>
    <div class="popup-btns">
      <button class="btn-secondary" @click="showPopup = false">Cancel</button>
      <button class="btn-danger" @click="executeDelete">Delete</button>
    </div>
  </Popup>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TodoItem from './TodoItem.vue'
import Popup from './Popup.vue'
import { todosApi } from '../api/todos.js'

const STORAGE_KEY = 'vue-todos'
const todos    = ref([])
const newTask  = ref('')
const adding   = ref(false)
const errorMsg = ref('')
const showPopup = ref(false)
const pendingDeleteId = ref(null)
const busyIds  = ref(new Set())

const remaining      = computed(() => todos.value.filter(t => !t.completed).length)
const completedCount = computed(() => todos.value.filter(t => t.completed).length)

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value)) }
function load() {
  const raw = localStorage.getItem(STORAGE_KEY)
  todos.value = raw ? JSON.parse(raw) : []
}
function nextId() { return (todos.value.reduce((m, t) => Math.max(m, t.id ?? 0), 0)) + 1 }

async function addTodo() {
  const title = newTask.value.trim()
  if (!title) return
  adding.value = true
  errorMsg.value = ''
  try {
    await todosApi.create(title)
    todos.value.unshift({ id: nextId(), title, completed: false })
    save()
    newTask.value = ''
  } catch (e) { errorMsg.value = e.message }
  finally { adding.value = false }
}

async function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (!todo || busyIds.value.has(id)) return
  busyIds.value = new Set([...busyIds.value, id])
  errorMsg.value = ''
  try {
    await todosApi.update(id, !todo.completed)
    todo.completed = !todo.completed
    save()
  } catch (e) { errorMsg.value = e.message }
  finally { const s = new Set(busyIds.value); s.delete(id); busyIds.value = s }
}

function confirmDelete(id) { pendingDeleteId.value = id; showPopup.value = true }

async function executeDelete() {
  const id = pendingDeleteId.value
  showPopup.value = false
  pendingDeleteId.value = null
  busyIds.value = new Set([...busyIds.value, id])
  errorMsg.value = ''
  try {
    await todosApi.remove(id)
    todos.value = todos.value.filter(t => t.id !== id)
    save()
  } catch (e) { errorMsg.value = e.message }
  finally { const s = new Set(busyIds.value); s.delete(id); busyIds.value = s }
}

function clearCompleted() { todos.value = todos.value.filter(t => !t.completed); save() }

onMounted(load)
</script>

<style scoped>
.page { min-height: calc(100vh - 42px); display: flex; justify-content: center; padding: 2rem 1rem; }
.card { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 1rem; }
.heading { font-size: 1.3rem; font-weight: 600; }
.add-row { display: flex; gap: 0.5rem; }
.task-input { flex: 1; height: 40px; padding: 0 0.75rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); font-size: 0.9rem; }
.task-input:focus { border-color: var(--accent); }
.btn-primary { height: 40px; padding: 0 1rem; background: var(--accent); color: #fff; border-radius: var(--radius); font-size: 0.88rem; font-weight: 500; }
.btn-primary:hover:not(:disabled) { opacity: 0.9; }
.btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
.list { display: flex; flex-direction: column; gap: 0.4rem; }
.empty { font-size: 0.88rem; color: var(--muted); padding: 0.5rem 0; }
.error { font-size: 0.84rem; color: var(--danger); }
.footer { display: flex; justify-content: space-between; align-items: center; }
.muted  { color: var(--muted); font-size: 0.84rem; }
.btn-link { background: none; color: var(--muted); font-size: 0.84rem; text-decoration: underline; }
.btn-link:hover { color: var(--danger); }
.popup-title { font-weight: 600; font-size: 1rem; }
.popup-btns { display: flex; gap: 0.5rem; margin-top: 1.25rem; }
.btn-secondary, .btn-danger { flex: 1; height: 38px; border-radius: var(--radius); font-size: 0.88rem; font-weight: 500; }
.btn-secondary { background: var(--bg); border: 1px solid var(--border); }
.btn-secondary:hover { background: var(--border); }
.btn-danger { background: var(--danger); color: #fff; }
.btn-danger:hover { opacity: 0.9; }
</style>
