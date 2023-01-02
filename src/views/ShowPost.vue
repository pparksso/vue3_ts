<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { usePosts } from "../store/posts";
import { useUser } from "../store/users";

const route = useRoute();
const userStore = useUser();
const postsStore = usePosts();
const id = route.params.id as string;
const post = postsStore.all.get(id);

if (!post) throw Error(`Post with id ${id} was not found`);

const canEdit = computed(() => {
  if (!userStore.currentUserId) return false;
  if (userStore.currentUserId !== post.authorId) return false;
  return true;
});
</script>
<template>
  <div class="columns">
    <div class="column"></div>
    <div class="column is-two-thirds">
      <router-link :to="`/posts/${post.id}/edit`" class="is-link button is-rounded" v-if="canEdit">Edit Post</router-link>
      <h1>{{ post.title }}</h1>
      <div class="" v-html="post.html"></div>
    </div>
    <div class="column"></div>
  </div>
</template>
