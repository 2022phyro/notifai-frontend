<script setup>
import { reactive } from 'vue'
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: ''
})

const passwordPattern = helpers.regex('passwordPattern', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,40}$/)

const rules = {
  firstName: { 
    required: helpers.withMessage("Please input your name", required),
    maxLength: helpers.withMessage("Should be less than 100 characters", maxLength(100)) },
  lastName: { 
    required: helpers.withMessage("Please input your name", required),
    maxLength: helpers.withMessage("Should be less than 100 characters", maxLength(100)) },
  email: { 
    required: helpers.withMessage("Please input your email", required),
    email: helpers.withMessage("Enter a valid email address", email) 
  },
  password: { 
    required: helpers.withMessage("Enter in your password", required), 
    minLength: helpers.withMessage("Should be at least 6 characters", minLength(6)),
   passwordPattern: helpers.withMessage("Should contain at least one letter and one number", passwordPattern)
 },
  phone: { 
    // required: helpers.withMessage("Please input a valid phone number", required)
  }
}

const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  v$.value.$touch()
  const result = await v$.value.$validate()
  console.log(result)
  if (!result)
   console.log('nooo')
  else
  console.log(form)
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
          :class="{ error: v$.email.$errors.length}"
        />
        <div class="error-msg" v-if="v$.email.$errors">
            {{ v$.email.$errors[0]?.$message }}
        </div>
      </div>

      <div class="auth-form-obj">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          @blur="v$.password.$touch"
          :class="{ error: v$.password.$errors.length}"
        />
        <div class="error-msg" v-if="v$.password.$errors">
            {{ v$.password.$errors[0]?.$message }}
        </div>
      </div>
      <button type="submit" class="button-outline to-db">Login</button>
    </form>
  </div>
</template>
<style scoped>
.login {
  margin-top: 60px;
  border: 1px solid red;
  padding: 30px 20px;
  min-height: 450px;
  max-width:450px;
  flex-shrink: 0px;
  width: 450px;
  margin: 30px;
  border: 1px solid #222;
  box-shadow: 4px 4px 1px #222;
}

.error-msg {
    font-weight: 300;
    font-size: 12px;
    color: red
}
.auth-form-obj {
    display: flex;
    flex-flow: column nowrap;
    margin-bottom: 5px;
    font-family: var(--body-font1)
}
.auth-form-obj input {
    border: none;
    border-bottom: 1px solid black;
    color: #222020;
    font-size: 16px;
    background: inherit;
    padding: 5px;
    transition: all 0.3s ease
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
</style>
