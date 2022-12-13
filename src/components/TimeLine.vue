<script setup lang="ts">
import {ref} from 'vue'
import {Post, today, thisMonth, thisWeek} from '../posts'
import { DateTime } from 'luxon'

const periods = ['Today', 'This Week', 'This Month']as const
type Period = typeof periods[number]

const selectedPeriod = ref<Period>('Today');
function selectPeriod(period: Period) {
  selectedPeriod.value = period
}

const posts = [today,thisWeek, thisMonth].map(post=> {
  return {
    ...post,
    created: DateTime.fromISO(post.created)
  }
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