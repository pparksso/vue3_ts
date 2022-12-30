import { ref, shallowRef } from "vue";
import SignupForm from "../components/SignUpForm.vue";
import SignInForm from "../components/SignInForm.vue";
const show = ref(false);
const component = shallowRef();

export function useModal() {
  return {
    show,
    component,
    showModal: (type: "signUp" | "signIn") => {
      show.value = true;
      switch (type) {
        case "signIn":
          return (component.value = SignInForm);
        case "signUp":
          return (component.value = SignupForm);
      }
    },
    hideModal: () => (show.value = false),
  };
}
