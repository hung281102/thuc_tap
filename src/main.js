import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueTippy from "vue-tippy";
import enums from "@/helpers/enum";

// app.config.globalProperties.$enums = enums;
// app.config.globalProperties.$formatDate = FORMAT_DATE;

router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title;
  if (pageTitle) {
    document.title = pageTitle;
  }
  next();
});
createApp(App)
  .use(require("vue-shortkey"))
  .use(router)
  .use(
    VueTippy,

    {
      directive: "tippy",
      component: "tippy",
      componentSingleton: "tippy-singleton",
      defaultProps: {
        placement: "auto-end",
        allowHTML: true,
      },
    }
  )
  .mount("#app");
