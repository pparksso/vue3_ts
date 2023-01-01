<script setup lang="ts">
import { useModal } from "../composables/modal";
import { useUser } from "../store/users";
import { useRouter } from "vue-router";

const userStore = useUser();
const modal = useModal();
const router = useRouter();

async function logout() {
  userStore.logout();
  router.push({ path: "/" });
}
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons" v-if="userStore.currentUserId">
        <router-link to="/posts/new" class="button"> New Post </router-link>
        <button class="button" @click="logout">Log Out</button>
      </div>
      <div class="buttons" v-else>
        <button class="button" @click="modal.showModal('signUp')">Sign up</button>
        <button class="button" @click="modal.showModal('signIn')">Sign In</button>
      </div>
    </div>
  </div>
  <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport>
</template>
