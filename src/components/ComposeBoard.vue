<script setup>
import { ref } from 'vue'
import { required, url } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = ref({
  userId: '',
  title: '',
  body: '',
  imageUrl: ''
})

const showImageUrl = ref(false)

const rules = {
  userId: { required },
  title: { required },
  body: { required },
  imageUrl: { required, url }
}

const v$ = useVuelidate(rules, form)

const submitForm = () => {
  v$.value.$touch()
  if (v$.value.$error) {
    // Form is invalid.
    return
  }
  // Form is valid. Submit the form...
}
</script>
<template>
  <div class="compose-wrapper">
    <form @submit.prevent="submitForm" class="fcol">
      <div class="fcol cmp-value">
        <label for="userId">User ID:</label>
        <input
          id="userId"
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
          v-model="form.body"
          @blur="v$.body.$touch"
          :class="{ error: v$.body.$errors.length }"
        ></textarea>
        <p class="error-msg" v-if="v$.body.$errors">
          {{ v$.body.$errors[0]?.$message }}
        </p>
      </div>
      <h2 class="extras btn" @click="showImageUrl = !showImageUrl">
        <fa-icon :icon="['fa', !showImageUrl?'chevron-right': 'chevron-down']" />Extras
      </h2>

      <div v-if="showImageUrl" class="fcol cmp-value">
        <label for="imageUrl">Image URL:</label>
        <input
          id="imageUrl"
          type="text"
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
    border: 1px solid  #ccc;
}
.cmp-value textarea {
    width: 500px;
    height: 250px;
    outline: none;
    border: 1px solid  #ccc;
    resizable: false;
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
