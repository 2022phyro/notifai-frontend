<script setup>
import { reactive, ref } from 'vue'
import { required, email, helpers } from '@vuelidate/validators'
import { inst, BASE_URL } from '@/utils/auth'
import { useVuelidate } from '@vuelidate/core'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'


const pwdSeen = ref(true)
const isLoading = ref(false)
const lgError = ref(null)
const authState = useAuthStore()
const { setAuth, setCurrToken } = authState
const router = useRouter()
const form = reactive({
  email: '',
  password: ''
})

const passwordPattern = (value) => {
  return /(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)
}
const length = (value) => {
  return value.length >= 6 && value.length <= 40
}
const rules = {
  email: {
    required: helpers.withMessage('Please input your email', required),
    email: helpers.withMessage('Enter a valid email address', email)
  },
  password: {
    required: helpers.withMessage('Enter in your password', required),
    minLength: helpers.withMessage('Should be at between 6 and 40 characters', length),
    passwordPattern: helpers.withMessage(
      'Should contain at least one letter and one number',
      passwordPattern
    )
  }
}

const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  v$.value.$touch()
  isLoading.value = true
  if (isLoading.value) {
    const result = await v$.value.$validate()
    if (!result) {
      isLoading.value = false
    } else {
      const instance = await inst()
      instance
        .post(`${BASE_URL}/login`, form)
        .then((response) => {
          const result = response.data.data
          setAuth(true)
          setCurrToken(result.tokens.accessToken, result.tokens.access_exp)
          router.push('/dashboard')
          isLoading.value = false
          lgError.value = null
        })
        .catch((error) => {
          const result = error.response?.data?.errors
          lgError.value = Object.values(result)[0][0]
          isLoading.value = false
        })
    }
  }
}
</script>
<template>
  <div class="login">
    <h2>Welcome back</h2>
    <form @submit.prevent="handleSubmit">
      <div class="auth-form-obj">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          @blur="v$.email.$touch"
          :class="{ error: v$.email.$errors.length }"
        />
        <div class="error-msg" v-if="v$.email.$errors">
          {{ v$.email.$errors[0]?.$message }}
        </div>
      </div>

      <div class="auth-form-obj">
        <label for="password">Password:</label>
        <input
          :type="!pwdSeen ? 'text' : 'password'"
          id="password"
          v-model="form.password"
          @blur="v$.password.$touch"
          :class="{ error: v$.password.$errors.length }"
        />
        <fa-icon
          class="pwd-seen"
          :icon="['far', pwdSeen ? 'eye' : 'eye-slash']"
          @click="() => (pwdSeen = !pwdSeen)"
        />
        <div class="error-msg" v-if="v$.password.$errors">
          {{ v$.password.$errors[0]?.$message }}
        </div>
      </div>
      <button type="submit" :disabled="isLoading" class="button-outline to-db">Login</button>
      <div class="error-msg" v-if="lgError">
        {{ lgError }}
      </div>
    </form>
  </div>
</template>
<style scoped>
.login {
  margin-top: 60px;
  border: 1px solid red;
  padding: 30px 20px;
  min-height: 450px;
  max-width: 450px;
  flex-shrink: 0px;
  width: 450px;
  margin: 30px;
  border: 1px solid #222;
  box-shadow: 4px 4px 1px #222;
}

.error-msg {
  font-weight: 300;
  font-size: 12px;
  color: red;
}
.auth-form-obj {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 5px;
  font-family: var(--body-font1);
  position: relative;
}
.auth-form-obj input {
  border: none;
  border-bottom: 1px solid black;
  color: #222020;
  font-size: 16px;
  background: inherit;
  padding: 5px;
  transition: all 0.3s ease;
}
.auth-form-obj input.error {
  border-bottom: 1px solid red;
}
.auth-form-obj label {
  font-family: var(--title-font);
  color: grey;
  padding-bottom: 4px;
  font-size: 15px;
}
.to-db {
  width: 100%;
  margin-top: 30px;
}
.pwd-seen {
  cursor: pointer;
  font-size: 18px;
  position: absolute;
  right: 20px;
  top: 40%;
}
</style>
