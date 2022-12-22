<script setup lang="ts">
import TimeLineItem from './TimeLineItem.vue';
import {usePosts} from '../store/posts'
import {periods} from "../constants"

const postsStore = usePosts();

postsStore.fetchPosts()




</script>
<template>
  <nav class="is-primary panel">
    {{postsStore.selectedPeriod}}
    <span class="panel-tabs">
      <a v-for="period of periods" :key="period" @click="postsStore.setSelectedPeriod(period)" :class="{'is-active' : period === postsStore.selectedPeriod}">{{period}}</a>
    </span>
    <TimeLineItem
    v-for="post of postsStore.filteredPosts"
    :key="post.id"
    :post="post"
    />
  </nav>

</template>