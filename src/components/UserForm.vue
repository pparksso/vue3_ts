<script setup lang="ts">
import { computed, ref } from "vue";
import FormInput from "./FormInput.vue";
import { validate, length, required } from "../validation";
import { NewUser } from "../users";
import { useUser } from "../store/users";
import { useModal } from "../composables/modal";

defineProps<{ error?: string }>();

const emit = defineEmits<{
  (event: "submit", payload: NewUser): void;
}>();

const userStore = useUser();
const username = ref("");
const usernameStatus = computed(() => {
  return validate(username.value, [required, length({ min: 5, max: 10 })]);
});
const password = ref("");
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 14 })]);
});
async function handleSubmit() {
  if (!isInvalid) {
    return;
  }
  const newUser: NewUser = {
    username: username.value,
    password: password.value,
  };
  try {
    emit("submit", newUser);
  } catch (e) {}
}
const modal = useModal();
const isInvalid = computed(() => {
  return !usernameStatus.value.valid || !passwordStatus.value.valid;
});
</script>
<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput data-testid="username" name="Username" v-model="username" :status="usernameStatus" type="text" />
    <FormInput data-testid="password" name="Password" v-model="password" :status="passwordStatus" type="password" />
    <div v-if="error" class="is-danger help" style="margin-bottom: 10px">{{ error }}</div>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>
<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
