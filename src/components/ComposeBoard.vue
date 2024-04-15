<script setup>
import { reactive, ref } from 'vue'
import { required, url, maxLength, helpers } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = reactive({
  userId: '',
  title: '',
  body: '',
  imageUrl: ''
})

const showImageUrl = ref(false)

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
  imageUrl: {
    url: helpers.withMessage('Enter a valid url', url)
  }
}

const v$ = useVuelidate(rules, form)

const submitForm = async () => {
  v$.value.$touch()
  const result = await v$.value.$validate()
  console.log(result)
  if (!result) console.log('nooo')
  else console.log(form)
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
      <h2 class="extras btn" @click="showImageUrl = !showImageUrl">
        <fa-icon :icon="['fa', !showImageUrl ? 'chevron-right' : 'chevron-down']" />Extras
      </h2>

      <div v-if="showImageUrl" class="fcol cmp-value">
        <label for="imageUrl">Image URL:</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="https://img1.com/image3465"
          v-model="form.imageUrl"
          @blur="v$.imageUrl.$touch"
          :class="{ error: v$.imageUrl.$errors.length }"
        />
        <p class="error-msg" v-if="v$.imageUrl.$errors">
          {{ v$.imageUrl.$errors[0]?.$message }}
        </p>
      </div>
      <button class="button-outline" type="submit">Submit</button>
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
.cmp-value {
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
  font-family: var(--body-font2);
  outline: none;
  border: 1px solid #ccc;
  resize: none;
}
.cmp-value .error {
  border-color: red;
}
.extras {
  color: var(--primary);
  font-weight: 600;
  display: flex;
  flex-flow: row;
  align-items: center;
  font-size: 22px;
  gap: 6px;
  cursor: pointer;
}
.extras svg {
  font-size: 14px;
}
</style>
