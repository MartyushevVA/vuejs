<template>
  <main class="page">
    <div class="card">
      <h1 class="heading">About</h1>
      <p>A simple ToDo application built with Vue 3, Vue Router, and Pinia.</p>
      <ul class="stack">
        <li>Vue 3 — Composition API</li>
        <li>Vue Router 4 — client-side routing</li>
        <li>Pinia — state management</li>
        <li>localStorage — data persistence</li>
      </ul>
      <RouterLink to="/" class="back">← Back to list</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.page { min-height: calc(100vh - 42px); display: flex; justify-content: center; padding: 2rem 1rem; }
.card { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 0.75rem; }
.heading { font-size: 1.3rem; font-weight: 600; }
p { font-size: 0.9rem; color: var(--muted); }
.stack { list-style: none; display: flex; flex-direction: column; gap: 0.3rem; }
.stack li { font-size: 0.88rem; color: var(--text); }
.stack li::before { content: '• '; color: var(--accent); }
.back { font-size: 0.84rem; color: var(--muted); margin-top: 0.5rem; }
.back:hover { color: var(--accent); }
</style>