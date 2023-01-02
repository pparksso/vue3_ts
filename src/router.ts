import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import NewPost from "./views/NewPost.vue";
import ShowPost from "./views/ShowPost.vue";
import EditPost from "./views/EditPost.vue";
import { useUser } from "./store/users";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/posts/new",
      component: NewPost,
      beforeEnter: () => {
        const userStore = useUser();
        if (!userStore.currentUserId) {
          return {
            path: "/",
          };
        }
      },
    },
    { path: "/posts/:id", component: ShowPost },
    { path: "/posts/:id/edit", component: EditPost },
  ],
});
