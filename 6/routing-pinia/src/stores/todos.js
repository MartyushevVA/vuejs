import { defineStore } from 'pinia'
import { ref } from 'vue'

const STORAGE_KEY = 'vue-todos-routing'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([])

  function load() {
    const raw = localStorage.getItem(STORAGE_KEY)
    todos.value = raw ? JSON.parse(raw) : []
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
  }

  function nextId() {
    return (todos.value.reduce((m, t) => Math.max(m, t.id), 0)) + 1
  }

  function addTodo(title) {
    todos.value.push({ id: nextId(), title, completed: false })
    save()
  }

  function toggleTodo(id) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) { todo.completed = !todo.completed; save() }
  }

  function removeTodo(id) {
    todos.value = todos.value.filter(t => t.id !== id)
    save()
  }

  function getById(id) {
    return todos.value.find(t => t.id === Number(id))
  }

  return { todos, load, addTodo, toggleTodo, removeTodo, getById }
})