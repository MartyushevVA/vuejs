const BASE = 'https://jsonplaceholder.typicode.com'
const USER_ID = 1

export const todosApi = {
  async create(title) {
    const res = await fetch(`${BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false, userId: USER_ID }),
    })
    if (!res.ok) throw new Error('Failed to create task')
    return res.json()
  },

  async update(id, completed) {
    const res = await fetch(`${BASE}/todos/1`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
    if (!res.ok) throw new Error('Failed to update task')
    return res.json()
  },

  async remove(id) {
    const res = await fetch(`${BASE}/todos/1`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete task')
    return true
  },
}
