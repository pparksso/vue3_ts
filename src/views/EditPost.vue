<script setup lang="ts">
import PostWriter from "../components/PostWriter.vue";
import { useRoute } from "vue-router";
import { usePosts } from "../store/posts";
import { Post } from "../posts";
import { router } from "../router";

const route = useRoute();
const postsStore = usePosts();
const id = route.params.id as string;
const post = postsStore.all.get(id);
if (!post) throw Error(`Post with id ${id} was not found`);

async function handleSubmit(post: Post) {
  await postsStore.updatePost(post);
  router.push("/");
}
</script>
<template>
  Edit Post
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
