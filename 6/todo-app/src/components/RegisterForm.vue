<template>
  <main class="page">
    <div class="card">
      <h1 class="heading">Register</h1>

      <div class="field">
        <label class="label">Email</label>
        <input
          v-model="email"
          type="email"
          class="inp"
          :class="fieldClass(emailMeta)"
          placeholder="user@example.com"
          @blur="emailBlur"
        />
        <span class="err-msg">{{ emailError }}</span>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="pw-row">
          <div style="flex:1">
            <input
              v-model="password"
              type="password"
              class="inp"
              :class="fieldClass(passwordMeta)"
              placeholder="At least 8 characters"
              @blur="passwordBlur"
            />
          </div>
          <ul class="criteria" v-if="passwordMeta.dirty || passwordMeta.touched">
            <li :class="criteria.length  ? 'ok' : 'fail'">Min 8 characters</li>
            <li :class="criteria.digit   ? 'ok' : 'fail'">Numbers (0–9)</li>
            <li :class="criteria.lower   ? 'ok' : 'fail'">Lowercase letters</li>
            <li :class="criteria.upper   ? 'ok' : 'fail'">Uppercase letters</li>
            <li :class="criteria.special ? 'ok' : 'fail'">Special characters</li>
          </ul>
          <ul class="criteria neutral" v-else>
            <li>Min 8 characters</li>
            <li>Numbers (0–9)</li>
            <li>Lowercase letters</li>
            <li>Uppercase letters</li>
            <li>Special characters</li>
          </ul>
        </div>
      </div>

      <label class="agree">
        <input type="checkbox" v-model="agree"/>
        I agree with the license agreement
      </label>
      <button class="btn-primary" :disabled="!canSubmit" @click="onSubmit">
        Register
      </button>

      <p v-if="submitted" class="success-msg">✓ Registration successful!</p>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useForm, useField } from 'vee-validate'

const { meta: formMeta } = useForm()

function validateEmail(val) {
  if (!val) return 'Email is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Enter a valid email address'
  return true
}

function validatePassword(val) {
  if (!val) return 'Password is required'
  if (val.length < 8)             return 'At least 8 characters required'
  if (!/[0-9]/.test(val))         return 'Must contain a digit'
  if (!/[a-z]/.test(val))         return 'Must contain a lowercase letter'
  if (!/[A-Z]/.test(val))         return 'Must contain an uppercase letter'
  if (!/[^a-zA-Z0-9]/.test(val))  return 'Must contain a special character'
  return true
}

function validateAgree(val) {
  return val === true || 'You must agree to continue'
}

const {
  value: email,
  meta: emailMeta,
  errorMessage: emailError,
  handleBlur: emailBlur,
} = useField('email', validateEmail)

const {
  value: password,
  meta: passwordMeta,
  handleBlur: passwordBlur,
} = useField('password', validatePassword)

const {
  value: agree,
  meta: agreeMeta,
} = useField('agree', validateAgree, {
  type: 'checkbox',
  checkedValue: true,
  uncheckedValue: false
})

const criteria = computed(() => {
  const p = password.value || ''
  return {
    length:  p.length >= 8,
    digit:   /[0-9]/.test(p),
    lower:   /[a-z]/.test(p),
    upper:   /[A-Z]/.test(p),
    special: /[^a-zA-Z0-9]/.test(p),
  }
})

const canSubmit = computed(() => formMeta.value.valid)
const submitted = ref(false)

function onSubmit() {
  if (!canSubmit.value) return
  submitted.value = true
}

function fieldClass(meta) {
  if (!meta.dirty && !meta.touched) return ''
  return meta.valid ? 'inp-valid' : 'inp-error'
}
</script>

<style scoped>
.page { min-height: calc(100vh - 42px); display: flex; justify-content: center; padding: 2rem 1rem; }
.card { width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 1.1rem; }
.heading { font-size: 1.3rem; font-weight: 600; }

.field { display: flex; flex-direction: column; gap: 0.3rem; }
.label { font-size: 0.85rem; font-weight: 500; color: var(--text); }

.inp {
  width: 100%;
  height: 40px;
  padding: 0 0.75rem;
  background: var(--surface);
  border: 1.5px solid var(--border);
  border-radius: var(--radius);
  font-size: 0.9rem;
  transition: border-color 0.15s;
}
.inp:focus { border-color: var(--accent); }
.inp-valid  { border-color: var(--success) !important; }
.inp-error  { border-color: var(--danger)  !important; }

.err-msg { font-size: 0.8rem; color: var(--danger); min-height: 1rem; }

.pw-row { display: flex; gap: 1rem; align-items: flex-start; }

.criteria {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.78rem;
  min-width: 150px;
}
.criteria li::before { content: '→ '; }
.criteria.neutral li { color: var(--muted); }
.criteria li.ok   { color: var(--success); }
.criteria li.fail { color: var(--danger);  }

.agree {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  cursor: pointer;
  user-select: none;
}
.agree input { width: 15px; height: 15px; cursor: pointer; accent-color: var(--accent); }

.btn-primary {
  height: 40px;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  transition: opacity 0.15s;
}
.btn-primary:hover:not(:disabled) { opacity: 0.9; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

.success-msg { font-size: 0.88rem; color: var(--success); font-weight: 500; }
</style>
