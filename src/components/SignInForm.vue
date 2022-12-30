<script setup lang="ts">
import UserForm from "./UserForm.vue";
import { useUser } from "../store/users";
import { NewUser } from "../users";
import { useModal } from "../composables/modal";
import { ref } from "vue";

const userStore = useUser();
const modal = useModal();
const error = ref("");

async function handleSignIn(newUser: NewUser) {
  //1. request
  const body = JSON.stringify(newUser);
  const res = await window.fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  if ([401, 404].includes(res.status)) {
    error.value = "Username or password was incorrect.";
  } else {
    //2. success -> authenticate(), hideModal
    userStore.authenticate();
    modal.hideModal();
  }
  //3. fail -> 401, 404 -> error
}
</script>
<template>
  <UserForm @submit="handleSignIn" :error="error" />
</template>
