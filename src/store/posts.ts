import {defineStore} from 'pinia'
import {Post, today, thisMonth, thisWeek, TimelinePost} from "../posts"
import {periods, Period} from '../constants'
import { DateTime } from 'luxon'





interface PostState{
  ids:string[]
  all:Map<string, Post>
  selectedPeriod:Period
}

export const usePosts = defineStore('posts',{
  state:():PostState=>({
    ids:[today.id, thisWeek.id, thisMonth.id],
    all:new Map([[today.id,today],[thisWeek.id, thisWeek],[thisMonth.id, thisMonth]],),
    selectedPeriod:'Today'
  }),
  actions:{
    setSelectedPeriod(period:Period){
      this.selectedPeriod = period
    }
  },
  getters:{
    filteredPosts:(state):TimelinePost[]=>{
      return state.ids.map(id=>{
        const post = state.all.get(id)
        if(!post){
          throw Error(`Post with id of ${id} was expected but not found`)
        }
        return {
          ...post,
          created:DateTime.fromISO(post.created)
        }
      }).filter(post=>{
        if(state.selectedPeriod === 'Today') return post.created >= DateTime.now().minus({day:1})
        if(state.selectedPeriod === 'This Week') return post.created >= DateTime.now().minus({week:1})
      return post
    })
    }
  }
})








//자체 스토어 제작 방법
// import {reactive, readonly} from 'vue'
// import { periods } from './../constants';

// interface PostsState {
//   foo: string
// }

// export class PostsStore {
//  #state: PostsState

//  constructor(){
//   this.#state = reactive<PostsState>({
//     foo:'foo'
//   })
//  }
//  getState(){
//   return readonly(this.#state)
//  }

//  updateFoo(foo:string){
//   this.#state.foo = foo
//  }
// }

// const store = new PostsStore()

// export function usePosts() {
//   return store
// }