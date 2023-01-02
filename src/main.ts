import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
import { useUser } from "./store/users";
import { usePosts } from "./store/posts";

const app = createApp(App);
app.use(createPinia());

const userStore = useUser();
const postsStore = usePosts();

Promise.all([userStore.authenticate(), postsStore.fetchPosts()]).then(() => {
  app.use(router);
  app.mount("#app");
});
