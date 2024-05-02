<script setup>
import { reactive, ref } from 'vue'
import { required, url, maxLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'
import { inst, BASE_URL } from '@/utils/auth'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'

const router = useRouter()

const { currApp } = storeToRefs(useAppStore())
const form = reactive({
  userId: '',
  title: '',
  body: '',
  icon: '',
  clickUrl: '',
  data: ''
})
const isLoading = ref(false)
const errMsg = ref(null)
const dataholder = ref(JSON.stringify({ user: 'James', age: 23 }, null, 2))
const showImageUrl = ref(false)
const isJson = (value) => {
  try {
    if (value === '') return true
    const parsedValue = JSON.parse(value)
    return typeof parsedValue === 'object' && parsedValue !== null && !Array.isArray(parsedValue)
  } catch {
    return false
  }
}
const rules = {
  userId: {
    required: helpers.withMessage('Enter the unique id of your user', required),
    maxLength: helpers.withMessage('Should be less than 100 characters', maxLength(100))
  },
  title: {
    required: helpers.withMessage('A title for the notification', required),
    maxLength: helpers.withMessage('Should be less than 50 characters', maxLength(100))
  },
  body: {
    required: helpers.withMessage('Enter the body of the notification', required),
    maxLength: helpers.withMessage('Should be less than 200 characters', maxLength(200))
  },
  icon: {
    url: helpers.withMessage('Enter a valid url', url)
  },
  clickUrl: {
    url: helpers.withMessage('Enter a valid url', url)
  },
  data: {
    isJson: helpers.withMessage('Enter a valid json object', isJson)
  }
}

const v$ = useVuelidate(rules, form)

const submitForm = async () => {
  isLoading.value = true
  v$.value.$touch()
  const result = await v$.value.$validate()
  if (!result) {
    isLoading.value = false
  } else {
    try {
      const { data, ...body } = form
      if (data) {
        body.data = JSON.parse(data)
      }
      const instance = await inst(true)
      const response = await instance.post(
        `${BASE_URL}/apps/${currApp.value._id}/notifications`,
        body
      )
      const result = response.data.data
      router.push('/dashboard')
      errMsg.value = null
    } catch (error) {
      console.error(error)
      errMsg.value = 'Something went wrong. Please try again later'
    } finally {
      isLoading.value = false
    }
  }
}
</script>
<template>
  <div class="compose-wrapper">
    <form @submit.prevent="submitForm" class="fcol">
      <div class="fcol cmp-value">
        <label for="userId">User ID:</label>
        <input
          id="userId"
          placeholder="your-user-id"
          type="text"
          v-model="form.userId"
          @blur="v$.userId.$touch"
          :class="{ error: v$.userId.$errors.length }"
        />
        <p class="error-msg" v-if="v$.userId.$errors">
          {{ v$.userId.$errors[0]?.$message }}
        </p>
      </div>
      <div class="fcol cmp-value">
        <label for="title">Title:</label>
        <input
          id="title"
          type="text"
          placeholder="You're being viewed"
          v-model="form.title"
          @blur="v$.title.$touch"
          :class="{ error: v$.title.$errors.length }"
        />
        <p class="error-msg" v-if="v$.title.$errors">
          {{ v$.title.$errors[0]?.$message }}
        </p>
      </div>
      <div class="fcol cmp-value">
        <label for="body">Body:</label>
        <textarea
          id="body"
          placeholder="James just viewed your profile"
          v-model="form.body"
          @blur="v$.body.$touch"
          :class="{ error: v$.body.$errors.length }"
        ></textarea>
        <p class="error-msg" v-if="v$.body.$errors">
          {{ v$.body.$errors[0]?.$message }}
        </p>
      </div>
      <h2 class="extras b pri" @click="showImageUrl = !showImageUrl">
        <fa-icon :icon="['fas', !showImageUrl ? 'caret-right' : 'caret-down']" />Extras
      </h2>
      <div v-if="showImageUrl" class="fcol cmp-value ex ey">
        <label for="icon">Icon URL:</label>
        <input
          id="icon"
          type="text"
          placeholder="https://img1.com/image3465"
          v-model="form.icon"
          @blur="v$.icon.$touch"
          :class="{ error: v$.icon.$errors.length }"
        />
        <p class="error-msg" v-if="v$.icon.$errors">
          {{ v$.icon.$errors[0]?.$message }}
        </p>
      </div>
      <div v-if="showImageUrl" class="fcol cmp-value ex">
        <label for="clickUrl"
          >Click action: A page your user will be taken to once he clicks the notification</label
        >
        <input
          id="clickUrl"
          type="text"
          placeholder="https://yoursite.com/messages/3456"
          v-model="form.clickUrl"
          @blur="v$.clickUrl.$touch"
          :class="{ error: v$.clickUrl.$errors.length }"
        />
        <p class="error-msg" v-if="v$.clickUrl.$errors">
          {{ v$.clickUrl.$errors[0]?.$message }}
        </p>
      </div>
      <div v-if="showImageUrl" class="fcol cmp-value ex">
        <label for="data">Data: Extra information to be sent. Should be a json object</label>
        <textarea
          id="data"
          :placeholder="dataholder"
          v-model="form.data"
          @blur="v$.data.$touch"
          :class="{ error: v$.data.$errors.length }"
        ></textarea>
        <p class="error-msg" v-if="v$.data.$errors">
          {{ v$.data.$errors[0]?.$message }}
        </p>
      </div>
      <button class="b-pri" :disabled="isLoading" type="submit">Submit</button>
      <p class="error-msg" v-if="errMsg">
        {{ errMsg }}
      </p>
    </form>
  </div>
</template>
<style scoped>
.compose-wrapper {
  display: flex;
  padding: 30px;
}
.compose-wrapper form {
  gap: 10px;
}

.cmp-value input {
  outline: none;
  padding: 10px 20px;
  width: 500px;
  border: 1px solid #ccc;
}
.cmp-value textarea {
  width: 500px;
  height: 100px;
  padding: 10px 20px;
  font-family: var(--title-font);
  outline: none;
  border: 1px solid #ccc;
  resize: none;
}
.cmp-value .error {
  border-color: red;
}
.extras {
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 0;
  font-size: 16px;
  gap: 6px;
  cursor: pointer;
  z-index: 0;
}
.cmp-value.ex {
  border-left: 2px solid var(--primary);
  margin-top: -10px;
  padding-top: 10px;
  padding-left: 10px;
  margin-left: 4.5px;
}

.cmp-value.ey {
  margin-top: -20px;
  padding-top: 15px;
}
</style>
