<script setup lang="ts">
import {ref, computed} from 'vue'
import {Post, today, thisMonth, thisWeek} from '../posts'
import { DateTime } from 'luxon'

const periods = ['Today', 'This Week', 'This Month']as const
type Period = typeof periods[number]

const selectedPeriod = ref<Period>('Today');
function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = computed(()=>{
  return [today,thisWeek, thisMonth].map(post=> {
  return {
    ...post,
    created: DateTime.fromISO(post.created)
  }
}).filter(post=> {
  if(selectedPeriod.value === "Today") return post.created >= DateTime.now().minus({day:1})
  if(selectedPeriod.value === "This Week") return post.created >= DateTime.now().minus({week:1})
  if(selectedPeriod.value === 'This Month') return post.created >= DateTime.now().minus({month:1})
  return post
})
})
</script>
<template>
  <nav class="is-primary panel">
    {{selectedPeriod}}
    <span class="panel-tabs">
      <a v-for="period of periods" :key="period" @click="selectPeriod(period)" :class="{'is-active' : period === selectedPeriod}">{{period}}</a>
    </span>
    <a v-for="post of posts" :key="post.id" class="panel-block">
    <a>{{post.title}}</a>
    <div class="">{{post.created.toFormat('d MMM')}}</div>
    </a>
  </nav>

</template>