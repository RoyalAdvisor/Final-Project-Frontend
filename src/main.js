import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");

// window.onscroll = function () {
//   scrollFunction();
// };

// function scrollFunction() {
//   if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//     document.querySelector(".nav-wrapper").style.background =
//       "rgba(0,0,0,0.95)";
//   } else {
//     document.querySelector(".nav-wrapper").style.background =
//       "rgba(0,0,0,0.95)";
//   }
// }

const menu_btn = document.querySelector(".menu");
const mobile_menu = document.querySelector(".mobile-nav");
menu_btn.addEventListener("click", () => {
  menu_btn.classList.toggle("is-active");
  mobile_menu.classList.toggle("is-active");
});

const collapse = document.querySelectorAll(".mobile");
collapse.forEach((element) => {
  element.addEventListener("click", () => {
    mobile_menu.classList.toggle("is-active");
    menu_btn.classList.remove("is-active");
  });
});

const mobileLinks = document.querySelectorAll(".nav-link");
mobileLinks.forEach((el) => {
  el.addEventListener("click", (e) => {
    mobileLinks.forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});
