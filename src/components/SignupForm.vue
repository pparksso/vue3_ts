<script setup lang="ts">
import UserForm from "./UserForm.vue";
import { useUser } from "../store/users";
import { NewUser } from "../users";
import { useModal } from "../composables/modal";

const userStore = useUser();
const modal = useModal();

async function handleSignUp(newUser: NewUser) {
  await userStore.createUser(newUser);
  modal.hideModal();
}
</script>
<template>
  <UserForm @submit="handleSignUp" />
</template>
