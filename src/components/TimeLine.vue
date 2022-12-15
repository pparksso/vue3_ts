<script setup lang="ts">
import {ref, computed} from 'vue'
import {TimelinePost, today, thisMonth, thisWeek} from '../posts'
import { DateTime } from 'luxon'
import TimeLineItem from './TimeLineItem.vue';
import {usePosts} from '../store/posts'
import {periods, Period} from "../constants"

const postsStore = usePosts()

const selectedPeriod = ref<Period>('Today');
function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed<TimelinePost[]>(()=>{
  return postsStore.ids.map(id=> {
    const post = postsStore.all.get(id)
    if(!post){throw Error(`Post with id of ${id} was expected but not found`)}
  return {
    ...post,
    created: DateTime.fromISO(post.created)
  }
}).filter(post=> {
  if(selectedPeriod.value === "Today") return post.created >= DateTime.now().minus({day:1})
  if(selectedPeriod.value === "This Week") return post.created >= DateTime.now().minus({week:1})
  return post
})
})
</script>
<template>
  <button @click="postsStore.updateFoo('bar')">Update</button>
  <nav class="is-primary panel">
    {{selectedPeriod}}
    <span class="panel-tabs">
      <a v-for="period of periods" :key="period" @click="selectPeriod(period)" :class="{'is-active' : period === selectedPeriod}">{{period}}</a>
    </span>
    <TimeLineItem
    v-for="post of posts"
    :key="post.id"
    :post="post"
    />
  </nav>

</template>