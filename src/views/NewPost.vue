<script lang="ts" setup>
import { DateTime } from "luxon";
import PostWriter from "../components/PostWriter.vue";
import { Post, TimelinePost } from "../posts";
import { useUser } from "../store/users";
import { usePosts } from "../store/posts";
import { useRouter } from "vue-router";

const userStore = useUser();
const postsStore = usePosts();
const router = useRouter();

if (!userStore.currentUserId) {
  throw Error("User was not found");
}
const post: TimelinePost = {
  id: "-1",
  title: "Title",
  created: DateTime.now(),
  authorId: "-1",
  markdown: "## Title",
  html: "<h2>Title</h2>",
};

async function handleSubmit(post: Post) {
  await postsStore.createPost(post);
  router.push("/");
}
</script>
<template>
  <PostWriter :post="post" @submit="handleSubmit" />
</template>
