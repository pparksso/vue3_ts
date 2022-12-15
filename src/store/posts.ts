import {defineStore} from 'pinia'
import {Post, today, thisMonth, thisWeek} from "../posts"





interface PostState{
  ids:string[]
  all:Map<string, Post>
}

export const usePosts = defineStore('posts',{
  state:():PostState=>({
    ids:[today.id, thisWeek.id, thisMonth.id],
    all:new Map([[today.id,today],[thisWeek.id, thisWeek],[thisMonth.id, thisMonth]],)
  }),
  actions:{
  

  }
})








//자체 스토어 제작 방법
// import {reactive, readonly} from 'vue'

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