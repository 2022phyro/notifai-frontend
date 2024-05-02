<script setup>
import { reactive, ref, onMounted } from 'vue'
import { email, minLength, maxLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
// import { useRouter } from 'vue-router'
import { inst, BASE_URL } from '@/utils/auth'
import { useNotification } from '@kyvg/vue3-notification'

const notification = useNotification()
const emit = defineEmits(['deleteAccount'])
const isLoading = ref(false)
const lgError = ref(null)
// const router = useRouter()
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})
const prev = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})
const resetPwd = () => {
  notification.notify({
    text: 'A secure link has been sent to your email',
    type: 'success'
  })
}
const verifyPwd = () => {
  notification.notify({
    text: 'A secure link has been sent to your email to enable you verify your account',
    type: 'success'
  })
}

const phonePattern = (value) => {
  return /^\+\d{1,4}\s\d{3,14}$/.test(value)
}
const deleteAcc = () => {
  emit('deleteAccount')
}

const rules = {
  firstName: {
    maxLength: helpers.withMessage('Should be less than 100 characters', maxLength(100))
  },
  lastName: {
    maxLength: helpers.withMessage('Should be less than 100 characters', maxLength(100))
  },
  email: {
    email: helpers.withMessage('Enter a valid email address', email)
  },
  phone: {
    phonePattern: helpers.withMessage(
      'Your phone number should be in this format +234 123456789',
      phonePattern
    )
  }
}
onMounted(() => {
  inst(true).then((instance) => {
    instance.get(`${BASE_URL}/org`).then((response) => {
      const result = response.data.data
      Object.assign(prev, result)
      Object.assign(form, result)
    })
  })
})
const v$ = useVuelidate(rules, form)

const handleSubmit = async () => {
  v$.value.$touch()
  isLoading.value = true
  if (isLoading.value) {
    const result = await v$.value.$validate()
    if (!result) {
      isLoading.value = false
    } else {
      const changes = Object.keys(form).reduce((acc, key) => {
        if (form[key] && form[key] !== prev[key]) {
          acc[key] = form[key]
        }
        return acc
      }, {})
      if (Object.keys(changes).length === 0) {
        notification.notify({
            text: 'Profile updated successfully',
            type: 'success'
          })
        isLoading.value = false;
        return;
      }

      inst(true)
      .then(instance => {
        instance.patch(`${BASE_URL}/org`, changes)
        .then((response) => {
          const result = response.data.data
          Object.assign(prev, result)
          Object.assign(form, result)
          notification.notify({
            text: 'Profile updated successfully',
            type: 'success'
          })
        })
      })
      isLoading.value = false
    }
  }
}
</script>
<template>
  <div class="profile-board">
    <div class="profile section">
      <h2 class="b pri">Profile</h2>
      <form @submit.prevent="handleSubmit">
        <div class="user-form-obj">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            readonly
            :class="{ error: v$.email.$errors.length }"
          />
          <div class="error-msg" v-if="v$.email.$errors">
            {{ v$.email.$errors[0]?.$message }}
          </div>
        </div>
        <div class="user-form-obj">
          <label for="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            v-model="form.firstName"
            :class="{ error: v$.firstName.$errors.length }"
          />
          <div class="error-msg" v-if="v$.firstName.$errors">
            {{ v$.firstName.$errors[0]?.$message }}
          </div>
        </div>

        <div class="user-form-obj">
          <label for="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            v-model="form.lastName"
            :class="{ error: v$.lastName.$errors.length }"
          />
          <div class="error-msg" v-if="v$.lastName.$errors">
            {{ v$.lastName.$errors[0]?.$message }}
          </div>
        </div>

        <div class="user-form-obj">
          <label for="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            v-model="form.phone"
            :class="{ error: v$.phone.$errors.length }"
          />
          <div class="error-msg" v-if="v$.phone.$errors">
            {{ v$.phone.$errors[0]?.$message }}
          </div>
        </div>

        <button type="submit" :disabled="isLoading" class="b-pri to-db">Save</button>
        <div class="error-msg" v-if="lgError">
          {{ lgError }}
        </div>
      </form>
    </div>
    <div class="section security">
      <h2 class="b pri">Security</h2>
      <!-- <button class="b-sec" >Change your email</button> -->
      <button class="b-sec" @click="resetPwd">Change your password</button>
      <button class="b-sec" @click="verifyPwd">Verify your Account</button>
      <button class="b-danger" @click="deleteAcc">Delete Account</button>
    </div>
  </div>
</template>
<style scoped>
.profile-board {
  padding: 30px;
}
.section {
  border-top: 1px solid var(--primary);
  margin-top: 20px;
  display: flex;
  flex-flow: column;
  gap: 20px;
}
.to-db {
  margin-top: 20px;
}

form {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}
form input {
  width: 350px;
  font-size: 14px;
  font-family: var(--title-font);
}
.user-form-obj {
  display: flex;
  flex-flow: column;
  align-items: flex-start;
}
.user-form-obj label {
  margin-top: 20px;
}
.security button {
  width: 300px;
}
</style>
