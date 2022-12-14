import {defineStore} from 'pinia'
import {Post} from "../posts"

interface PostState{
  ids:string[]
  all:Record<string, Post>
}

export const usePosts = defineStore('posts',{
  state:():PostState=>({
    foo:'foo'
  }),
  actions:{
    updateFoo(foo:string){
      this.foo = foo
    }

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