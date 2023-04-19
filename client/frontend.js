import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

console.log(createApp);

createApp({
  data() {
    return {
      form: {
        name: "Liza",
        value: "xs",
      },
      contacts: [],
    };
  },
}).mount("#app");
