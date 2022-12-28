<script setup lang="ts">
import { useModal } from "../composables/modal";

const modal = useModal();
</script>
<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="modal.showModal()">Sign up</button>
        <router-link to="/posts/new"> New Post </router-link>
      </div>
    </div>
  </div>
  <Teleport to="#modal"> Content to gbe rendered. </Teleport>
</template>
