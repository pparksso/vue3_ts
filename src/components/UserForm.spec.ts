import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter, Router } from "vue-router";
import { createPinia, Pinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import UserForm from "./UserForm.vue";
import { routes } from "../router";

describe("UserForm", () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });
  it("runs through the workflow", async () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [pinia, router],
      },
    });
    expect(wrapper.find('[data-testid="username"]').find(".is-danger").text()).toBe("This field is required");
    expect(wrapper.find('[data-testid="password"]').find(".is-danger").text()).toBe("This field is required");

    await wrapper.find("#Username").setValue("user");
    await wrapper.find("#Password").setValue("password");
    console.log(wrapper.html());
  });
});
