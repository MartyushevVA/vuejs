<template>
  <nav class="nav">
    <RouterLink to="/">Tasks</RouterLink>
    <RouterLink to="/add">+ New</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </nav>
  <RouterView />
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #f4f4f5;
  --surface: #fff;
  --border: #e4e4e7;
  --text: #18181b;
  --muted: #71717a;
  --accent: #2563eb;
  --danger: #dc2626;
  --success: #16a34a;
  --radius: 8px;
}

body { background: var(--bg); min-height: 100vh; font-family: system-ui, sans-serif; font-size: 15px; color: var(--text); }
button { font-family: inherit; cursor: pointer; border: none; outline: none; }
input  { font-family: inherit; outline: none; }
a { color: inherit; text-decoration: none; }
</style>

<style scoped>
.nav {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
  padding: 0 1rem;
}
.nav a {
  padding: 0.7rem 1.1rem;
  font-size: 0.88rem;
  color: var(--muted);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;
}
.nav a.router-link-active {
  color: var(--accent);
  border-bottom-color: var(--accent);
  font-weight: 500;
}
</style>